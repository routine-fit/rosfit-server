import { Prisma } from '@prisma/client';

export const routineExerciseInclude: Prisma.RoutineInclude = {
  exercises: {
    include: {
      series: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  },
};
