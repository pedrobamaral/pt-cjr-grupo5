import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoDto } from './dto/avaliacao.dto';

@Controller('avaliacao')
export class AvaliacaoController {
    
    constructor (private readonly avaliacaoService: AvaliacaoService) {}

    @Post()

    async create(@Body() data: AvaliacaoDto) {
        return this.avaliacaoService.create(data);
        }
     
    @Get()
        async findAll(){
            return this.avaliacaoService.findAll();
        }
    
    @Put(":id")
        async update(@Param("id") id:number, @Body() data: AvaliacaoDto){
            return this.avaliacaoService.update(Number(id), data);
        }
    
    @Delete(":id")
        async delete(@Param("id") id:number){
            return this.avaliacaoService.delete(Number(id));
        }
    
    @Get(":id")
        async getById(@Param("id") id:number){
            return this.avaliacaoService.getById(Number(id));
        }
}