import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { MenuItem } from 'src/menu/entities/menu-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,

    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // NOTE: Do we validate if the customer exists firstly ?
    const order = this.orderRepository.create({
      customerId: createOrderDto.customerId,
      status: createOrderDto.status,
    });

    const savedOrder = await this.orderRepository.save(order);

    let totalAmmount = 0;

    for (const orderItem of createOrderDto.orderItems) {
      const menuItem = await this.menuItemRepository.findOneBy({
        id: orderItem.menuItemId,
      });

      if (!menuItem) {
        throw new NotFoundException(
          `Menu item with the id: ${orderItem.menuItemId} not found.`,
        );
      }

      const orderItemObject = this.orderItemRepository.create({
        orderId: savedOrder.id,
        menuItemId: orderItem.menuItemId,
        quantity: orderItem.quantity,
        specialInstructions: orderItem.specialInstructions,
      });

      await this.orderItemRepository.save(orderItemObject);

      totalAmmount += menuItem.price * orderItem.quantity;
    }

    // savedOrder.totalAmount = totalAmmount;

    await this.orderRepository.update(
      { id: savedOrder.id },
      { totalAmount: totalAmmount },
    );

    return savedOrder.id;
  }

  async findAll() {
    const orders = this.orderRepository.find({
      relations: ['customer', 'orderItems', 'orderItems.menuItem'],
    });

    return orders;
  }
}
