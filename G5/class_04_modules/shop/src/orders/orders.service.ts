import { Injectable } from '@nestjs/common';
import { Order } from '../common/types/order';
import { OrderStatus } from '../common/types/order-status.enum';

@Injectable()
export class OrdersService {
  // Mocking a DB
  private orders: Order[] = [
    {
      id: 1,
      items: [{ productId: 1, quantity: 2 }],
      total: 120,
      status: OrderStatus.Completed,
    },
  ];

  findAll(): Order[] {
    return this.orders;
  }
}
