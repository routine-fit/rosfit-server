import { Prisma } from '@prisma/client';

export const userInfoSelect = Prisma.validator<Prisma.UserInfoSelect>()({
  firebaseUid: false,
  name: true,
  lastName: true,
  birthDate: true,
  gender: true,
  pushNotification: true,
});
