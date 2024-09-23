/*
  Warnings:

  - The values [BINARY] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'PREFER_NOT_SPECIFY');
ALTER TABLE "UserInfo" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "GrowthRecord" DROP CONSTRAINT "GrowthRecord_userId_fkey";

-- DropForeignKey
ALTER TABLE "Routine" DROP CONSTRAINT "Routine_userId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleRoutine" DROP CONSTRAINT "ScheduleRoutine_routineId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleRoutine" DROP CONSTRAINT "ScheduleRoutine_userId_fkey";

-- DropForeignKey
ALTER TABLE "SummaryRoutine" DROP CONSTRAINT "SummaryRoutine_scheduleRoutineId_fkey";

-- DropForeignKey
ALTER TABLE "SummaryRoutine" DROP CONSTRAINT "SummaryRoutine_userId_fkey";

-- DropForeignKey
ALTER TABLE "SummaryRoutineExercise" DROP CONSTRAINT "SummaryRoutineExercise_routineExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "SummaryRoutineExercise" DROP CONSTRAINT "SummaryRoutineExercise_summaryRoutineId_fkey";

-- DropForeignKey
ALTER TABLE "SummaryRoutineExerciseSerie" DROP CONSTRAINT "SummaryRoutineExerciseSerie_summaryRoutineExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPreference" DROP CONSTRAINT "TrainingPreference_userId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Routine" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SummaryRoutine" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "durationInMinutes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SummaryRoutineExerciseSerie" ALTER COLUMN "weightMeasure" SET DEFAULT 'kg';

-- AlterTable
ALTER TABLE "TrainingPreference" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("firebaseUid");

-- CreateIndex
CREATE INDEX "Exercise_userId_idx" ON "Exercise"("userId");

-- CreateIndex
CREATE INDEX "ExerciseLink_exerciseId_idx" ON "ExerciseLink"("exerciseId");

-- CreateIndex
CREATE INDEX "GrowthRecord_userId_idx" ON "GrowthRecord"("userId");

-- CreateIndex
CREATE INDEX "Routine_userId_idx" ON "Routine"("userId");

-- CreateIndex
CREATE INDEX "RoutineExercise_routineId_exerciseId_idx" ON "RoutineExercise"("routineId", "exerciseId");

-- CreateIndex
CREATE INDEX "ScheduleRoutine_routineId_userId_idx" ON "ScheduleRoutine"("routineId", "userId");

-- CreateIndex
CREATE INDEX "SummaryRoutine_userId_scheduleRoutineId_idx" ON "SummaryRoutine"("userId", "scheduleRoutineId");

-- CreateIndex
CREATE INDEX "SummaryRoutineExercise_summaryRoutineId_routineExerciseId_idx" ON "SummaryRoutineExercise"("summaryRoutineId", "routineExerciseId");

-- AddForeignKey
ALTER TABLE "GrowthRecord" ADD CONSTRAINT "GrowthRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("firebaseUid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPreference" ADD CONSTRAINT "TrainingPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("firebaseUid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("firebaseUid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("firebaseUid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleRoutine" ADD CONSTRAINT "ScheduleRoutine_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleRoutine" ADD CONSTRAINT "ScheduleRoutine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("firebaseUid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SummaryRoutine" ADD CONSTRAINT "SummaryRoutine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("firebaseUid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SummaryRoutine" ADD CONSTRAINT "SummaryRoutine_scheduleRoutineId_fkey" FOREIGN KEY ("scheduleRoutineId") REFERENCES "ScheduleRoutine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SummaryRoutineExercise" ADD CONSTRAINT "SummaryRoutineExercise_routineExerciseId_fkey" FOREIGN KEY ("routineExerciseId") REFERENCES "RoutineExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SummaryRoutineExercise" ADD CONSTRAINT "SummaryRoutineExercise_summaryRoutineId_fkey" FOREIGN KEY ("summaryRoutineId") REFERENCES "SummaryRoutine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SummaryRoutineExerciseSerie" ADD CONSTRAINT "SummaryRoutineExerciseSerie_summaryRoutineExerciseId_fkey" FOREIGN KEY ("summaryRoutineExerciseId") REFERENCES "SummaryRoutineExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
