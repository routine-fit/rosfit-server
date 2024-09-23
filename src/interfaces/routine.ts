import { Day } from '@prisma/client';

export interface Serie {
  id?: string;
  order: number;
  weight: number;
  weightMeasure: 'kg';
  routineExerciseId?: string;
}

export interface Exercise {
  id?: string;
  routineId?: string;
  exerciseId: string;
  series: Serie[];
  repetitions: number;
  restTimeSecs?: number;
  order: number;
}

export interface RoutineExerciseInput {
  id?: string;
  name: string;
  type: string;
  exercises: Exercise[];
}

export interface ScheduleRoutineInput {
  id?: string;
  routineId: string;
  userId?: string;
  day: Day;
  isActive?: boolean;
}
