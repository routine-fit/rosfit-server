import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { RoutineExerciseInput } from 'src/interfaces/routine';
import { getActionSuccessMsg, missingId, notFound } from 'src/utils/messages';

import { formatExercisesInRoutine, routineExerciseSelect } from './utils';

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

  // TODO: Business rules validations and return errors
  /**
   * Validate one type of exercise per routine
   * Validate one order value per exercise
   * Validate one order value per serie
   */

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

  if (routineExercisesToBeRemoved.length > 0) {
    await prisma.routineExercise.deleteMany({
      where: { id: { in: routineExercisesToBeRemoved.map(({ id }) => id) } },
    });
  }

  const exercisePromises = exercises.map((exercise) => {
    const { series, id: routineExerciseId, routineId: _routineId, ...exerciseRest } = exercise;

    const seriesPromises = series.map((serie) => {
      const { id: _serieId, ...restSerie } = serie;
      return prisma.seriesRoutineExercise.upsert({
        where: {
          order_routineExerciseId: {
            order: serie.order,
            routineExerciseId: routineExerciseId || '',
          },
        },
        update: restSerie,
        create: { ...restSerie, routineExerciseId: routineExerciseId || '' },
      });
    });

    let deleteSeriesPromise;
    const routineExerciseSaved = routine.exercises.find(
      (routineExercise) => routineExercise.id === routineExerciseId,
    );

    if (routineExerciseSaved) {
      const seriesToBeRemoved = routineExerciseSaved.series.filter(
        (savedSerie) => !series.some((serie) => serie.id === savedSerie.id),
      );

      if (seriesToBeRemoved.length > 0) {
        deleteSeriesPromise = prisma.seriesRoutineExercise.deleteMany({
          where: { id: { in: seriesToBeRemoved.map(({ id }) => id) } },
        });
      }
    }

    return Promise.all([
      deleteSeriesPromise,
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
      ...seriesPromises,
    ]);
  });

  await Promise.all(exercisePromises);

  const editedRoutine = await prisma.routine.update({
    where: { id },
    data: { name, type },
    select: routineExerciseSelect,
  });

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

export default {
  getAllRoutines,
  getRoutineById,
  createRoutine,
  editRoutine,
  deleteRoutine,
};
