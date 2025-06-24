import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, usuario, info) {
    console.log('[local-auth.guard] Usuario recebido:', usuario);
    if (err || !usuario) {
      throw err || new UnauthorizedException('Credenciais inválidas ou erro na autenticação.');
    }
    return usuario;
  }
}