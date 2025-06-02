import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderCreateDto } from './dto/order-create.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ICurrentUser } from '../common/types/current-user';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: OrderCreateDto })
  @ApiCreatedResponse({
    description: 'The order has been successfully created.',
    type: Order,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  create(
    @Body() orderCreateDto: OrderCreateDto,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.ordersService.create(orderCreateDto, currentUser);
  }
}
