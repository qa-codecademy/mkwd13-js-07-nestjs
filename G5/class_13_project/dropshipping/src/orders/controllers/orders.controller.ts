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

import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { OrderStatus } from '../../common/types/order-status.enum';
import { Role } from '../../common/types/role.enum';
import { OrderUpdateDto } from '../dto/order-update.dto';
import { Order } from '../entities/order.entity';
import { OrdersService } from '../orders.service';
import { OrderCreateDto } from '../dto/order-create.dto';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ICurrentUser } from '../../common/types/current-user';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles(Role.User, Role.Moderator, Role.Admin)
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
  @Roles(Role.User, Role.Moderator, Role.Admin)
  @ApiOkResponse({
    type: [Order],
  })
  search(@CurrentUser() currentUser: ICurrentUser) {
    return this.ordersService.search({ userId: currentUser.id });
  }

  @Get('/:id')
  @Roles(Role.User, Role.Moderator, Role.Admin)
  findOne(@Param('id') id: string, @CurrentUser() currentUser: ICurrentUser) {
    return this.ordersService.findOne(id, currentUser.id);
  }

  @Patch(':id')
  @Roles(Role.User, Role.Moderator, Role.Admin)
  update(
    @Param('id') id: string,
    @Body() orderUpdateDto: OrderUpdateDto,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.ordersService.update(id, orderUpdateDto, currentUser);
  }

  @Delete(':id')
  @Roles(Role.User, Role.Moderator, Role.Admin)
  cancel(@Param('id') id: string, @CurrentUser() currentUser: ICurrentUser) {
    return this.ordersService.update(
      id,
      { status: OrderStatus.Canceled },
      currentUser,
    );
  }
}
