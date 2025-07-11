/*
  Warnings:

  - You are about to drop the `_DisciplinaProfessor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_DisciplinaProfessor_B_index";

-- DropIndex
DROP INDEX "_DisciplinaProfessor_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_DisciplinaProfessor";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Disciplina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "professorId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Disciplina_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Disciplina" ("createdAt", "id", "nome", "updatedAt") SELECT "createdAt", "id", "nome", "updatedAt" FROM "Disciplina";
DROP TABLE "Disciplina";
ALTER TABLE "new_Disciplina" RENAME TO "Disciplina";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
