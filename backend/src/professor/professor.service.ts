import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProfessorDto } from './dto/professor.dto';

@Injectable()
export class ProfessorService {
    constructor (private prisma: PrismaService) {}

    async create (data: ProfessorDto) {
        const professor = await this.prisma.professor.create ({
            data
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
            data,
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
