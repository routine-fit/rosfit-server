import { MuscleGroup, Prisma } from '@prisma/client';

export const exercises: Prisma.ExerciseCreateManyInput[] = [
  {
    id: 'e1',
    name: 'Remo con maquina',
    muscleGroup: MuscleGroup.BACK,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN10',
  },
  {
    id: 'e2',
    name: 'Subida al cajon c/mancuernas',
    muscleGroup: MuscleGroup.LEGS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN10',
  },
  {
    id: 'e3',
    name: 'Movilidad Escapular',
    muscleGroup: MuscleGroup.BACK,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN10',
  },
  {
    id: 'e4',
    name: 'Plancha Alta Toco Kettlebell',
    muscleGroup: MuscleGroup.ABS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN11',
  },
  {
    id: 'e5',
    name: 'Lumbar alternado',
    muscleGroup: MuscleGroup.BACK,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN11',
  },
  {
    id: 'e6',
    name: 'Puente de glúteo',
    muscleGroup: MuscleGroup.LEGS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN11',
  },
  {
    id: 'e7',
    name: 'Plancha lateral + Remo',
    muscleGroup: MuscleGroup.ARMS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN12',
  },
  {
    id: 'e8',
    name: 'Serrucho mancuerna',
    muscleGroup: MuscleGroup.BACK,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN12',
  },
  {
    id: 'e9',
    name: 'Sentadillas atrás',
    muscleGroup: MuscleGroup.LEGS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN12',
  },
  {
    id: 'e10',
    name: 'Peso muerto c/mancuernas',
    muscleGroup: MuscleGroup.BACK,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN13',
  },
  {
    id: 'e11',
    name: 'Press inclinado con mancuernas',
    muscleGroup: MuscleGroup.CHEST,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN13',
  },
  {
    id: 'e12',
    name: 'Vuelo lateral',
    muscleGroup: MuscleGroup.SHOULDERS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN13',
  },
  {
    id: 'e13',
    name: 'Flexion-extension diamante',
    muscleGroup: MuscleGroup.ARMS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN14',
  },
  {
    id: 'e14',
    name: 'Búlgara c/press',
    muscleGroup: MuscleGroup.LEGS,
    userId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN14',
  },
];
