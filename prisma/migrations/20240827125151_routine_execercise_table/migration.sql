/*
  Warnings:

  - The primary key for the `Exercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ExerciseLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GrowthRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Routine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TrainingPreference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `GrowthRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ExerciseLink" DROP CONSTRAINT "ExerciseLink_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Exercise_id_seq";

-- AlterTable
ALTER TABLE "ExerciseLink" DROP CONSTRAINT "ExerciseLink_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "exerciseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ExerciseLink_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ExerciseLink_id_seq";

-- AlterTable
ALTER TABLE "GrowthRecord" DROP CONSTRAINT "GrowthRecord_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "GrowthRecord_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GrowthRecord_id_seq";

-- AlterTable
ALTER TABLE "Routine" DROP CONSTRAINT "Routine_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Routine_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Routine_id_seq";

-- AlterTable
ALTER TABLE "TrainingPreference" DROP CONSTRAINT "TrainingPreference_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TrainingPreference_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TrainingPreference_id_seq";

-- CreateTable
CREATE TABLE "RoutineExercise" (
    "id" TEXT NOT NULL,
    "routineId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "seriesAmount" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "restTimeSecs" INTEGER NOT NULL DEFAULT 30,
    "variableWeight" BOOLEAN NOT NULL,

    CONSTRAINT "RoutineExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SerieRoutineExercise" (
    "id" TEXT NOT NULL,
    "serieNumber" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "routineExerciseId" TEXT NOT NULL,

    CONSTRAINT "SerieRoutineExercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GrowthRecord_userId_key" ON "GrowthRecord"("userId");

-- AddForeignKey
ALTER TABLE "ExerciseLink" ADD CONSTRAINT "ExerciseLink_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerieRoutineExercise" ADD CONSTRAINT "SerieRoutineExercise_routineExerciseId_fkey" FOREIGN KEY ("routineExerciseId") REFERENCES "RoutineExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
