import { Request, Response } from 'express';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { getActionSuccessMsg, notFound } from 'src/utils/messages';

import { trainingPreferenceSelect } from './training-preference/utils';
import { growthRecordSelect, userInfoSelect } from './utils';

const getMe = async (req: Request, res: Response) => {
  const userInfo = await prisma.userInfo.findUnique({
    where: {
      firebaseUid: req.firebaseUid,
    },
    select: userInfoSelect,
  });

  const trainingPreference = await prisma.trainingPreference.findUnique({
    where: {
      userInfoId: req.firebaseUid,
    },
    select: trainingPreferenceSelect,
  });

  const growRecords = await prisma.growthRecord.findMany({
    where: {
      userInfoId: req.firebaseUid,
    },
    select: growthRecordSelect,
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (userInfo) {
    return res.status(200).json({
      message: getActionSuccessMsg('My information', 'found'),
      data: {
        personalInformation: userInfo,
        trainingPreference,
        growRecords,
      },
      error: false,
    });
  }
  throw new CustomError(404, notFound('My information'));
};

const createMyProfile = async (req: Request, res: Response) => {
  const userInfoBody = req.body;

  const alreadyCreated = await prisma.userInfo.findUnique({
    where: { firebaseUid: req.firebaseUid },
  });

  if (alreadyCreated) {
    throw new CustomError(400, 'User information already created');
  }

  const birthDate = new Date(userInfoBody.birthDate);

  const userInfo = await prisma.userInfo.create({
    data: {
      ...userInfoBody,
      birthDate,
      firebaseUid: req.firebaseUid,
    },
    select: userInfoSelect,
  });
  if (userInfo) {
    return res.status(200).json({
      message: getActionSuccessMsg('My information', 'created'),
      data: userInfo,
      error: false,
    });
  }
};

const updateMyProfile = async (req: Request, res: Response) => {
  const userInfoBody = req.body;

  const alreadyCreated = await prisma.userInfo.findUnique({
    where: { firebaseUid: req.firebaseUid },
  });

  const birthDate = new Date(userInfoBody.birthDate);

  const userInfo = await prisma.userInfo.update({
    where: { firebaseUid: req.firebaseUid },
    data: {
      ...alreadyCreated,
      ...userInfoBody,
      birthDate,
      firebaseUid: req.firebaseUid,
    },
    select: userInfoSelect,
  });
  if (userInfo) {
    return res.status(200).json({
      message: getActionSuccessMsg('My information', 'created'),
      data: userInfo,
      error: false,
    });
  }
};

const createGrowthRecord = async (req: Request, res: Response) => {
  const createdGrowthRecord = await prisma.growthRecord.create({
    data: {
      ...req.body,
      userInfoId: req.firebaseUid,
      createdAt: new Date(),
    },
    select: growthRecordSelect,
  });

  return res.status(201).json({
    message: getActionSuccessMsg('Growth Record', 'created'),
    data: createdGrowthRecord,
    error: false,
  });
};

export default {
  getMe,
  createMyProfile,
  updateMyProfile,
  createGrowthRecord,
};
