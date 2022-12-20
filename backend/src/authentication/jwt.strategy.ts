import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import User from 'src/database/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let data = req?.cookies['auth-cookie'];
          if (!data) {
            return null;
          }
          return data.token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: User | null) {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return { username: payload.name, email: payload.email };
  }
}
