import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order, OrderCreate, OrderUpdate } from '../common/types/order';

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

  @Patch('/:id')
  update(@Body() body: OrderUpdate, @Param('id') id: string): Order | null {
    return this.ordersService.update(body, +id);
  }

  @Delete('/:id')
  cancel(@Param('id') id: string): void {
    this.ordersService.cancel(+id);
  }
}
