import { NextFunction, Request, Response } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import firebase from 'src/config/firebase';
import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { ApiCodes } from 'src/utils/messages';

const forbiddenError = new CustomError(403, 'Forbidden. You must have permission to access.', {
  type: 'TOKEN_FORBIDDEN',
  label: 'firebase',
});

const getTokenDecoded = async (token: string) => {
  let response: DecodedIdToken;
  if (token.includes('Bearer ')) {
    token = token.replace('Bearer ', '');
  }

  try {
    response = await firebase.auth().verifyIdToken(token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.errorInfo?.code === 'auth/id-token-expired') {
      throw new CustomError(401, 'Unauthorized. Firebase ID token has expired.', {
        type: ApiCodes.TOKEN_EXPIRED,
        label: 'firebase',
      });
    }
    if (error?.errorInfo?.code === 'auth/argument-error') {
      throw new CustomError(401, 'Unauthorized. Provide a token.', {
        type: ApiCodes.INVALID_TOKEN,
        label: 'firebase',
      });
    }
    throw error;
  }

  return response;
};

export const hasDoneOnboarding = async (req: Request, res: Response, next: NextFunction) => {
  const userInfo = await prisma.userInfo.findUnique({ where: { firebaseUid: req.firebaseUid } });

  if (!userInfo)
    throw new CustomError(400, 'Please complete the onboarding process.', {
      type: ApiCodes.ONBOARDING_PROCESS_MISSING,
    });

  return next();
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  const response = await getTokenDecoded(String(authorization));
  if (response.userType !== 'ADMIN') {
    throw forbiddenError;
  }

  req.firebaseType = response.userType;

  return next();
};

export const isUser = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  const response = await getTokenDecoded(String(authorization));
  if (!response.uid) {
    throw forbiddenError;
  }

  req.firebaseUid = response.uid;
  req.firebaseType = response.userType;

  return next();
};
