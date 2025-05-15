import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    const response = this.ordersService.create(createOrderDto);

    return response;
  }

  @Get()
  findAll() {
    const orders = this.ordersService.findAll();

    return orders;
  }
}
