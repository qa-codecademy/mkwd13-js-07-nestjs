import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from 'src/users/entity/user.entity';

/**
 * JWT Strategy for Passport.js in NestJS
 *
 * This strategy is responsible for JWT token validation and extraction of user information.
 * It is used by the AuthGuard('jwt') to protect routes that require authentication.
 *
 * The JWT Strategy:
 * 1. Extracts the JWT token from the Authorization header (Bearer token)
 * 2. Verifies the token signature with the secret key
 * 3. Checks if the token has expired
 * 4. If valid, extracts the payload and passes it to the validate() method
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Extract JWT from the Authorization header with the Bearer scheme
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // If true, expired tokens would still be considered valid (default: false)
      secretOrKey: configService.get('JWT_SECRET') || '',
      // Secret key used to verify the token signature
      // Must be the same key used when creating the t
      ignoreExpiration: false,
    });
  }
  /**
   * Passport's verify callback
   *
   * This method is called after the token is verified.
   * The payload contains the data from the JWT token (decoded).
   *
   * In NestJS, the returned value is attached to the Request object
   * and can be accessed in controllers via @Request() decorator.
   *
   * @param payload - The decoded JWT payload
   * @returns User information to be attached to the request
   */
  async validate(payload: {
    email: string;
    userId: string;
    roles: UserRole[];
  }) {
    // Return user data that will be available in the Request object
    // request.user = payload
    return payload;
  }
}
