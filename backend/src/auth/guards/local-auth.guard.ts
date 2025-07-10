import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    console.log('Verificando a ativação do guard');
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    console.log('HandleRequest chamado');

    if (err) {
      throw new UnauthorizedException(err.message || 'Unauthorized');
  }

  if (!user) {
      throw new UnauthorizedException('Usuário não encontrado ou credenciais inválidas');
  }


    return user;
  }
}