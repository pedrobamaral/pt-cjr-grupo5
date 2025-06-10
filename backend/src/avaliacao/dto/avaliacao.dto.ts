import { Emocao } from "generated/prisma";

export type AvaliacaoDto ={
    usuarioID: number;
    professorID: number;
    disciplinaID: number;
    conteudo: string;
    humor: Emocao;
}