import { Request } from "express";
import { Usuario } from "generated/prisma";

export interface AuthRequest extends Request {
    user: Usuario; 
}