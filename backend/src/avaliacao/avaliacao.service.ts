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

    async findAll() {
        return await this.prisma.avaliacao.findMany();
    }

    async update(id: number, data: AvaliacaoDto){
            const avaliacaoExists = await this.prisma.avaliacao.findUnique({
                where: {
                    id,
                }
            });
    
            if(!avaliacaoExists){
                throw new Error("Avaliação não encontrada!")
            }
    
            return await this.prisma.avaliacao.update({
                data,
                where: {
                    id, 
                }
            });
        }

        async delete(id: number){
        const avaliacaoExists = await this.prisma.avaliacao.findUnique({
            where: {
                id,
            }
        });

        if(!avaliacaoExists){
            throw new Error("Avaliação não encontrada!")
        }

        return await this.prisma.avaliacao.delete({
            where: {
                id,
            }
        });
    }



    
}
