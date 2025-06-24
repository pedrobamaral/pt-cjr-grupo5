import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
        usernameField: 'email',
        passwordField: 'senha',
      });
  }

  async validate(email: string, password: string):Promise<any> {
    console.log('Chamando LocalStrategy validate');
    return this.authService.validateUsuario(email, password);
  }
}