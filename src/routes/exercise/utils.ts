import { Prisma } from '@prisma/client';

export const exerciseSelect = Prisma.validator<Prisma.ExerciseSelect>()({
  id: true,
  name: true,
  muscleGroup: true,
  userInfoId: false,
  links: {
    select: {
      id: true,
      url: true,
      exerciseId: false,
    },
  },
});

export const formatExercises = (
  exercise: Prisma.ExerciseGetPayload<{
    select: typeof exerciseSelect;
  }>,
) => ({
  ...exercise,
  links: exercise.links.map((link) => ({
    id: link.id,
    url: link.url,
  })),
});
