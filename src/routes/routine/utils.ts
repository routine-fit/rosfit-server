import { Prisma } from '@prisma/client';

export const routineExerciseSelect = Prisma.validator<Prisma.RoutineSelect>()({
  id: true,
  name: true,
  type: true,
  exercises: {
    orderBy: {
      order: 'asc',
    },
    select: {
      exercise: {
        select: {
          id: true,
          name: true,
          muscleGroup: true,
          userId: false,
        },
      },
      id: true,
      repetitions: true,
      restTimeSecs: true,
      order: true,
      series: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  },
});

export const formatExercisesInRoutine = (
  routine: Prisma.RoutineGetPayload<{
    select: typeof routineExerciseSelect;
  }>,
) => ({
  ...routine,
  exercises: routine.exercises.map((exercise) => ({
    id: exercise.id,
    exerciseId: exercise.exercise.id,
    name: exercise.exercise.name,
    muscleGroup: exercise.exercise.muscleGroup,
    repetitions: exercise.repetitions,
    restTimeSecs: exercise.restTimeSecs,
    order: exercise.order,
    series: exercise.series,
  })),
});

export const summaryRoutineSelectGetRoutineId = Prisma.validator<Prisma.SummaryRoutineSelect>()({
  id: true,
  startedAt: true,
  finishedAt: true,
  scheduleRoutine: { select: { routineId: true } },
});

export const summaryRoutineSelect = Prisma.validator<Prisma.SummaryRoutineSelect>()({
  id: true,
  startedAt: true,
  durationInMinutes: true,
  finishedAt: true,
  userId: false,
  scheduleRoutine: {
    select: {
      routine: { select: routineExerciseSelect },
    },
  },
});
