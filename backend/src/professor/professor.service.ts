import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProfessorDto } from './dto/professor.dto';

@Injectable()
export class ProfessorService {
    constructor (private prisma: PrismaService) {}

    async create (data: ProfessorDto) {
        
        const disciplina = await this.prisma.disciplina.findMany({where: {nome: data.disciplinas}});
        
        if(disciplina.length == 0){
            throw new Error("Não existe essa disciplina!");
        }

        const professor = await this.prisma.professor.create ({
            data: {
                nome: data.nome, 
                departamento: data.nome, 
                disciplinaId: disciplina[0].id
            }
        });

        return professor;
    }

    async findAll() {
        return await this.prisma.professor.findMany();
    }

    async update(id: number, data: ProfessorDto) {
        const professorExists = await this.prisma.professor.findUnique({
            where: {
                id,
            }
        });

        if(!professorExists) {
            throw new Error('Professor não encontrado!');
        }

        await this.prisma.professor.update({
            data: {},
            where: {
                id,
            }
        })
    }

    async delete(id: number) {
        const professorExists = await this.prisma.professor.findUnique({
            where: {
                id,
            }
        });

        if(!professorExists) {
            throw new Error('Professor não encontrado!');
        }

        return await this.prisma.professor.delete({
            where: {
                id,
            }
        });
    }

    async getById(id: number) {
        const professorExists = await this.prisma.professor.findUnique({
            where: {
                id,
            }
        });

        if(!professorExists) {
            throw new Error('Professor não encontrado!');
        }

            return professorExists;
    }
}
