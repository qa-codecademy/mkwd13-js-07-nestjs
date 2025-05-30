import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register') // localhost:3001/auth/register
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return {
      email: user.email,
      id: user.id,
    };
  }
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    const { accessToken, refreshToken } = await this.authService.login(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('refresh')
  async refreshTokens(@Body('refreshToken') refreshToken: string) {
    const tokens = await this.authService.refreshTokens(refreshToken);

    return tokens;
  }

  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string) {
    console.log('HERE I AM', refreshToken);
    await this.authService.logout(refreshToken);

    return {
      message: 'Logout success',
    };
  }
}
