import { Prisma } from '@prisma/client';

export const growthRecords: Prisma.GrowthRecordCreateManyInput[] = [
  {
    id: '1',
    weight: 83.2,
    height: 1.78,
    createdAt: new Date(),
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN10',
  },
  {
    id: '2',
    weight: 78.5,
    height: 1.72,
    createdAt: new Date(),
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN11',
  },
  {
    id: '3',
    weight: 75.5,
    height: 1.67,
    createdAt: new Date(),
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN12',
  },
  {
    id: '4',
    weight: 60.5,
    height: 1.8,
    createdAt: new Date(),
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN13',
  },
  {
    id: '5',
    weight: 67.2,
    height: 1.65,
    createdAt: new Date(),
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN14',
  },
  {
    id: '6',
    weight: 98.2,
    height: 1.77,
    createdAt: new Date(),
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN15',
  },
];
