import { Emocao } from "@prisma/client";

export type AvaliacaoDto = {
    usuarioID: number;
    professorID: number;
    disciplinaID: number;
    conteudo: string;
    humor: Emocao;
}