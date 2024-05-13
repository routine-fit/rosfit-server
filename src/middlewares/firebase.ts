import { NextFunction, Request, Response } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import firebase from 'src/config/firebase';
import { CustomError } from 'src/interfaces/custom-error';

const forbiddenError = new CustomError(403, 'Forbidden. You must have permission to access.', {
  type: 'TOKEN_FORBIDDEN',
  label: 'firebase',
});

const getTokenDecoded = async (token: string) => {
  let response: DecodedIdToken;
  try {
    response = await firebase.auth().verifyIdToken(token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.errorInfo?.code === 'auth/id-token-expired') {
      throw new CustomError(401, 'Unauthorized. Firebase ID token has expired.', {
        type: 'TOKEN_EXPIRED',
        label: 'firebase',
      });
    }
    if (error?.errorInfo?.code === 'auth/argument-error') {
      throw new CustomError(401, 'Unauthorized. Provide a token.', {
        type: 'NO_TOKEN',
        label: 'firebase',
      });
    }
    throw error;
  }

  return response;
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;

  const response = await getTokenDecoded(String(token));
  if (response.userType !== 'ADMIN') {
    throw forbiddenError;
  }

  req.firebaseType = response.userType;

  return next();
};

export const isUser = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;

  const response = await getTokenDecoded(String(token));
  if (!response.uid) {
    throw forbiddenError;
  }

  req.firebaseUid = response.uid;
  req.firebaseType = response.userType;

  return next();
};
