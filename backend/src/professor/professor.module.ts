import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { PrismaService } from 'src/database/prisma.service';
import { ProfessorController } from './professor.controller';

@Module({
    providers: [ProfessorService, PrismaService],
    controllers: [ProfessorController]
})

export class ProfessorModule {}
