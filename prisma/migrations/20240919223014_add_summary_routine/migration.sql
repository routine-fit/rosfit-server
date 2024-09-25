-- CreateTable
CREATE TABLE "SummaryRoutine" (
    "id" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "durationInMinutes" INTEGER NOT NULL,
    "finishedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "scheduleRoutineId" TEXT NOT NULL,

    CONSTRAINT "SummaryRoutine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SummaryRoutineExercise" (
    "id" TEXT NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "restTimeSecs" INTEGER NOT NULL,
    "summaryRoutineId" TEXT NOT NULL,
    "routineExerciseId" TEXT NOT NULL,

    CONSTRAINT "SummaryRoutineExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SummaryRoutineExerciseSerie" (
    "id" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "weightMeasure" TEXT NOT NULL,
    "summaryRoutineExerciseId" TEXT NOT NULL,

    CONSTRAINT "SummaryRoutineExerciseSerie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SummaryRoutine" ADD CONSTRAINT "SummaryRoutine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("firebaseUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SummaryRoutine" ADD CONSTRAINT "SummaryRoutine_scheduleRoutineId_fkey" FOREIGN KEY ("scheduleRoutineId") REFERENCES "ScheduleRoutine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SummaryRoutineExercise" ADD CONSTRAINT "SummaryRoutineExercise_summaryRoutineId_fkey" FOREIGN KEY ("summaryRoutineId") REFERENCES "SummaryRoutine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SummaryRoutineExercise" ADD CONSTRAINT "SummaryRoutineExercise_routineExerciseId_fkey" FOREIGN KEY ("routineExerciseId") REFERENCES "RoutineExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SummaryRoutineExerciseSerie" ADD CONSTRAINT "SummaryRoutineExerciseSerie_summaryRoutineExerciseId_fkey" FOREIGN KEY ("summaryRoutineExerciseId") REFERENCES "SummaryRoutineExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
