import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; access_token: string }> {
    const user = await this.usersService.create(createUserDto);
    const access_token = await this.generateToken(user);

    return { user, access_token };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ user: User; access_token: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = await this.generateToken(user);

    return { user, access_token };
  }

  async purchaseLoyalCard(
    userId: number,
  ): Promise<{ user: User; message: string }> {
    const user = await this.usersService.upgradeToLoyalCustomer(userId);
    return {
      user,
      message: 'Successfully upgraded to loyal customer!',
    };
  }

  private async generateToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
