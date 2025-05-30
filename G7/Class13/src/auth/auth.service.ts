import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { User, UserRole } from 'src/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  email: string;
  id: number;
  roles: UserRole[];
}

/**
 * Authentication Service
 *
 * Handles user authentication, JWT token generation and refresh token management.
 * This service implements both access token and refresh token patterns for secure authentication.
 */
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Validates user credentials
   *
   * 1. Finds user by email
   * 2. Compares provided password against stored hash
   * 3. Returns user if valid, throws exception if invalid
   *
   * Note: bcrypt.compare securely checks if the password matches the hash
   * without ever decrypting the stored password
   */

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid creadentials.');
    }

    return user;
  }

  /**
   * Handles user login and token generation
   *
   * Implements a dual token strategy:
   * 1. Access Token: Short-lived token (1 hour) for API access
   *
   * Benefits of this approach:
   * - Access tokens expire quickly, limiting damage if stolen
   */

  async login(user: User) {
    const jwtPayload: JwtPayload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '1min',
      secret: this.configService.get('JWT_SECRET'),
    });
    const refreshToken = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '7d',
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });

    // SAME AS ABOVE
    // const [accessToken, refreshToken] = await Promise.all([
    //   this.jwtService.signAsync(jwtPayload, { expiresIn: '1min' }),
    //   this.jwtService.signAsync(jwtPayload, { expiresIn: '7d' }),
    // ]);

    await this.userService.addRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        {
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        },
      );

      const user = await this.userService.findByEmail(payload.email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isRefreshTokenExisting = user?.refreshTokens.find(
        (token) => token === refreshToken,
      );

      if (!isRefreshTokenExisting) {
        throw new UnauthorizedException('Token not found');
      }
      const newPayload: JwtPayload = {
        email: user.email,
        id: user.id,
        roles: user.roles,
      };

      const newAccessToken = await this.jwtService.signAsync(newPayload, {
        expiresIn: '1min',
        secret: this.configService.get('JWT_SECRET'),
      });
      const newRefreshToken = await this.jwtService.signAsync(newPayload, {
        expiresIn: '7d',
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });

      await this.userService.updateRefreshToken(
        user.id,
        refreshToken,
        newRefreshToken,
      );

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token.');
    }
  }

  async logout(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        {
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        },
      );

      const user = await this.userService.findByEmail(payload.email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userService.removeRefreshToken(user?.id, refreshToken);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
