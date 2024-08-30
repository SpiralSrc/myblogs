/*
  Warnings:

  - You are about to drop the column `slug` on the `tags` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_tags" ("id", "name") SELECT "id", "name" FROM "tags";
DROP TABLE "tags";
ALTER TABLE "new_tags" RENAME TO "tags";
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
