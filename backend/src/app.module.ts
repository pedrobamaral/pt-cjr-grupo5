import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AvaliacaoService } from './avaliacao/avaliacao.service';
import { AvaliacaoController } from './avaliacao/avaliacao.controller';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { ProfessorService } from './professor/professor.service';
import { ProfessorController } from './professor/professor.controller';
import { ProfessorModule } from './professor/professor.module';

@Module({
  imports: [UsuarioModule, AvaliacaoModule, ProfessorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
