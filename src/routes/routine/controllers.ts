import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { RoutineExerciseInput } from 'src/interfaces/routine';
import { getActionSuccessMsg, missingId, notFound } from 'src/utils/messages';

import { routineExerciseInclude } from './constants';

const getAllRoutines = async (req: Request, res: Response) => {
  const routines = await prisma.routine.findMany({
    include: routineExerciseInclude,
  });
  if (routines.length > 0) {
    return res.status(200).json({
      message: getActionSuccessMsg('Routines', 'found'),
      data: routines,
      error: false,
    });
  }
  throw new CustomError(404, notFound('routines'));
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
      series: {
        create: exercise.series,
      },
    }),
  );

  const createdRoutine = await prisma.routine.create({
    data: {
      name,
      type,
      userInfoId: req.firebaseUid,
      exercises: {
        create: routineExercises,
      },
    },
    include: routineExerciseInclude,
  });

  return res.status(201).json({
    message: getActionSuccessMsg('Routine', 'created'),
    data: createdRoutine,
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
    (savedExercise) =>
      !exercises.find((exercise) => exercise.exerciseId === savedExercise.exerciseId),
  );

  await prisma.routineExercise.deleteMany({
    where: {
      id: {
        in: routineExercisesToBeRemoved.map(({ id }) => id),
      },
    },
  });

  for (let i = 0; i < exercises.length; i++) {
    const exercise = exercises[i];
    const { series, id: routineExerciseId, routineId: _routineId, ...exerciseRest } = exercise;

    if (routineExerciseId) {
      const routineExerciseSaved = routine.exercises.find(
        (routineExercise) => routineExercise.id === routineExerciseId,
      );

      if (routineExerciseSaved) {
        const seriesToBeRemoved = routineExerciseSaved.series.filter(
          (savedSerie) => !series.find((serie) => serie.id === savedSerie.id),
        );

        await prisma.seriesRoutineExercise.deleteMany({
          where: {
            id: {
              in: seriesToBeRemoved.map(({ id }) => id),
            },
          },
        });
      }

      await prisma.routineExercise.update({
        where: { id: routineExerciseId },
        data: exerciseRest,
      });

      for (let serieI = 0; serieI < series.length; serieI++) {
        const serie = series[serieI];
        const { id: serieId, ...restSerie } = serie;
        if (serieId) {
          await prisma.seriesRoutineExercise.update({
            where: { id: serieId },
            data: restSerie,
          });
        } else {
          await prisma.seriesRoutineExercise.create({
            data: { ...restSerie, routineExerciseId },
          });
        }
      }
    } else {
      await prisma.routineExercise.create({
        data: {
          ...exerciseRest,
          routineId: routine.id,
          series: {
            create: series,
          },
        },
      });
    }
  }

  const editedRoutine = await prisma.routine.update({
    where: { id },
    data: { name, type },
    include: routineExerciseInclude,
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Routine', 'updated'),
    data: editedRoutine,
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
    include: routineExerciseInclude,
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Routine', 'deleted'),
    data: deletedRoutine,
    error: false,
  });
};

export default {
  getAllRoutines,
  createRoutine,
  editRoutine,
  deleteRoutine,
};
