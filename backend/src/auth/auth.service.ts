import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    
    constructor(private readonly usuarioService: UsuarioService) {}
    
    async validateUser(email: string, password: string) {
        const usuario = await this.usuarioService.findByEmail(email);

        if(usuario) {
            //checa se a senha corresponde ao hash que está no banco

            const isPasswordValid = await bcrypt.compare(password, usuario.senha);

            if (isPasswordValid) {
                return {
                    ...usuario,
                    senha: undefined, // Remove a senha do objeto retornado
                };
            }
        }

        throw new Error('Email ou senha incorretos.'); // Erro caso o usuário não seja encontrado ou a senha não corresponda
    }
}
