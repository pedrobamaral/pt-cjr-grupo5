import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoDto } from './dto/avaliacao.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('avaliacao')
export class AvaliacaoController {
    
    constructor (private readonly avaliacaoService: AvaliacaoService) {}

    @IsPublic()
    @Post()

    async create(@Body() data: AvaliacaoDto) {
        return this.avaliacaoService.create(data);
        }
    
    @Get()
    @IsPublic()
        async findAll(){
            return this.avaliacaoService.findAll();
        }
    
    @Put(":id")
    @IsPublic()
        async update(@Param("id") id:number, @Body() data: AvaliacaoDto){
            return this.avaliacaoService.update(Number(id), data);
        }
    
    @Delete(":id")
    @IsPublic()
        async delete(@Param("id") id:number){
            return this.avaliacaoService.delete(Number(id));
        }
    
    @Get(":id")
    @IsPublic()
        async getById(@Param("id") id:number){
            return this.avaliacaoService.getById(Number(id));
        }
}
