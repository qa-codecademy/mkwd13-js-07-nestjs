import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderDto, UpdateOrderDto } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(): OrderDto[] {
    return this.ordersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number): OrderDto {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateOrderDto): OrderDto {
    return this.ordersService.create(body);
  }

  @Patch('/:id')
  update(
    @Body() body: UpdateOrderDto,
    @Param('id', ParseIntPipe) id: number,
  ): OrderDto {
    return this.ordersService.update(body, id);
  }

  @Delete('/:id')
  cancel(@Param('id', ParseIntPipe) id: number): void {
    this.ordersService.cancel(id);
  }
}
