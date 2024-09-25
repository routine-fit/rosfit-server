/*
  Warnings:

  - You are about to drop the column `serieNumber` on the `SerieRoutineExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SerieRoutineExercise" DROP COLUMN "serieNumber",
ADD COLUMN     "weightMeasure" TEXT NOT NULL DEFAULT 'kg';
