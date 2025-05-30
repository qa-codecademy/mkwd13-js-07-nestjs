import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/**
 * JWT Authentication Guard for NestJS
 *
 * This guard leverages Passport.js to protect routes that require authentication.
 * It extends the built-in AuthGuard and uses the 'jwt' strategy.
 *
 * How it works:
 * 1. When applied to a route or controller, it intercepts incoming requests
 * 2. Extracts the JWT token from the Authorization header
 * 3. Uses the JwtStrategy to validate the token
 * 4. If valid, attaches the user data to the request and allows access
 * 5. If invalid, returns a 401 Unauthorized response
 *
 * Usage:
 * - Apply to individual routes: @UseGuards(JwtAuthGuard)
 * - Apply globally in app.module.ts using APP_GUARD
 * - Apply to entire controllers: @UseGuards(JwtAuthGuard) before @Controller()
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
