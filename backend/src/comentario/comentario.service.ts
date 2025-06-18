import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ComentarioService {

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
