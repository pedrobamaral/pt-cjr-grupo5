import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DisciplinaDto } from './dto/disciplina.dto';
import { DisciplinaService } from './disciplina.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('disciplina')
export class DisciplinaController {

    constructor (private readonly disciplinaService: DisciplinaService) {}

    @IsPublic()
    @Post()
    @IsPublic()
    async create(@Body() data: DisciplinaDto){
        return this.disciplinaService.create(data);
    }

    @Get()
    @IsPublic()
    async findAll(){
        return this.disciplinaService.findAll();
    }

    @Put(":id")
    @IsPublic()
    async update(@Param("id") id:number, @Body() data: DisciplinaDto){
        return this.disciplinaService.update(Number(id), data);
    }

    @Delete(":id")
    @IsPublic()
    async delete(@Param("id") id:number){
        return this.disciplinaService.delete(Number(id));
    }

    @Get(":id")
    @IsPublic()
    async getById(@Param("id") id:number){
        return this.disciplinaService.getById(Number(id));
    }
}
