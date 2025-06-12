import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorDto } from './dto/professor.dto';

@Controller('professor')
export class ProfessorController {
    
    constructor (private readonly professorService: ProfessorService) {}

    @Post()
    async create(@Body() data: ProfessorDto) {
        return this.professorService.create(data);
    }

    @Get()
    async findAll() {
        return this.professorService.findAll();
    }
    
    @Put(":id") 
    async update(@Param("id") id: number, @Body() data: ProfessorDto) {
        return this.professorService.update(Number(id), data);
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        return this.professorService.delete(Number(id));        
    }

    @Get(":id")
    async getById(@Param("id") id: number) {
        return this.professorService.getById(Number(id));
    }
}   
