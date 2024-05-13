import { Request, Response } from 'express';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { getActionSuccessMsg, missingId, notFound } from 'src/utils/messages';
import { getFormattedQueryParams } from 'src/utils/query';

const getAllExercises = async (req: Request, res: Response) => {
  const { query, orderBy } = getFormattedQueryParams(req.query);
  const exercises = await prisma.exercise.findMany({
    include: {
      links: true,
    },
    where: {
      ...query,
      userInfoId: req.firebaseType === 'NORMAL' ? req.firebaseUid : <string>query.userInfoId,
    },
    orderBy,
  });
  if (exercises.length > 0) {
    return res.status(200).json({
      message: getActionSuccessMsg('Exercises', 'found'),
      data: exercises,
      error: false,
    });
  }
  throw new CustomError(404, notFound('Exercises'));
};

const getAnExercise = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const exercise = await prisma.exercise.findFirst({
    include: {
      links: true,
    },
    where: {
      id: Number(id),
      userInfoId: req.firebaseType === 'NORMAL' ? req.firebaseUid : undefined,
    },
  });
  if (exercise) {
    return res.status(200).json({
      message: getActionSuccessMsg('Exercise', 'found'),
      data: exercise,
      error: false,
    });
  }
  throw new CustomError(404, notFound(`Exercise with id: ${id}`));
};

const createExercise = async (req: Request, res: Response) => {
  const createdExercise = await prisma.exercise.create({
    data: {
      ...req.body,
      userInfoId: req.firebaseType === 'NORMAL' ? req.firebaseUid : <string>req.body.userInfoId,
    },
    include: {
      links: true,
    },
  });

  return res.status(201).json({
    message: getActionSuccessMsg('Exercise', 'created'),
    data: createdExercise,
    error: false,
  });
};

const editExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(id) },
  });

  if (!exercise) {
    throw new CustomError(404, notFound('Exercise'));
  }
  // TODO: Review a better approach for updating the links
  const editedExercise = await prisma.exercise.update({
    where: { id: Number(id) },
    data: { ...req.body, userInfoId: exercise.userInfoId },
    include: {
      links: true,
    },
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Exercise', 'updated'),
    data: editedExercise,
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
      id: Number(id),
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
    where: { id: Number(id) },
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Exercise', 'deleted'),
    data: deletedExercise,
    error: false,
  });
};

export default {
  getAllExercises,
  getAnExercise,
  createExercise,
  editExercise,
  deleteExercise,
};
