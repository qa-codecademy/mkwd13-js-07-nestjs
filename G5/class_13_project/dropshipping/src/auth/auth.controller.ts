import { Body, Controller, HttpCode, Post } from '@nestjs/common';
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
import { RefreshTokenDto } from './dto/refresh-token.dto';

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
  @HttpCode(200) // we need to overwrite it because we have to use Post but we don't create anything new here to return 201
  login(@Body() loginDto: LoginDto): Promise<TokenPairDto> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access and refresh tokens' })
  @ApiOkResponse({
    description: 'Tokens refreshed successfully.',
    type: TokenPairDto,
  })
  @HttpCode(200) // we need to overwrite it because we have to use Post but we don't create anything new here to return 201
  refresh(@Body() { refreshToken }: RefreshTokenDto): Promise<TokenPairDto> {
    return this.authService.refresh(refreshToken);
  }
}
