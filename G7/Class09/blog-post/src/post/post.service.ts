import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Blog } from 'src/blog/entities/blog.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const blog = await this.blogRepository.findOneBy({
      id: +createPostDto.blogId,
    });

    if (!blog) {
      throw new NotFoundException(
        `Blog with the id: ${createPostDto.blogId} not found.`,
      );
    }

    const post = this.postRepository.create({
      ...createPostDto,
      blog: blog,
    });

    await this.postRepository.save(post);

    return { id: post.id };
  }

  async findAll() {
    const posts = await this.postRepository.find({ relations: ['blog'] });

    return posts;
  }
}
