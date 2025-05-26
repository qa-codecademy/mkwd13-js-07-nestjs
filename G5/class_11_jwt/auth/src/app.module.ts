import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433, // 5432,
      username: 'postgres',
      password: 'postgrespw', //postgres
      database: 'jwt_test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
