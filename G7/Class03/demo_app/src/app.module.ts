import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { UsersController } from './users/users.controller';

// @Module => Class Decorator
@Module({
  imports: [],
  // controllers list, we "register" all the controllers we have in the app
  // meaning, if we create a new one, we must put it here.
  controllers: [AppController, ProductsController, UsersController],
  // providers list, we "register" the services that we can have in the app.
  providers: [AppService],
})
export class AppModule {}
