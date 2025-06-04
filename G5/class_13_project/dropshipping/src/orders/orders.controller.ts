import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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
  ApiOkResponse,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { OrderUpdateDto } from './dto/order-update.dto';
import { OrderStatus } from '../common/types/order-status.enum';

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

  @Get('')
  @ApiOkResponse({
    type: [Order],
  })
  search(@CurrentUser() currentUser: ICurrentUser) {
    return this.ordersService.search({ userId: currentUser.id });
  }

  @Get('/:id')
  findOne(@Param('id') id: string, @CurrentUser() currentUser: ICurrentUser) {
    return this.ordersService.findOne(id, currentUser.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() orderUpdateDto: OrderUpdateDto,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.ordersService.update(id, orderUpdateDto, currentUser);
  }

  @Delete(':id')
  cancel(@Param('id') id: string, @CurrentUser() currentUser: ICurrentUser) {
    return this.ordersService.update(
      id,
      { status: OrderStatus.Canceled },
      currentUser,
    );
  }
}
