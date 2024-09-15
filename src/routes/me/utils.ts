import { Prisma } from '@prisma/client';

export const userInfoSelect = Prisma.validator<Prisma.UserInfoSelect>()({
  firebaseUid: false,
  name: true,
  lastName: true,
  birthDate: true,
  gender: true,
  pushNotification: true,
});

export const growthRecordSelect = Prisma.validator<Prisma.GrowthRecordSelect>()({
  height: true,
  heightMeasure: true,
  weight: true,
  weightMeasure: true,
  createdAt: true,
  userInfoId: false,
});
