export interface Serie {
  id?: string;
  order: number;
  serieNumber: number;
  weight: number;
  routineExerciseId?: string;
}

export interface Exercise {
  id?: string;
  routineId?: string;
  exerciseId: string;
  series: Serie[];
  repetitions: number;
  restTimeSecs: number;
}

export interface RoutineExerciseInput {
  id?: string;
  name: string;
  type: string;
  exercises: Exercise[];
}
