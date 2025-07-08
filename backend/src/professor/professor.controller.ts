import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorDto } from './dto/professor.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('professor')
export class ProfessorController {
    
    constructor (private readonly professorService: ProfessorService) {}

    @IsPublic()
    @Post()
    @IsPublic()
    async create(@Body() data: ProfessorDto) {
        return this.professorService.create(data);
    }

    @Get()
    @IsPublic()
    async findAll() {
        return this.professorService.findAll();
    }
    
    @Put(":id")
    @IsPublic() 
    async update(@Param("id") id: number, @Body() data: ProfessorDto) {
        return this.professorService.update(Number(id), data);
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        return this.professorService.delete(Number(id));        
    }

    @Get(":id")
    @IsPublic()
    async getById(@Param("id") id: number) {
        return this.professorService.getById(Number(id));
    }
}   
