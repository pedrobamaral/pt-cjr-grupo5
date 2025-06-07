export type UserDto = {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    departamento: string;
    curso: string;
    foto_perfil?: string;
    avaliacoes?: any[]; // colocar um tipo real depois
    comentarios?:any[]; // mesmo aqui
    createdAt?: Date;
    updatedAt?: Date;
}