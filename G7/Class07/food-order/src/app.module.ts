import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot() initializes TypeORM for the entire application
    // It sets up the database connection that will be shared across all modules
    // The configuration is imported from a separate file for better organization
    // This is different from forFeature() which is used in feature modules to register repositories
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'fastfood_db',

      entities: [],

      autoLoadEntities: true,

      // IMPORTANT: Do not leave 'true' if environment is production
      synchronize: true,

      logging: true,
    }),
    // Feature modules containing our business logic
    CustomersModule,
    MenuModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
