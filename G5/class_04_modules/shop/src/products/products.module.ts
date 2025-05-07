import { forwardRef, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { OrdersService } from '../orders/orders.service';
import { OrdersModule } from '../orders/orders.module';
import { CommonModule } from '../common/common.module';

@Module({
  // imports: [forwardRef(() => OrdersModule)], // fix for circular dependency in modules
  imports: [CommonModule],
  controllers: [ProductsController],
  providers: [ProductsService, OrdersService],
  // exports: [ProductsService]
})
export class ProductsModule {}
