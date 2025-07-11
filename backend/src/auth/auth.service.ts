import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { Usuario } from '@prisma/client';
import { UsuarioPayload } from './models/UsuarioPayload';
import { JwtService } from '@nestjs/jwt';
import { UsuarioToken } from './models/UsuarioToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  login(usuario: Usuario): UsuarioToken & { usuario: Omit<Usuario, 'senha'> } {
    console.log('[AuthService] Login bem-sucedido, gerando token para:', usuario.email);

    const payload: UsuarioPayload = {
      sub: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
    };

    const jwtToken = this.jwtService.sign(payload);

    // Remove a senha do objeto retornado
    const { senha, ...usuarioSemSenha } = usuario;

    return {
      access_token: jwtToken,
      usuario: usuarioSemSenha,
    };
  }

  async validateUsuario(email: string, password: string) {
    console.log('-------------------------------------------');
    console.log('[AuthService] Iniciando validateUsuario...');
    console.log('[AuthService] Email recebido:', email);
    console.log('[AuthService] Senha recebida:', password);

    const usuario = await this.usuarioService.findByEmail(email);

    if (!usuario) {
      console.error('[AuthService] ERRO: Usuário não encontrado no banco de dados.');
      console.log('-------------------------------------------\n');
      throw new Error('Email ou senha inválidos');
    }

    console.log('[AuthService] Usuário encontrado no banco de dados:', usuario.email);
    console.log('[AuthService] Hash da senha no banco:', usuario.senha);

    console.log('[AuthService] Comparando senha recebida com o hash do banco...');
    const isPasswordValid = await bcrypt.compare(password, usuario.senha);

    console.log('[AuthService] Resultado do bcrypt.compare (isPasswordValid):', isPasswordValid);

    if (isPasswordValid) {
      console.log('[AuthService] SUCESSO: Senha é válida!');
      console.log('-------------------------------------------\n');

      // Retorna o usuário sem a senha
      const { senha, ...usuarioSemSenha } = usuario;
      return usuarioSemSenha;
    } else {
      console.error('[AuthService] ERRO: A senha é inválida!');
      console.log('-------------------------------------------\n');
      throw new Error('Email ou senha inválidos');
    }
  }
}
