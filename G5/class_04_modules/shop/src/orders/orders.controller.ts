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
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all orders',
  })
  @ApiOkResponse({
    description: 'All orders fetched successfully',
    type: [OrderDto],
  })
  findAll(): OrderDto[] {
    return this.ordersService.findAll();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get order by ID',
  })
  @ApiNotFoundResponse({
    description: 'Order with ID not found',
  })
  @ApiOkResponse({
    description: 'Order found by ID',
    type: OrderDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): OrderDto {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new order',
  })
  @ApiNotFoundResponse({
    description: 'Order with ID not found',
  })
  @ApiCreatedResponse({
    description: 'A new order has been created successfully',
    type: OrderDto,
  })
  create(@Body() body: CreateOrderDto): OrderDto {
    return this.ordersService.create(body);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Get order by ID',
  })
  @ApiNotFoundResponse({
    description: 'Order with ID not found',
  })
  @ApiOkResponse({
    description: 'A new order has been created successfully',
    type: OrderDto,
  })
  update(
    @Body() body: UpdateOrderDto,
    @Param('id', ParseIntPipe) id: number,
  ): OrderDto {
    return this.ordersService.update(body, id);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Cancel an order',
  })
  @ApiNoContentResponse({
    description: 'Order has been canceled successfully',
  })
  cancel(@Param('id', ParseIntPipe) id: number): void {
    this.ordersService.cancel(id);
  }
}
