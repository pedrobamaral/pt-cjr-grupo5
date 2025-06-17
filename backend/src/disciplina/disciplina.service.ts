import { Injectable } from '@nestjs/common';
import { DisciplinaDto } from './dto/disciplina.dto';
import { PrismaService } from 'src/database/prisma.service';
import { throwDeprecation } from 'process';

@Injectable()
export class DisciplinaService {

    constructor (private prisma: PrismaService) {}

    async create (data: DisciplinaDto){
        const disciplina = await this.prisma.disciplina.create({
            data
        });

        return disciplina;
    }

    async findAll() {
        return await this.prisma.disciplina.findMany();
    }

    async update(id: number, data: DisciplinaDto){
        const disciplinaExists = await this.prisma.disciplina.findUnique({
            where: {
                id,
            }
        });

        if(!disciplinaExists){
            throw new Error("Disciplina não encontrada!")
        }

        return await this.prisma.disciplina.update({
            data,
            where: {
                id, //aqui eu nao precisaria ter o id no meu DTo???
            }
        });
    }

    async delete(id: number){
        const disciplinaExists = await this.prisma.disciplina.findUnique({
            where: {
                id,
            }
        });

        if(!disciplinaExists){
            throw new Error("Disciplina não encontrada!")
        }

        return await this.prisma.disciplina.delete({
            where: {
                id,
            }
        });
    }

    async getById(id:number){
        const disciplinaExists = await this.prisma.disciplina.findUnique({
            where: {
                id,
            }
        });

        if(!disciplinaExists){
            throw new Error("Disciplina não encontrada!")
        }

        return disciplinaExists;
    }
}
