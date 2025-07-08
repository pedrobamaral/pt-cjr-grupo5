import { Injectable } from '@nestjs/common';
import { ComentarioDTO } from './dto/comentario.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ComentarioService {

    constructor(private prisma: PrismaService) {}

    async create(data: ComentarioDTO) {
         console.log('Dados recebidos no create:', data);
         
        const comentario = await this.prisma.comentario.create({
            data: {
                usuarioId: data.usuarioId,
                avaliacaoId: data.avaliacaoId,
                conteudo: data.conteudo,
  },
        });

        return comentario;
    }

    async findAll() {
        return await this.prisma.comentario.findMany();
    }

    async update(id: number, data: ComentarioDTO) {
        const comentarioExists = await this.prisma.comentario.findUnique({
            where: { id },
        });

        if (!comentarioExists) {
            throw new Error("Comentário não encontrado!");
        }

        return await this.prisma.comentario.update({
            data,
            where: { id },
        });
    }

    async delete(id: number) {
        const comentarioExists = await this.prisma.comentario.findUnique({
            where: { id },
        });

        if (!comentarioExists) {
            throw new Error("Comentário não encontrado!");
        }

        return await this.prisma.comentario.delete({
            where: { id },
        });
    }

    async getById(id: number) {
        const comentarioExists = await this.prisma.comentario.findUnique({
            where: { id },
        });

        if (!comentarioExists) {
            throw new Error("Comentário não encontrado!");
        }

        return comentarioExists;
    }
}
