import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../../common/types/jwt-payload';
import { ICurrentUser } from '../../common/types/current-user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload): ICurrentUser {
    return {
      id: payload.sub,
      email: payload.sub,
      role: payload.role,
    };
  }
}
