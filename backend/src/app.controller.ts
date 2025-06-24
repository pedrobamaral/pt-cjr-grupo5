import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { Usuario } from '@prisma/client';
import { CurrentUsuario } from './auth/decorators/current-user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('me')
  getMe(@CurrentUsuario() user: Usuario) {
  return user;
  }
}
