import { Request, Response } from 'express';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { getActionSuccessMsg, missingId, notFound } from 'src/utils/messages';

import { trainingPreferenceSelect } from './utils';

const getMyTrainingPreference = async (req: Request, res: Response) => {
  const trainingPreferences = await prisma.trainingPreference.findMany({
    where: {
      userId: req.firebaseUid,
    },
    select: trainingPreferenceSelect,
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
  const trainingPreference = await prisma.trainingPreference.findUnique({
    where: { userId: req.firebaseUid },
    select: trainingPreferenceSelect,
  });

  if (trainingPreference) {
    throw new CustomError(400, 'Training preference already created, please edit yours');
  }

  const createdPreferences = await prisma.trainingPreference.create({
    data: {
      ...req.body,
      userId: req.firebaseUid,
    },
    select: trainingPreferenceSelect,
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

  const editedTrainingPreference = await prisma.trainingPreference.update({
    where: { id },
    data: { ...req.body },
    select: trainingPreferenceSelect,
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Training Preference', 'updated'),
    data: editedTrainingPreference,
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
  });

  if (!trainingPreference) {
    throw new CustomError(404, notFound('Training Preference'));
  }

  const deletedTrainingPreference = await prisma.trainingPreference.delete({
    where: { id },
    select: trainingPreferenceSelect,
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Training Preference', 'deleted'),
    data: deletedTrainingPreference,
    error: false,
  });
};

export default {
  getMyTrainingPreference,
  createTrainingPreference,
  editTrainingPreference,
  deleteTrainingPreference,
};
