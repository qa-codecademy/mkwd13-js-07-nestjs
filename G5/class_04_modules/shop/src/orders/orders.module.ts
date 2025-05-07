import { forwardRef, Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ProductsService } from '../products/products.service';
import { ProductsModule } from '../products/products.module';

@Module({
  // imports: [forwardRef(() => ProductsModule)], // fix for circular dependency in modules
  controllers: [OrdersController],
  providers: [OrdersService, ProductsService],
  // exports: [OrdersService]
})
export class OrdersModule {}
