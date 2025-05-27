import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  private posts = [
    { id: 1, title: 'Post 1', createdBy: 'bob_bobski@mail.com' },
    { id: 2, title: 'Post 2', createdBy: 'bob_bobski@mail.com' },
    { id: 3, title: 'Post 3', createdBy: 'bob_bobski@mail.com' },
    { id: 4, title: 'Post 5', createdBy: 'john_doe@mail.com' },
  ];

  @Get()
  @UseGuards(JwtAuthGuard) // the user needs to be authenticated when accessing this route
  findAll(
    @Request() request: Request & { user: { email: string; id: number } },
  ) {
    console.log(request.user);
    return this.posts.filter((post) => post.createdBy === request.user.email);
  }
}
