import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderCreateDto } from './dto/order-create.dto';
import { Order } from './entities/order.entity';
import { ICurrentUser } from '../common/types/current-user';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemCreate } from '../common/types/order-item-create';
import { OrderUpdateDto } from './dto/order-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from '../common/types/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(
    { items }: OrderCreateDto,
    currentUser: ICurrentUser,
  ): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let totalPrice = 0;
      const orderItems: OrderItemCreate[] = [];

      for (const item of items) {
        // Find the product listed in the order
        const product = await queryRunner.manager.findOne(Product, {
          where: { id: item.productId },
        });

        if (!product) {
          throw new NotFoundException(
            `Product with ID: ${item.productId} not found`,
          );
        }

        // Check if there is enough stock of the product
        if (product.stock < item.quantity) {
          throw new BadRequestException(
            `Product with ID: ${item.productId} is not in stock. Available items: ${product.stock}`,
          );
        }

        // Update product stock (remove from stock the ordered amount of that product)
        await queryRunner.manager.update(
          Product,
          { id: item.productId },
          { stock: product.stock - item.quantity },
        );

        // Calculate total price for this product and add to general total price
        const productPrice = product.price * item.quantity;
        totalPrice += productPrice;

        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        } satisfies OrderItemCreate);
      }

      // Create the actual order
      const order = await queryRunner.manager.save(Order, {
        createdById: currentUser.id,
        totalPrice,
      });

      // Add the id of the newly created order to each order item (to be created)
      const toBeCreatedOrderItems = orderItems.map((oi) => ({
        ...oi,
        orderId: order.id,
      }));

      // Create the order items
      const createdOrderItems = await queryRunner.manager.save(
        OrderItem,
        toBeCreatedOrderItems,
      );

      await queryRunner.commitTransaction();

      return {
        ...order,
        items: createdOrderItems,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async search({ userId }: { userId: string }): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { createdById: userId },
      relations: ['items', 'items.product', 'createdBy'],
    });
  }

  async findOne(id: string, userId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
        createdById: userId,
      },
      relations: ['items', 'items.product', 'createdBy'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID: ${id} not found`);
    }

    return order;
  }

  async update(
    id: string,
    { status: newStatus }: OrderUpdateDto,
    currentUser: ICurrentUser,
  ) {
    if (newStatus === OrderStatus.Pending) {
      throw new BadRequestException('Invalid status update');
    }

    const order = await this.findOne(id, currentUser.id);

    const currentStatus = order.status;

    if (order.createdById !== currentUser.id) {
      throw new ForbiddenException('You are not allowed to edit this order');
    }

    // If the current status of the order is Pending the user is allowed to cancel this order
    if (
      currentStatus === OrderStatus.Pending &&
      newStatus === OrderStatus.Canceled
    ) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const items = await queryRunner.manager.find(OrderItem, {
          where: { orderId: order.id },
          relations: ['product'],
        });

        for (const item of items) {
          // return back in stock the taken items for each product
          await queryRunner.manager.update(
            Product,
            { id: item.productId },
            { stock: () => `stock + ${item.quantity}` },
          );
        }

        await queryRunner.manager.update(Order, { id }, { status: newStatus });
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      }
    }

    if (currentStatus === OrderStatus.Canceled) {
      throw new BadRequestException(
        'You cannot update an order which is canceled',
      );
    }

    if (
      currentStatus === OrderStatus.Pending &&
      newStatus === OrderStatus.InDelivery
    ) {
      await this.orderRepository.update(id, { status: newStatus });
    }

    if (
      currentStatus === OrderStatus.InDelivery &&
      newStatus === OrderStatus.Delivered
    ) {
      await this.orderRepository.update(id, { status: newStatus });
    }

    if (
      currentStatus === OrderStatus.InDelivery &&
      newStatus === OrderStatus.Canceled
    ) {
      throw new BadRequestException(
        'You cannot cancel an order that is in process of delivery',
      );
    }

    if (
      currentStatus === OrderStatus.Delivered &&
      newStatus === OrderStatus.Canceled
    ) {
      throw new BadRequestException('You cannot cancel a delivered order');
    }

    return this.findOne(id, currentUser.id);
  }
}
