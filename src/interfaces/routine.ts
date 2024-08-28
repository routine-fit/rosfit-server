export interface Serie {
  serieNumber: number;
  weight: number;
}

export interface Exercise {
  id: string;
  series: Serie[];
  repetitions: number;
  restTimeSecs: number;
  variableWeight: boolean;
}

export interface RoutineExerciseInput {
  name: string;
  type: string;
  exercises: Exercise[];
}
