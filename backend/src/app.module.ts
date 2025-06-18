import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { ProfessorModule } from './professor/professor.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { ComentarioService } from './comentario/comentario.service';
import { ComentarioController } from './comentario/comentario.controller';
import { ComentarioModule } from './comentario/comentario.module';

@Module({
  imports: [UsuarioModule, AvaliacaoModule, ProfessorModule, DisciplinaModule, ComentarioModule],
  controllers: [AppController, ComentarioController],
  providers: [AppService, ComentarioService],
})
export class AppModule {}
