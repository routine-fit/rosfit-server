import { Request, Response } from 'express';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { getActionSuccessMsg, missingId, notFound } from 'src/utils/messages';
import { getFormattedQueryParams } from 'src/utils/query';

import { exerciseSelect, formatExercises } from './utils';

const getAllExercises = async (req: Request, res: Response) => {
  const { query, orderBy } = getFormattedQueryParams(req.query);
  const exercises = await prisma.exercise.findMany({
    select: exerciseSelect,
    where: {
      ...query,
      userInfoId: req.firebaseUid,
    },
    orderBy,
  });
  if (exercises.length > 0) {
    return res.status(200).json({
      message: getActionSuccessMsg('Exercises', 'found'),
      data: exercises.map(formatExercises),
      error: false,
    });
  }
  throw new CustomError(404, notFound('Exercises'));
};

const getExerciseById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const exercise = await prisma.exercise.findFirst({
    select: exerciseSelect,
    where: {
      id,
      userInfoId: req.firebaseType === 'NORMAL' ? req.firebaseUid : undefined,
    },
  });
  if (exercise) {
    return res.status(200).json({
      message: getActionSuccessMsg('Exercise', 'found'),
      data: formatExercises(exercise),
      error: false,
    });
  }
  throw new CustomError(404, notFound(`Exercise with id: ${id}`));
};

const createExercise = async (req: Request, res: Response) => {
  const { links, ...exercise } = req.body;

  const createdExercise = await prisma.exercise.create({
    data: {
      ...exercise,
      links: {
        create: links,
      },
      user: {
        connect: {
          firebaseUid:
            req.firebaseType === 'NORMAL'
              ? req.firebaseUid
              : req.body.userInfoId || req.firebaseUid,
        },
      },
    },
    select: exerciseSelect,
  });

  return res.status(201).json({
    message: getActionSuccessMsg('Exercise', 'created'),
    data: formatExercises(createdExercise),
    error: false,
  });
};

const editExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const exercise = await prisma.exercise.findUnique({
    where: { id },
  });

  if (!exercise) {
    throw new CustomError(404, notFound('Exercise'));
  }
  // TODO: Review a better approach for updating the links
  const editedExercise = await prisma.exercise.update({
    where: { id },
    data: { ...req.body, userInfoId: exercise.userInfoId },
    select: exerciseSelect,
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Exercise', 'updated'),
    data: formatExercises(editedExercise),
    error: false,
  });
};

const deleteExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const exercise = await prisma.exercise.findUnique({
    where: {
      id,
      userInfoId: req.firebaseType === 'NORMAL' ? req.firebaseUid : undefined,
    },
    include: {
      links: true,
    },
  });

  if (!exercise) {
    throw new CustomError(404, notFound('Exercise'));
  }

  const deletedExercise = await prisma.exercise.delete({
    where: { id },
    select: exerciseSelect,
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Exercise', 'deleted'),
    data: formatExercises(deletedExercise),
    error: false,
  });
};

export default {
  getAllExercises,
  getExerciseById,
  createExercise,
  editExercise,
  deleteExercise,
};
