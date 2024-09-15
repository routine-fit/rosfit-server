import { Request, Response } from 'express';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { getActionSuccessMsg, notFound } from 'src/utils/messages';

const getMe = async (req: Request, res: Response) => {
  const userInfo = await prisma.userInfo.findUnique({
    where: {
      firebaseUid: req.firebaseUid,
    },
  });
  if (userInfo) {
    return res.status(200).json({
      message: getActionSuccessMsg('My information', 'found'),
      data: userInfo,
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
  });
  if (userInfo) {
    return res.status(200).json({
      message: getActionSuccessMsg('My information', 'created'),
      data: userInfo,
      error: false,
    });
  }
};

export default {
  getMe,
  createMyProfile,
  updateMyProfile,
};
