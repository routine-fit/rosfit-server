/*
  Warnings:

  - You are about to drop the column `seriesAmount` on the `RoutineExercise` table. All the data in the column will be lost.
  - You are about to drop the column `variableWeight` on the `RoutineExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RoutineExercise" DROP COLUMN "seriesAmount",
DROP COLUMN "variableWeight";
