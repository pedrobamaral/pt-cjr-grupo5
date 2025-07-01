import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioFromJwt } from '../models/UsuarioFromJwt';
import { UsuarioPayload } from '../models/UsuarioPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
        
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: UsuarioPayload): Promise<UsuarioFromJwt> {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.nome,
    };
  }
}