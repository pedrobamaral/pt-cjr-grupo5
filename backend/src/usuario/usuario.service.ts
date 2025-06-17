import { Injectable } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsuarioService {

    constructor (private prisma: PrismaService) {}
     
    async create (data: UsuarioDto) {
        const usuario = await this.prisma.usuario.create({
            data: {
                ...data,
                senha: await bcrypt.hash(data.senha, 10),
            },
        });
        
        return {
            ...usuario,
            senha: undefined, // Não retorna a senha 
        };
    }

    async findAll() {
        return await this.prisma.usuario.findMany();
    }

    async update(id: number, data: UsuarioDto) {
        
        const usuarioExists = await this.prisma.usuario.findUnique({
            where: {
                id,
            }
        });

        if (!usuarioExists) {
            throw new Error('Usuário não encontrado');
        }

        return await this.prisma.usuario.update({
            data,
            where: {
                id,
            }
        })
    }

    async delete(id: number) {

        const usuarioExists = await this.prisma.usuario.findUnique({
            where: {
                id,
            }
        });

        if (!usuarioExists) {
            throw new Error('Usuário não encontrado');
        }

        return await this.prisma.usuario.delete({
            where: {
                id,
            }
        })
    }

    async getById(id: number) {

        const usuarioExists = await this.prisma.usuario.findUnique({
            where: {
                id,
            }
        });

        if (!usuarioExists) {
            throw new Error('Usuário não encontrado');
        }

        return usuarioExists;
    }
}
