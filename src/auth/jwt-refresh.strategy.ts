import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    const jwt = ExtractJwt.fromHeader('x-custom-header-refreshtoken');
    super({
      jwtFromRequest: jwt,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_REFRESH_KEY,
    });
  }

  async validate(payload: RefreshPayload) {
    return { refreshToken: payload.refreshToken };
  }
}
