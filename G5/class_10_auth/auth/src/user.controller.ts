import { Body, Controller, Post, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserResponse } from './dtos/user-response.dto';
import { LoginDto } from './dtos/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiCreatedResponse({
    description: 'You have successfully registered your user',
    type: User,
  })
  register(@Body() body: CreateUserDto): Promise<UserResponse> {
    return this.userService.createUser(body);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Login a user',
  })
  async login(
    @Body() body: LoginDto,
    @Session() session: Record<string, any>,
  ): Promise<any> {
    const { loggedIn, user } = await this.userService.loginUser(body);

    if (loggedIn) {
      session.userId = user.id;
    }

    console.log('login session', session);
  }

  @Post('/logout')
  logout(@Session() session: Record<string, any>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    session.destroy();
    console.log('logout session', session);
  }
}
