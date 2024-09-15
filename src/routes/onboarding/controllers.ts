import { Request, Response } from 'express';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { getActionSuccessMsg } from 'src/utils/messages';

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

export default {
  createMyProfile,
};
