import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {

    constructor (private prisma: PrismaService) {}
     
    async create (data: UserDto){
        const user = await this.prisma.user.create ({
            data
        });
        
        return user;
    }


}
