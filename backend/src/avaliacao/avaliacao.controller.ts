import { Body, Controller, Post } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoDto } from './dto/avaliacao.dto';

@Controller('avaliacao')
export class AvaliacaoController {
    
    constructor (private readonly avaliacaoService: AvaliacaoService) {}

    @Post()

    async create(@Body() data: AvaliacaoDto) {
        return this.avaliacaoService.create(data);
        
    }
}
