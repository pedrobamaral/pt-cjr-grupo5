import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProfessorDto } from './dto/professor.dto';

@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) {}

  async create(data: ProfessorDto) {
    // const disciplinas = await this.prisma.disciplina.findMany({
    //   where: { nome: { in: data.disciplinas } },
    // });

    // if (disciplinas.length === 0) {
    //   throw new Error("Não existe essa disciplina!");
    // }

    const professor = await this.prisma.professor.create({
      data: {
        nome: data.nome,
        departamento: data.departamento,
        // disciplinas: {
        //   connect: disciplinas.map((d) => ({ id: d.id })) as { id: number }[],
        // },
      },
    });

    await this.prisma.disciplina.updateMany({
      where: {
        nome: { in: data.disciplinas },
      },
      data: {
        professorId: professor.id,
      },
    });

    return professor;
  }

  async findAll() {
    return await this.prisma.professor.findMany();
  }

  async update(id: number, data: ProfessorDto) {
    // const disciplinas = await this.prisma.disciplina.findMany({
    //   where: { nome: { in: data.disciplinas } },
    // });

    // if (disciplinas.length === 0) {
    //   throw new Error("Não existe essa disciplina!");
    // }

    const professorExists = await this.prisma.professor.findUnique({
      where: { id },
    });

    if (!professorExists) {
      throw new NotFoundException('Professor não encontrado!');
    }

    await this.prisma.professor.update({
      where: { id },
      data: {
        nome: data.nome,
        departamento: data.departamento,
      },
    });

    await this.prisma.disciplina.updateMany({
      where: {
        nome: { in: data.disciplinas },
      },
      data: {
        professorId: id,
      },
    });
  }

  async delete(id: number) {
    const professorExists = await this.prisma.professor.findUnique({
      where: { id },
    });

    if (!professorExists) {
      throw new NotFoundException('Professor não encontrado!');
    }

    return await this.prisma.professor.delete({
      where: { id },
    });
  }

  async getById(id: number) {
    const professorExists = await this.prisma.professor.findUnique({
      where: { id },
    });

    if (!professorExists) {
      throw new NotFoundException('Professor não encontrado!');
    }

    return professorExists;
  }
}
