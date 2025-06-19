import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ComentarioDTO } from './dto/comentario.dto';

@Injectable()
export class ComentarioService {
    getById(arg0: number) {
        throw new Error('Method not implemented.');
    }
    delete(arg0: number) {
        throw new Error('Method not implemented.');
    }
    create(data: ComentarioDTO) {
        throw new Error('Method not implemented.');
    }
    findAll() {
        throw new Error('Method not implemented.');
    }
    update(arg0: number, data: ComentarioDTO) {
        throw new Error('Method not implemented.');
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
