import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/Jwt-Auth.guard';
import { ConfigModule } from '@nestjs/config';
import { ComentarioModule } from './comentario/comentario.module';
import { ProfessorController } from './professor/professor.controller';
import { ProfessorModule } from './professor/professor.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { RespostaModule } from './resposta/resposta.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsuarioModule, AvaliacaoModule, AuthModule, ComentarioModule, ProfessorModule, DisciplinaModule, RespostaModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD, 
    useClass: JwtAuthGuard,
  }],
})
export class AppModule {}
