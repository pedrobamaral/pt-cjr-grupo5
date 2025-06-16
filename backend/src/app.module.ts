import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { ProfessorModule } from './professor/professor.module';
import { DisciplinaModule } from './disciplina/disciplina.module';

@Module({
  imports: [UsuarioModule, AvaliacaoModule, ProfessorModule, DisciplinaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
