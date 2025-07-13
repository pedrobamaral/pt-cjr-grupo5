import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RespostaDto } from './dto/resposta.dto';

@Injectable()
export class RespostaService {
  constructor(private prisma: PrismaService) {}

 async create(data: RespostaDto) {
  console.log('DADOS RECEBIDOS:', data);

  if (!data.comentarioId || !data.usuarioId) {
    throw new Error('comentarioId e usuarioId são obrigatórios');
  }

  return this.prisma.resposta.create({
    data: {
      conteudo: data.conteudo,
      comentario: { connect: { id: data.comentarioId } },
      usuario: { connect: { id: data.usuarioId } },
    },
  });
}
}
