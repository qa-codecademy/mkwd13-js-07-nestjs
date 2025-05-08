import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogPostModule } from './blog-post/blog-post.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [BlogPostModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
