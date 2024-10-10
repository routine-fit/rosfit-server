import { differenceInMinutes } from 'date-fns';
import { Request, Response } from 'express';
import { Prisma, SummaryRoutineExerciseSerie } from '@prisma/client';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { RoutineExerciseInput, SummaryRoutineInput } from 'src/interfaces/routine';
import { getActionSuccessMsg, missingId, notFound } from 'src/utils/messages';

import {
  formatExercisesInRoutine,
  routineExerciseSelect,
  summaryRoutineSelect,
  summaryRoutineSelectGetRoutineId,
} from './utils';

const getAllRoutines = async (req: Request, res: Response) => {
  const routines = await prisma.routine.findMany({
    select: routineExerciseSelect,
    where: {
      userId: req.firebaseUid,
    },
  });
  if (routines.length > 0) {
    return res.status(200).json({
      message: getActionSuccessMsg('Routines', 'found'),
      data: routines.map(formatExercisesInRoutine),
      error: false,
    });
  }
  throw new CustomError(404, notFound('routines'));
};

const getRoutineById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const routine = await prisma.routine.findUnique({
    where: { id, userId: req.firebaseUid },
    select: routineExerciseSelect,
  });

  if (routine) {
    return res.status(200).json({
      message: getActionSuccessMsg('Routine', 'found'),
      data: formatExercisesInRoutine(routine),
      error: false,
    });
  }
  throw new CustomError(404, notFound('routine'));
};

const createRoutine = async (req: Request<object, object, RoutineExerciseInput>, res: Response) => {
  const { name, type, exercises } = req.body;

  const routineExercises: Prisma.RoutineExerciseCreateWithoutRoutineInput[] = exercises.map(
    (exercise) => ({
      exercise: {
        connect: {
          id: exercise.exerciseId,
        },
      },
      repetitions: exercise.repetitions,
      restTimeSecs: exercise.restTimeSecs,
      order: exercise.order,
      series: {
        create: exercise.series,
      },
    }),
  );

  const createdRoutine = await prisma.routine.create({
    data: {
      name,
      type,
      userId: req.firebaseUid,
      exercises: {
        create: routineExercises,
      },
    },
    select: routineExerciseSelect,
  });

  return res.status(201).json({
    message: getActionSuccessMsg('Routine', 'created'),
    data: formatExercisesInRoutine(createdRoutine),
    error: false,
  });
};

const editRoutine = async (
  req: Request<{ id: string }, object, RoutineExerciseInput>,
  res: Response,
) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const routine = await prisma.routine.findUnique({
    where: { id },
    include: {
      exercises: {
        include: {
          series: true,
        },
      },
    },
  });

  if (!routine) {
    throw new CustomError(404, notFound('Routine'));
  }

  const { name, type, exercises } = req.body;

  const routineExercisesToBeRemoved = routine.exercises.filter(
    (savedExercise) => !exercises.some((exercise) => exercise.id === savedExercise.id),
  );

  const transactionOperations = [];

  if (routineExercisesToBeRemoved.length > 0) {
    transactionOperations.push(
      prisma.routineExercise.deleteMany({
        where: { id: { in: routineExercisesToBeRemoved.map(({ id }) => id) } },
      }),
    );
  }

  exercises.forEach((exercise) => {
    const { series, id: routineExerciseId, ...exerciseRest } = exercise;

    series.forEach((serie) => {
      const { id: _serieId, routineExerciseId: _routineExerciseId, ...restSerie } = serie;

      transactionOperations.push(
        prisma.serieRoutineExercise.upsert({
          where: {
            order_routineExerciseId: {
              order: serie.order,
              routineExerciseId: routineExerciseId || '',
            },
          },
          update: restSerie,
          create: {
            ...restSerie,
            routineExercise: {
              connect: { id: routineExerciseId || '' },
            },
          },
        }),
      );
    });

    const routineExerciseSaved = routine.exercises.find(
      (routineExercise) => routineExercise.id === routineExerciseId,
    );

    if (routineExerciseSaved) {
      const seriesToBeRemoved = routineExerciseSaved.series.filter(
        (savedSerie) => !series.some((serie) => serie.id === savedSerie.id),
      );

      if (seriesToBeRemoved.length > 0) {
        transactionOperations.push(
          prisma.serieRoutineExercise.deleteMany({
            where: { id: { in: seriesToBeRemoved.map(({ id }) => id) } },
          }),
        );
      }
    }

    transactionOperations.push(
      prisma.routineExercise.upsert({
        where: {
          routineId_exerciseId: {
            routineId: routine.id,
            exerciseId: exercise.exerciseId,
          },
        },
        update: { ...exerciseRest, routineId: routine.id },
        create: {
          ...exerciseRest,
          routineId: routine.id,
          series: {
            create: series.map(({ order, weight, weightMeasure }) => ({
              order,
              weight,
              weightMeasure,
            })),
          },
        },
      }),
    );
  });

  transactionOperations.push(
    prisma.routine.update({
      where: { id },
      data: { name, type },
      select: routineExerciseSelect,
    }),
  );

  const transactions = await prisma.$transaction(transactionOperations);

  const editedRoutine = transactions.pop() as Prisma.RoutineGetPayload<{
    select: typeof routineExerciseSelect;
  }>;

  return res.status(200).json({
    message: getActionSuccessMsg('Routine', 'updated'),
    data: formatExercisesInRoutine(editedRoutine),
    error: false,
  });
};

const deleteRoutine = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const routine = await prisma.routine.findUnique({
    where: { id },
  });

  if (!routine) {
    throw new CustomError(404, notFound('Routine'));
  }

  const deletedRoutine = await prisma.routine.delete({
    where: { id },
    select: routineExerciseSelect,
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Routine', 'deleted'),
    data: formatExercisesInRoutine(deletedRoutine),
    error: false,
  });
};

const startRoutine = async (req: Request, res: Response) => {
  const { scheduleRoutineId } = req.body;

  const startedRoutine = await prisma.summaryRoutine.create({
    data: {
      scheduleRoutineId: scheduleRoutineId as string,
      userId: req.firebaseUid,
      durationInMinutes: 0,
    },
  });

  return res.status(201).json({
    message: 'Routine has been started.',
    data: startedRoutine,
    error: false,
  });
};

const getSummaryRoutines = async (req: Request, res: Response) => {
  const summaryRoutines = await prisma.summaryRoutine.findMany({
    where: { userId: req.firebaseUid },
    select: summaryRoutineSelect,
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Summary routines', 'found'),
    data: summaryRoutines,
    error: false,
  });
};

const finishRoutine = async (
  req: Request<{ summaryRoutineId: string }, object, SummaryRoutineInput>,
  res: Response,
) => {
  const { summaryRoutineId } = req.params;
  const { exercises } = req.body;

  const transactionOperations = [];

  const summaryRoutine = await prisma.summaryRoutine.findUnique({
    where: { id: summaryRoutineId },
    select: summaryRoutineSelectGetRoutineId,
  });

  if (!summaryRoutine) {
    throw new CustomError(404, notFound('Summary routine'));
  }

  if (summaryRoutine.finishedAt) {
    throw new CustomError(
      400,
      'Summary routine already finished. Please start another scheduled routine.',
    );
  }

  const finishedAt = new Date();
  const durationInMinutes = differenceInMinutes(finishedAt, summaryRoutine.startedAt);

  exercises.forEach((exercise) => {
    const { id: routineExerciseId, series, ...exerciseRest } = exercise;

    const summarySeries: Omit<SummaryRoutineExerciseSerie, 'id' | 'summaryRoutineExerciseId'>[] =
      [];

    series.forEach((serie) => {
      const { id: serieId, ...restSerie } = serie;
      summarySeries.push({ ...restSerie });

      transactionOperations.push(
        prisma.serieRoutineExercise.update({
          where: { id: serieId },
          data: restSerie,
        }),
      );
    });

    const updateRoutineExercise = prisma.routineExercise.update({
      where: { id: routineExerciseId },
      data: exerciseRest,
    });

    const createSummaryRoutineExercise = prisma.summaryRoutineExercise.create({
      data: {
        ...exerciseRest,
        summaryRoutineId: summaryRoutine.id,
        routineExerciseId,
        summarySeries: { create: summarySeries },
      },
    });

    transactionOperations.push(createSummaryRoutineExercise);
    transactionOperations.push(updateRoutineExercise);
  });

  const updateSummaryRoutine = prisma.summaryRoutine.update({
    where: { id: summaryRoutineId },
    data: { durationInMinutes, finishedAt },
    select: summaryRoutineSelect,
  });

  transactionOperations.push(updateSummaryRoutine);

  const transactions = await prisma.$transaction(transactionOperations);
  const finishedRoutineUpdated = transactions.pop();

  return res.status(200).json({
    message: 'Routine has been finished.',
    data: finishedRoutineUpdated,
    error: false,
  });
};

export default {
  getAllRoutines,
  getRoutineById,
  createRoutine,
  editRoutine,
  deleteRoutine,
  startRoutine,
  getSummaryRoutines,
  finishRoutine,
};
