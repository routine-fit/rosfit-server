import { Prisma } from '@prisma/client';

import { routineExerciseSelect } from '../utils';

export const scheduleRoutineSelect = Prisma.validator<Prisma.ScheduleRoutineSelect>()({
  id: true,
  day: true,
  userId: true,
  routine: {
    select: routineExerciseSelect,
  },
  createdAt: true,
});
