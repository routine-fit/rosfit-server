/*
  Warnings:

  - A unique constraint covering the columns `[routineId,exerciseId]` on the table `RoutineExercise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order,routineExerciseId]` on the table `SerieRoutineExercise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `SerieRoutineExercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoutineExercise" DROP CONSTRAINT "RoutineExercise_routineId_fkey";

-- DropForeignKey
ALTER TABLE "SerieRoutineExercise" DROP CONSTRAINT "SerieRoutineExercise_routineExerciseId_fkey";

-- AlterTable
ALTER TABLE "SerieRoutineExercise" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RoutineExercise_routineId_exerciseId_key" ON "RoutineExercise"("routineId", "exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "SerieRoutineExercise_order_routineExerciseId_key" ON "SerieRoutineExercise"("order", "routineExerciseId");

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerieRoutineExercise" ADD CONSTRAINT "SerieRoutineExercise_routineExerciseId_fkey" FOREIGN KEY ("routineExerciseId") REFERENCES "RoutineExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
