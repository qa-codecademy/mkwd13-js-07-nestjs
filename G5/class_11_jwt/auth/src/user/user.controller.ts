import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../types/role.enum';
import { RolesGuard } from '../guards/role.guard';

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
  @ApiBearerAuth()
  random() {
    return {
      message: 'You are logged in, so you can see this!',
    };
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)
  userInfo(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserInfo(id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
