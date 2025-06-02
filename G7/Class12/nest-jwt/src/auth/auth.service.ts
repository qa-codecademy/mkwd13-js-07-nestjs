import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { User } from 'src/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

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
    const jwtPayload = { email: user.email, id: user.id, roles: user.roles };

    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return accessToken;
  }
}
