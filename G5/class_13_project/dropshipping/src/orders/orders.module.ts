import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './controllers/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/product.entity';
import { OrderStatsController } from './controllers/order-stats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product])],
  controllers: [OrdersController, OrderStatsController],
  providers: [OrdersService],
})
export class OrdersModule {}
