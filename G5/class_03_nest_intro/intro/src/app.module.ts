import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PancakesController } from './pancakes/pancakes.controller';

@Module({
  imports: [],
  controllers: [AppController, PancakesController],
  providers: [AppService],
})
export class AppModule {}
