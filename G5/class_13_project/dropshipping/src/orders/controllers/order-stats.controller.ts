import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from '../orders.service';
import { OrderStatsQueryDto } from '../dto/order-stats-query.dto';

@ApiTags('Order Statistics')
@Controller('order-stats')
export class OrderStatsController {
  constructor(private readonly orderService: OrdersService) {}

  @Get('products')
  // @ApiQuery({
  //   type: OrderStatsQueryDto,
  // })
  // Use ApiQuery when you don't have a dto, otherwise it duplicates the query params in swagger docs
  // @ApiQuery({
  //   name: 'startDate',
  //   required: false,
  //   type: String,
  // })
  getBestSellingProducts(@Query() query: OrderStatsQueryDto) {
    return this.orderService.getBestSellingProducts(query);
  }

  @Get('revenue')
  getRevenueStats(@Query() query: OrderStatsQueryDto) {
    return this.orderService.getRevenueStats(query);
  }

  @Get('orders')
  getOrderStats(@Query() query: OrderStatsQueryDto) {
    return this.orderService.getOrderStats(query);
  }
}
