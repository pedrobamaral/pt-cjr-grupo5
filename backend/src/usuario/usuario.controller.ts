import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioService } from './usuario.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('usuario')
export class UsuarioController {
    
    constructor (private readonly usuarioService: UsuarioService) {}

    @IsPublic()
    @Post()
    @IsPublic()
    async create(@Body() data: UsuarioDto) {
        return this.usuarioService.create(data);

    }

    @Get()
   @IsPublic() 
    async findAll() {
        return this.usuarioService.findAll();
    }

    @Put(":id")
    @IsPublic()
    async update(@Param("id") id: number, @Body() data: UsuarioDto){
        return this.usuarioService.update(Number(id), data);
    }

    @Delete(":id")
    @IsPublic()
    async delete(@Param("id") id: number) {
        return this.usuarioService.delete(Number(id));
    }

    @Get(":id")
    @IsPublic()
    async getById(@Param("id") id:number) {
        return this.usuarioService.getById(Number(id));
    }
}
