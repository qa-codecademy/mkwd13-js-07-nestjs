import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderCreateDto } from './dto/order-create.dto';
import { Order } from './entities/order.entity';
import { ICurrentUser } from '../common/types/current-user';
import { DataSource } from 'typeorm';
import { Product } from '../products/product.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemCreate } from '../common/types/order-item-create';

@Injectable()
export class OrdersService {
  constructor(private readonly dataSource: DataSource) {}

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
}
