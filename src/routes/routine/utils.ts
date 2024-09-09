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
          userInfoId: false,
        },
      },
      repetitions: true,
      restTimeSecs: true,
      order: true,
      series: {
        orderBy: {
          order: 'asc',
        },
        select: {
          id: true,
          order: true,
          weight: true,
          weightMeasure: true,
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
    exerciseId: exercise.exercise.id,
    name: exercise.exercise.name,
    muscleGroup: exercise.exercise.muscleGroup,
    repetitions: exercise.repetitions,
    restTimeSecs: exercise.restTimeSecs,
    order: exercise.order,
    series: exercise.series,
  })),
});
