export type UsuarioDto = {
    nome: string;
    email: string;
    senha: string;
    departamento: string;
    curso: string;
    foto_perfil?: string;
    //removi a propriedade 'id' e a outras opcionais porque o Prisma irá gerar automaticamente
}