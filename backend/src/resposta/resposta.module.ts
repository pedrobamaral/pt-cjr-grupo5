import { Module } from '@nestjs/common';
import { RespostaController } from './resposta.controller';
import { RespostaService } from './resposta.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [RespostaController],
  providers: [RespostaService, PrismaService],
})
export class RespostaModule {}
