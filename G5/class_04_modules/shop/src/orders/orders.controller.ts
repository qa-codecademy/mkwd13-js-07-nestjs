import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order, OrderCreate } from '../common/types/order';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(): Order[] {
    return this.ordersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Order | null {
    return this.ordersService.findOne(+id);
  }

  @Post()
  create(@Body() body: OrderCreate): Order | null {
    return this.ordersService.create(body);
  }
}
