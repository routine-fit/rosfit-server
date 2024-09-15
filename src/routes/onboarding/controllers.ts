import { Request, Response } from 'express';

import { prisma } from 'src/config/prisma';
import { getActionSuccessMsg } from 'src/utils/messages';

// TODO: Improve this endpoint
const createMyProfile = async (req: Request, res: Response) => {
  const userInfo = await prisma.userInfo.create({
    data: {
      name: '',
      lastName: '',
      birthDate: new Date(),
      gender: 'PREFER_NOT_SPECIFY',
      firebaseUid: req.firebaseUid,
      pushNotification: true,
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
