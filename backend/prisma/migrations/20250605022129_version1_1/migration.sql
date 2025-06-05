-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Avaliacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioID" INTEGER NOT NULL,
    "professorID" INTEGER NOT NULL,
    "disciplinaID" INTEGER NOT NULL,
    "conteudo" TEXT NOT NULL,
    "humor" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Avaliacao_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_professorID_fkey" FOREIGN KEY ("professorID") REFERENCES "Professor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_disciplinaID_fkey" FOREIGN KEY ("disciplinaID") REFERENCES "Disciplina" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Avaliacao" ("conteudo", "createdAt", "disciplinaID", "humor", "id", "professorID", "updatedAt", "usuarioID") SELECT "conteudo", "createdAt", "disciplinaID", "humor", "id", "professorID", "updatedAt", "usuarioID" FROM "Avaliacao";
DROP TABLE "Avaliacao";
ALTER TABLE "new_Avaliacao" RENAME TO "Avaliacao";
CREATE INDEX "Avaliacao_usuarioID_idx" ON "Avaliacao"("usuarioID");
CREATE INDEX "Avaliacao_professorID_idx" ON "Avaliacao"("professorID");
CREATE INDEX "Avaliacao_disciplinaID_idx" ON "Avaliacao"("disciplinaID");
CREATE TABLE "new_Comentario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "avaliacaoId" INTEGER NOT NULL,
    "conteudo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comentario_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Avaliacao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Comentario" ("avaliacaoId", "conteudo", "createdAt", "id", "updatedAt", "usuarioId") SELECT "avaliacaoId", "conteudo", "createdAt", "id", "updatedAt", "usuarioId" FROM "Comentario";
DROP TABLE "Comentario";
ALTER TABLE "new_Comentario" RENAME TO "Comentario";
CREATE INDEX "Comentario_usuarioId_idx" ON "Comentario"("usuarioId");
CREATE INDEX "Comentario_avaliacaoId_idx" ON "Comentario"("avaliacaoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
