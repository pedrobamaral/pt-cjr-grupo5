import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AvaliacaoService } from './avaliacao/avaliacao.service';
import { AvaliacaoController } from './avaliacao/avaliacao.controller';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsuarioModule, AvaliacaoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
