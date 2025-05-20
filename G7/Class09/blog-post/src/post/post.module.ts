import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { Blog } from 'src/blog/entities/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Blog])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
