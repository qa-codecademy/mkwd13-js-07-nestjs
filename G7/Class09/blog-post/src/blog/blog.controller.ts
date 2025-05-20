import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateBlogDto } from './dto/blog.dto';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post() // localhost:3001/blog & method === "POST"
  async create(@Body() createBlogDto: CreateBlogDto) {
    const blogId = await this.blogService.create(createBlogDto);

    return {
      message: 'Created',
      id: blogId,
    };
  }

  @Get()
  async findAll() {
    const blogs = await this.blogService.findAll();

    return blogs;
  }
}
