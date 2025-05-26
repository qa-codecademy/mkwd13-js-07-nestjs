import { Body, Controller, Get, Post, Res, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { Response } from 'express';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserResponse } from './dtos/user-response.dto';
import { LoginDto } from './dtos/login-user.dto';
import { Cookies } from './decorators/cookie.decorator';

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
    @Res() res: Response,
  ): Promise<any> {
    const { loggedIn, user } = await this.userService.loginUser(body);

    if (loggedIn) {
      session.userId = user.id;
    }

    res.cookie('last_login', new Date().toISOString(), {
      httpOnly: false,
      maxAge: 3600000,
      sameSite: 'lax',
    });

    res.cookie('user_info', user, {
      httpOnly: false,
      maxAge: 3600000,
      sameSite: 'lax',
    });

    return res.json();
  }

  @Post('/logout')
  logout(@Session() session: Record<string, any>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    session.destroy();
    console.log('logout session', session);
  }

  @Get('info')
  getProfileInfo(
    @Cookies('last_login') lastLogin: string,
    @Cookies('user_info') userInfo: any,
  ) {
    console.log(lastLogin, userInfo);

    return {
      lastLogin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      userInfo,
    };
  }
}
