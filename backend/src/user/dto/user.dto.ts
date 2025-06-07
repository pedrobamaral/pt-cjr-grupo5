export type UserDto = {
//     id Int @id @default(autoincrement())
//   nome String
//   email String @unique
//   senha String
//   departamento String
//   curso String
//   foto_perfil String?
//   avaliacoes Avaliacao[]
//   comentarios Comentario[]
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

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