import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderCreateDto } from './dto/order-create.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ICurrentUser } from '../common/types/current-user';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
