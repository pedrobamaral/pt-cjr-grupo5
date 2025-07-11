import { Controller, Post, Body } from '@nestjs/common';
import { RespostaService } from './resposta.service';
import { RespostaDto } from './dto/resposta.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('resposta')
export class RespostaController {
  constructor(private readonly respostaService: RespostaService) {}

  @IsPublic()
  @Post()
  async create(@Body() data: RespostaDto) {
    return this.respostaService.create(data);
  }
}
