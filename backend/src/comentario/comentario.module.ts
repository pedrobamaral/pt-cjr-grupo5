import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { PrismaService } from 'src/database/prisma.service';
import { ComentarioController } from './comentario.controller';

@Module({
    providers: [ComentarioService, PrismaService],
    controllers: [ComentarioController],
    exports: [ComentarioService, PrismaService]
})
export class ComentarioModule {}
