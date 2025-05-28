import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('/login')
  login(@Body() credentials: LoginDto) {
    return this.userService.login(credentials);
  }

  @Post('/refresh')
  refresh(@Body() { refreshToken }: RefreshTokenDto) {
    return this.userService.refreshToken(refreshToken);
  }

  @Get('/profile')
  profile(@Headers() headers: any) {
    console.log(headers);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.userService.profile(headers?.['authorization']);
  }

  @Get('/random')
  @UseGuards(JwtAuthGuard)
  random() {
    return {
      message: 'You are logged in, so you can see this!',
    };
  }
}
