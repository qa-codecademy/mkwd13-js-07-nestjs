import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/blog.dto';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>, // the property that we can use to make iteractions with the DB
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const blog = this.blogRepository.create(createBlogDto);
    await this.blogRepository.save(blog);

    return blog.id;
  }

  async findAll() {
    const blogs = await this.blogRepository.find();

    return blogs;
  }

  async findById() {}

  async update() {}

  async remove() {}
}
