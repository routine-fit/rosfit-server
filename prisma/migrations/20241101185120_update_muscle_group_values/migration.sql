/*
  Warnings:

  - The values [ABDOMINAL,BICEPS,DELTOID,ERECTOR_SPINAE,LATISSIMUS_DORSI,PECTORAL,TRAPEZIUS,TRICEPS] on the enum `MuscleGroup` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MuscleGroup_new" AS ENUM ('CHEST', 'BACK', 'ARMS', 'SHOULDERS', 'LEGS', 'ABS');
ALTER TABLE "Exercise" ALTER COLUMN "muscleGroup" TYPE "MuscleGroup_new" USING ("muscleGroup"::text::"MuscleGroup_new");
ALTER TYPE "MuscleGroup" RENAME TO "MuscleGroup_old";
ALTER TYPE "MuscleGroup_new" RENAME TO "MuscleGroup";
DROP TYPE "MuscleGroup_old";
COMMIT;
