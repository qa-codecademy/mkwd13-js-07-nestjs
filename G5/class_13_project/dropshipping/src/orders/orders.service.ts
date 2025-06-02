import { Injectable } from '@nestjs/common';
import { OrderCreateDto } from './dto/order-create.dto';
import { Order } from './entities/order.entity';
import { ICurrentUser } from '../common/types/current-user';

@Injectable()
export class OrdersService {
  create(
    orderCreateDto: OrderCreateDto,
    currentUser: ICurrentUser,
  ): Promise<Order> {}
}
