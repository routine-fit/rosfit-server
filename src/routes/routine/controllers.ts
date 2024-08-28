import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { RoutineExerciseInput } from 'src/interfaces/routine';
import { getActionSuccessMsg, missingId, notFound } from 'src/utils/messages';

const getAllRoutines = async (req: Request, res: Response) => {
  const routines = await prisma.routine.findMany({
    include: {
      exercises: {
        include: {
          series: true,
        },
      },
    },
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
          id: exercise.id,
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
    include: {
      exercises: {
        include: {
          series: true,
        },
      },
    },
  });

  return res.status(201).json({
    message: getActionSuccessMsg('Routine', 'created'),
    data: createdRoutine,
    error: false,
  });
};

const editRoutine = async (req: Request, res: Response) => {
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

  const editedRoutine = await prisma.routine.update({
    where: { id },
    data: { ...req.body },
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
