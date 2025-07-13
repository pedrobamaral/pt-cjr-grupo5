import { Body, Controller, Post } from '@nestjs/common';
import { RespostaDto } from './dto/resposta.dto';
import { RespostaService } from './resposta.service';

@Controller('resposta')
export class RespostaController {
  constructor(private readonly respostaService: RespostaService) {}

  @Post()
  async create(@Body() data: RespostaDto) {
    return this.respostaService.create(data);
  }
}
