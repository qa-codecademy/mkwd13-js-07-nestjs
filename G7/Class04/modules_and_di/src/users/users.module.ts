import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  // when we imported CommonModule, we are importing the functionality and availability of the CommonService
  imports: [CommonModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
