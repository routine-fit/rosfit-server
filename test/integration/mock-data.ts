/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

import { RoutineExerciseInput } from '../../src/interfaces/routine';

export const userCredentials = {
  email: `franco-marini+${uuidv4()}@outlook.com`,
  password: 'Password123',
};

export const newExercise = {
  name: 'Plancha baja',
  muscleGroup: 'PECTORAL',
};

export const newExerciseWithLinks = {
  name: 'Plancha baja con links',
  muscleGroup: 'ABDOMINAL',
  links: {
    create: {
      url: 'hola.com',
    },
  },
};

export const modifyExercise = { name: 'Triceps x4', muscleGroup: 'TRICEPS' };

export const newRoutine = (exerciseId1: string, exerciseId2: string): RoutineExerciseInput => ({
  name: 'Rutina de piernas',
  type: 'Strenght',
  exercises: [
    {
      exerciseId: exerciseId1,
      repetitions: 5,
      order: 1,
      series: [
        {
          order: 1,
          weight: 80,
          weightMeasure: 'kg',
        },
        {
          order: 2,
          weight: 80,
          weightMeasure: 'kg',
        },
      ],
    },
    {
      exerciseId: exerciseId2,
      repetitions: 5,
      order: 2,
      series: [
        {
          order: 1,
          weight: 80,
          weightMeasure: 'kg',
        },
        {
          order: 2,
          weight: 80,
          weightMeasure: 'kg',
        },
      ],
    },
  ],
});

export const modifyRoutine = (routine: any, exercise1: any, exercise2: any) => {
  const { exercises } = routine;

  const {
    name: _name1,
    muscleGroup: _muscleGroup1,
    ...modifyExercise1
  } = exercises.find((exercise: any) => exercise.exerciseId === exercise1.id);
  const {
    name: _name2,
    muscleGroup: _muscleGroup2,
    ...modifyExercise2
  } = exercises.find((exercise: any) => exercise.exerciseId === exercise2.id);

  return {
    id: routine.id,
    name: 'Edited routine',
    type: 'FUNCTIONAL',
    exercises: [
      {
        ...modifyExercise1,
        repetitions: 20,
        order: 1,
        series: [
          { ...modifyExercise1.series[0], order: 3 },
          {
            order: 1,
            weight: 50,
            weightMeasure: 'kg',
          },
          {
            order: 2,
            weight: 10,
            weightMeasure: 'kg',
          },
        ],
      },
      {
        ...modifyExercise2,
        repetitions: 5,
        order: 2,
        series: [
          { ...modifyExercise2.series[0] },
          {
            order: 2,
            weight: 20,
            weightMeasure: 'kg',
          },
          {
            order: 3,
            weight: 30,
            weightMeasure: 'kg',
          },
        ],
      },
    ],
  };
};
