import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from '../orders.service';

@ApiTags('Order Statistics')
@Controller('order-stats')
export class OrderStatsController {
  constructor(private readonly orderService: OrdersService) {}

  getBestSellingProducts() {}

  getRevenueStats() {}

  getOrderStats() {}
}
