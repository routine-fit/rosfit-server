import { MuscleGroup, Prisma } from '@prisma/client';

// REVIEW Muscles groups
export const exercises: Prisma.ExerciseCreateManyInput[] = [
  {
    id: '1',
    name: 'Remo con maquina',
    muscleGroup: MuscleGroup.BACK,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN10',
  },
  {
    id: '2',
    name: 'Subida al cajon c/mancuernas',
    muscleGroup: MuscleGroup.LEGS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN10',
  },
  {
    id: '3',
    name: 'Movilidad Escapular',
    muscleGroup: MuscleGroup.BACK,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN10',
  },
  {
    id: '4',
    name: 'Plancha Alta Toco Kettlebell',
    muscleGroup: MuscleGroup.ABS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN11',
  },
  {
    id: '5',
    name: 'Lumbar alternado',
    muscleGroup: MuscleGroup.BACK,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN11',
  },
  {
    id: '6',
    name: 'Puente de glúteo',
    muscleGroup: MuscleGroup.LEGS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN11',
  },
  {
    id: '7',
    name: 'Plancha lateral + Remo',
    muscleGroup: MuscleGroup.ARMS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN12',
  },
  {
    id: '8',
    name: 'Serrucho mancuerna',
    muscleGroup: MuscleGroup.BACK,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN12',
  },
  {
    id: '9',
    name: 'Sentadillas atrás',
    muscleGroup: MuscleGroup.LEGS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN12',
  },
  {
    id: '10',
    name: 'Peso muerto c/mancuernas',
    muscleGroup: MuscleGroup.BACK,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN13',
  },
  {
    id: '11',
    name: 'Press inclinado con mancuernas',
    muscleGroup: MuscleGroup.CHEST,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN13',
  },
  {
    id: '12',
    name: 'Vuelo lateral',
    muscleGroup: MuscleGroup.SHOULDERS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN13',
  },
  {
    id: '13',
    name: 'Flexion-extension diamante',
    muscleGroup: MuscleGroup.ARMS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN14',
  },
  {
    id: '14',
    name: 'Búlgara c/press',
    muscleGroup: MuscleGroup.LEGS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN14',
  },
];
