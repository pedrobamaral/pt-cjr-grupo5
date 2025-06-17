import { Injectable } from '@nestjs/common';
import { AvaliacaoDto } from './dto/avaliacao.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AvaliacaoService {

    constructor (private prisma : PrismaService) {}
    
    async create (data: AvaliacaoDto) {
        const avaliacao = await this.prisma.avaliacao.create({
            data
        });
        
        return avaliacao;
    }
}
