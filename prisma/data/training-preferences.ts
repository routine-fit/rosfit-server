import { Prisma } from '@prisma/client';

export const trainingPreferences: Prisma.TrainingPreferenceCreateManyInput[] = [
  {
    id: '1',
    type: 'AGILITY',
    time: 1,
    intensity: 'MEDIUM',
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN10',
  },
  {
    id: '2',
    type: 'STRENGTH',
    time: 1,
    intensity: 'MEDIUM',
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN11',
  },
  {
    id: '3',
    type: 'FLEXIBILITY',
    time: 1,
    intensity: 'MEDIUM',
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN12',
  },
  {
    id: '4',
    type: 'FUNCTIONAL',
    time: 1,
    intensity: 'MEDIUM',
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN13',
  },
  {
    id: '5',
    type: 'SPORTS_SPECIFIC',
    time: 1,
    intensity: 'MEDIUM',
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN14',
  },
  {
    id: '6',
    type: 'BODYWEIGHT',
    time: 1,
    intensity: 'MEDIUM',
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN15',
  },
];
