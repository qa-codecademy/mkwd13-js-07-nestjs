import { Body, Controller, Post } from '@nestjs/common';
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
  login(@Body() body: LoginDto): Promise<any> {
    return this.userService.loginUser(body);
  }
}
