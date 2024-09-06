/*
  Warnings:

  - A unique constraint covering the columns `[routineId,order]` on the table `RoutineExercise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `RoutineExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoutineExercise" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RoutineExercise_routineId_order_key" ON "RoutineExercise"("routineId", "order");
