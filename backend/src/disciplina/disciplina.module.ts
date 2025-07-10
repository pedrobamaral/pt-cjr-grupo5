import { Module } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
    providers: [DisciplinaService, PrismaService],
    controllers: [DisciplinaController],
    exports: [DisciplinaService, PrismaService]
})
export class DisciplinaModule {}
