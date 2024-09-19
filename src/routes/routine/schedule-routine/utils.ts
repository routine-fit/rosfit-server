import { Prisma } from '@prisma/client';

export const scheduleRoutineExerciseSelect = Prisma.validator<Prisma.ScheduleRoutineSelect>()({
  id: true,
  day: true,
  userId: true,
  routine: {
    select: {
      id: true,
      name: true,
      type: true,
      exercises: {
        select: {
          id: true,
          exercise: {
            select: {
              id: true,
              name: true,
              muscleGroup: true,
              userId: true,
            },
          },
          repetitions: true,
          restTimeSecs: true,
          order: true,
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  },
});
