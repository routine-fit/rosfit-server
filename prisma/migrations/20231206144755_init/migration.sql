-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('ABDOMINAL', 'BICEPS', 'DELTOID', 'ERECTOR_SPINAE', 'LATISSIMUS_DORSI', 'PECTORAL', 'TRAPEZIUS', 'TRICEPS');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'BINARY', 'PREFER_NOT_SPECIFY');

-- CreateEnum
CREATE TYPE "TrainingType" AS ENUM ('STRENGTH', 'CARDIO', 'FUNCTIONAL', 'FLEXIBILITY', 'ENDURANCE', 'SPORTS_SPECIFIC', 'AGILITY', 'BODYWEIGHT');

-- CreateEnum
CREATE TYPE "Intensity" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "UserInfo" (
    "firebaseUid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "pushNotification" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "GrowthRecord" (
    "id" SERIAL NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GrowthRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingPreference" (
    "id" SERIAL NOT NULL,
    "type" "TrainingType" NOT NULL,
    "time" INTEGER NOT NULL,
    "intensity" "Intensity" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TrainingPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseLink" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "ExerciseLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "muscleGroup" "MuscleGroup" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_firebaseUid_key" ON "UserInfo"("firebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingPreference_userId_key" ON "TrainingPreference"("userId");

-- AddForeignKey
ALTER TABLE "GrowthRecord" ADD CONSTRAINT "GrowthRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("firebaseUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPreference" ADD CONSTRAINT "TrainingPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("firebaseUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLink" ADD CONSTRAINT "ExerciseLink_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("firebaseUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("firebaseUid") ON DELETE RESTRICT ON UPDATE CASCADE;
