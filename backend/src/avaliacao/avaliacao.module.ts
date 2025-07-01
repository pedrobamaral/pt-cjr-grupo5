import { Module } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { PrismaService } from 'src/database/prisma.service';
import { AvaliacaoController } from './avaliacao.controller';

@Module({
    providers: [AvaliacaoService, PrismaService],
    controllers: [AvaliacaoController]
})
export class AvaliacaoModule {}
