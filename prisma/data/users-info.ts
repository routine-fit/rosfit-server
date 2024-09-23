import { Prisma } from '@prisma/client';

export const usersInfo: Prisma.UserInfoCreateManyInput[] = [
  {
    firebaseUid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN10',
    name: 'Franco',
    lastName: 'Marini',
    birthDate: '1998-01-05T00:00:00.000Z',
    gender: 'MALE',
    pushNotification: false,
  },
  {
    firebaseUid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN11',
    name: 'Agustin',
    lastName: 'Carthery',
    birthDate: '1990-05-01T00:00:00.000Z',
    gender: 'MALE',
    pushNotification: false,
  },
  {
    firebaseUid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN12',
    name: 'John',
    lastName: 'Doe',
    birthDate: '1980-12-23T00:00:00.000Z',
    gender: 'MALE',
    pushNotification: false,
  },
  {
    firebaseUid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN13',
    name: 'Maria',
    lastName: 'Mandalor',
    birthDate: '1992-04-28T00:00:00.000Z',
    gender: 'FEMALE',
    pushNotification: false,
  },
  {
    firebaseUid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN14',
    name: 'Ballery',
    lastName: 'Rogerta',
    birthDate: '2002-06-13T00:00:00.000Z',
    gender: 'PREFER_NOT_SPECIFY',
    pushNotification: false,
  },
  {
    firebaseUid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN15',
    name: 'Draja',
    lastName: 'Majin',
    birthDate: '2000-07-15T00:00:00.000Z',
    gender: 'NON_BINARY',
    pushNotification: false,
  },
];
