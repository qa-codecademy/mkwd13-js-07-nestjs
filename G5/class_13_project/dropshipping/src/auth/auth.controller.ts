import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TokenPairDto } from './dto/token-pair.dto';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({
    description: 'User has been successfully registered.',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({
    description: 'User has been successfully logged in.',
    type: TokenPairDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  login(@Body() loginDto: LoginDto): Promise<TokenPairDto> {
    return this.authService.login(loginDto);
  }
}
