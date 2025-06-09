import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    
    constructor (private readonly usuarioService: UsuarioService) {}

    @Post()
    
    async create(@Body() data: UsuarioDto) {
        return this.usuarioService.create(data);

    }

    @Get()
    
    async findAll() {
        return this.usuarioService.findAll();
    }

    @Put(":id")
    
    async update(@Param("id") id: number, @Body() data: UsuarioDto){
        return this.usuarioService.update(Number(id), data);
    }

    @Delete(":id")
    
    async delete(@Param("id") id: number) {
        return this.usuarioService.delete(Number(id));
    }

    @Get(":id")
    async getById(@Param("id") id:number) {
        return this.usuarioService.getById(Number(id));
    }
}
