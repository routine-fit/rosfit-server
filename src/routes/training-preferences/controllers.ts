import { Request, Response } from 'express';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { getActionSuccessMsg, missingId, notFound } from 'src/utils/messages';

const getAllTrainingPreferences = async (req: Request, res: Response) => {
  const trainingPreferences = await prisma.trainingPreference.findMany({
    include: {
      user: true,
    },
  });
  if (trainingPreferences.length > 0) {
    return res.status(200).json({
      message: getActionSuccessMsg('Training Preference', 'found'),
      data: trainingPreferences,
      error: false,
    });
  }
  throw new CustomError(404, notFound('Training Preference'));
};

const createTrainingPreference = async (req: Request, res: Response) => {
  const createdPreferences = await prisma.trainingPreference.create({
    data: req.body,
    include: {
      user: true,
    },
  });

  return res.status(201).json({
    message: getActionSuccessMsg('Training Preference', 'created'),
    data: createdPreferences,
    error: false,
  });
};

const editTrainingPreference = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const trainingPreference = await prisma.trainingPreference.findUnique({
    where: { id },
  });

  if (!trainingPreference) {
    throw new CustomError(404, notFound('Training Preference'));
  }

  const editedtrainingPreference = await prisma.trainingPreference.update({
    where: { id },
    data: { ...req.body },
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Training Preference', 'updated'),
    data: editedtrainingPreference,
    error: false,
  });
};

const deleteTrainingPreference = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const trainingPreference = await prisma.trainingPreference.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  if (!trainingPreference) {
    throw new CustomError(404, notFound('Training Preference'));
  }

  const deletedTrainingPreference = await prisma.trainingPreference.delete({
    where: { id },
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Training Preference', 'deleted'),
    data: deletedTrainingPreference,
    error: false,
  });
};

export default {
  getAllTrainingPreferences,
  createTrainingPreference,
  editTrainingPreference,
  deleteTrainingPreference,
};
