import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '../common/types/order';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(): Order[] {
    return this.ordersService.findAll();
  }
}
