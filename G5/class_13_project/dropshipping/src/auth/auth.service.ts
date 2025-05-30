import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from '../users/user.repository';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../common/types/jwt-payload';
import { TokenPairDto } from './dto/token-pair.dto';
import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME,
} from '../common/consts/token.const';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    return this.userRepository.save(registerDto);
  }

  async login({ email, password }: LoginDto): Promise<TokenPairDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const arePasswordsMatching = await user.comparePasswords(password);

    if (!arePasswordsMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.#generateTokens(user);

    await this.userRepository.update(user.id, { refreshToken });

    return { accessToken, refreshToken };
  }

  async #generateTokens(user: User): Promise<TokenPairDto> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: 'test',
    } satisfies JwtPayload;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
