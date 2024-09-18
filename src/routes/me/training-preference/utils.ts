import { Prisma } from '@prisma/client';

export const trainingPreferenceSelect = Prisma.validator<Prisma.TrainingPreferenceSelect>()({
  id: true,
  type: true,
  intensity: true,
  userId: false,
});
