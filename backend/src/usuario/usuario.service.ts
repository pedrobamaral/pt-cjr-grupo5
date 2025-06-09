import { Injectable } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class UsuarioService {

    constructor (private prisma: PrismaService) {}
     
    async create (data: UsuarioDto){
        const usuario = await this.prisma.usuario.create ({
            data
        });
        
        return usuario;
    }

    async findAll() {
        return await this.prisma.usuario.findMany();
    }


}
