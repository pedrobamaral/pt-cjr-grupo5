import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ComentarioModule } from './comentario.module';
import { ComentarioService } from './comentario.service';
import { ComentarioDTO } from './dto/comentario.dto';

@Controller('comentario')
export class ComentarioController {

    constructor (private readonly comentarioService: ComentarioService) {}

    @Post()
    async create(@Body() data: ComentarioDTO) {
        return this.comentarioService.create(data);
    }

    @Get()
    async findAll(){
        if (!this.comentarioService) {
            throw new Error('Comentario não está disponível');
        }
        return this.comentarioService.findAll();
    }

    @Put(":id")
    async update(@Param("id") id:number, @Body() data: ComentarioDTO){
        return this.comentarioService.update(Number(id), data);
    }

    @Delete(":id")
    async delete(@Param("id") id:number){
        return this.comentarioService.delete(Number(id));
    }

    @Get(":id")
    async getById(@Param("id") id:number){
        return this.comentarioService.getById(Number(id));
    }
}
