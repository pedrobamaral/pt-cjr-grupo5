import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
console.log('JWT_SECRET =>', process.env.JWT_SECRET);

@Module({
  imports: [UsuarioModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '30d' },
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy]
})
export class AuthModule {}
