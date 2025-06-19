import { Comentario } from "@prisma/client";

export type ComentarioDTO = {

    UsuarioId: number;
    AvaliacaoId: number;
    conteudo: string;

}
