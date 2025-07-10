import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ComentarioDTO } from './dto/comentario.dto';

@Injectable()
export class ComentarioService {
    getById(arg0: number) {
        throw new Error('Comentário não encontrado.');
    }
    delete(arg0: number) {
        throw new Error('Comentário não encontrado.');
    }
    create(data: ComentarioDTO) {
        throw new Error('Comentário não encontrado.');
    }
    findAll() {
        throw new Error('Comentário não encontrado.');
    }
    update(arg0: number, data: ComentarioDTO) {
        throw new Error('Comentário não encontrado.');
    }

    constructor(private prisma: PrismaService) {}

    async createComentario(data: Prisma.ComentarioCreateInput) {
        const comentario = await this.prisma.comentario.create({
            data: {
                ...data,
            },
        });
        return comentario;

    }







}
