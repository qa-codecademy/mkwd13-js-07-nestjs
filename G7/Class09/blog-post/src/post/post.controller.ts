import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const id = await this.postService.create(createPostDto);

    return {
      id,
      message: 'Created',
    };
  }

  @Get()
  async findAll() {
    const posts = await this.postService.findAll();

    return posts;
  }
}
