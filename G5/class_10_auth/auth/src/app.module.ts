import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ProductController } from './products.controller';

@Module({
  imports: [
    // DO NOT USE IT LIKE THIS IN REAL SCENARIO, THIS IS JUST A SIMPLIFIED VERSION TO TEST AUTH. USE .ENV instead!!!
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgrespw', // postgres
      port: 5433, // 5432
      database: 'auth_test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController, ProductController],
  providers: [UserService],
})
export class AppModule {}
