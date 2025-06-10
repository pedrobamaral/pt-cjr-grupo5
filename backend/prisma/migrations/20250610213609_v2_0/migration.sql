/*
  Warnings:

  - You are about to drop the `_DisciplinaToProfessor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `disciplinaId` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_DisciplinaToProfessor_B_index";

-- DropIndex
DROP INDEX "_DisciplinaToProfessor_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_DisciplinaToProfessor";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Professor_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Professor" ("createdAt", "departamento", "id", "nome", "updatedAt") SELECT "createdAt", "departamento", "id", "nome", "updatedAt" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
