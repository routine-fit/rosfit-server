import { addMinutes, subWeeks } from 'date-fns';
import { Prisma } from '@prisma/client';

const userId = 'M5MCzG5aCKpf0B7qpNNsi8RyjN10';
const today = new Date();

export const routines: Prisma.RoutineCreateManyInput[] = ['r1', 'r2', 'r3'].map((id, index) => ({
  id,
  name: `Rutina ${index + 1}`,
  type: 'FUNCTIONAL',
  userId,
}));

export const routineExercises: Prisma.RoutineExerciseCreateManyInput[] = routines.flatMap(
  (routine, i) =>
    ['e1', 'e2', 'e3'].map((exerciseId, j) => ({
      id: `re${i + 1}${j + 1}`,
      routineId: String(routine.id),
      exerciseId,
      repetitions: 5,
      order: j + 1,
    })),
);

export const routineExercisesSeries: Prisma.SerieRoutineExerciseCreateManyInput[] =
  routineExercises.flatMap((exercise) =>
    Array.from({ length: 3 }, (_, i) => ({
      id: `sre${String(exercise.id).slice(2)}${i + 1}`,
      routineExerciseId: String(exercise.id),
      order: i + 1,
      weight: 40,
    })),
  );

export const scheduleRoutines: Prisma.ScheduleRoutineCreateManyInput[] = [
  { id: 'scr1', userId, routineId: 'r1', day: 'MONDAY', createdAt: subWeeks(today, 5) },
  { id: 'scr2', userId, routineId: 'r2', day: 'WEDNESDAY', createdAt: subWeeks(today, 5) },
  { id: 'scr3', userId, routineId: 'r3', day: 'FRIDAY', createdAt: subWeeks(today, 5) },
];

const getStartAndFinishDates = (weeks: number, minutes: number) => ({
  startedAt: subWeeks(today, weeks),
  finishedAt: subWeeks(addMinutes(today, minutes), weeks),
  durationInMinutes: minutes,
});

export const summaryRoutines: Prisma.SummaryRoutineCreateManyInput[] = Array.from(
  { length: 4 },
  (_, i) =>
    [1, 2, 3].map((j) => ({
      id: `sm${j}${i + 1}`,
      ...getStartAndFinishDates(4 - i, 60 + i * 10),
      scheduleRoutineId: `scr${j}`,
      userId,
    })),
).flat();

const generateSummaryRoutineExercises = (
  startWithId: string,
  prefix: string,
): Prisma.SummaryRoutineExerciseCreateManyInput[] =>
  routineExercises
    .filter((ex) => String(ex.id).startsWith(startWithId))
    .flatMap((exercise) =>
      Array.from({ length: 4 }, (_, i) => ({
        id: `${exercise.id}-${prefix}${i + 1}`,
        routineExerciseId: String(exercise.id),
        summaryRoutineId: `${prefix}${i + 1}`,
        repetitions: 5 * (i + 1),
        restTimeSecs: 30,
      })),
    );

export const summaryRoutineExercises: Prisma.SummaryRoutineExerciseCreateManyInput[] = [
  ...generateSummaryRoutineExercises('re1', 'sm1'),
  ...generateSummaryRoutineExercises('re2', 'sm2'),
  ...generateSummaryRoutineExercises('re3', 'sm3'),
];

export const summaryRoutineExerciseSeries: Prisma.SummaryRoutineExerciseSerieCreateManyInput[] =
  summaryRoutineExercises.flatMap((exercise, index) =>
    Array.from({ length: 3 }, (_, i) => ({
      id: `${exercise.id}-serie${i + 1}`,
      summaryRoutineExerciseId: String(exercise.id),
      weight: 30 + i * 5 + index,
      weightMeasure: 'kg',
    })),
  );
