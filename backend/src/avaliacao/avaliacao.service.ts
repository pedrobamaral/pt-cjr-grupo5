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

    // Novo método para buscar avaliações por usuário
    async findByUsuario(usuarioId: number) {
        const avaliacoes = await this.prisma.avaliacao.findMany({
            where: {
                usuarioID: usuarioId
            },
            include: {
                usuario: {
                    select: {
                        nome: true
                    }
                },
                professor: {
                    select: {
                        nome: true
                    }
                },
                disciplina: {
                    select: {
                        nome: true
                    }
                },
                comentarios: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Formatar os dados para o frontend
        return avaliacoes.map(avaliacao => {
            const createdAt = new Date(avaliacao.createdAt);
            const date = createdAt.toLocaleDateString('pt-BR');
            const time = createdAt.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });

            return {
                id: avaliacao.id,
                studentName: avaliacao.usuario.nome,
                teacherName: avaliacao.professor.nome,
                discipline: avaliacao.disciplina.nome,
                text: avaliacao.conteudo,
                date: date,
                time: time,
                commentsCount: avaliacao.comentarios.length,
                createdAt: avaliacao.createdAt,
                updatedAt: avaliacao.updatedAt
            };
        });
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

    async getById(id:number){
        const avaliacaoExists = await this.prisma.avaliacao.findUnique({
            where: {
                id,
            }
        });

        if(!avaliacaoExists){
            throw new Error("Disciplina não encontrada!")
        }

        return avaliacaoExists;
    }
}

