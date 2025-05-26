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
