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
