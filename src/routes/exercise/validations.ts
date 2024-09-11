import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { Exercise } from '@prisma/client';

import { CustomError } from 'src/interfaces/custom-error';

const muscleGroupValues = [
  'ABDOMINAL',
  'BICEPS',
  'DELTOID',
  'ERECTOR_SPINAE',
  'LATISSIMUS_DORSI',
  'PECTORAL',
  'TRAPEZIUS',
  'TRICEPS',
];

export const exerciseSchema = yup.object<Exercise>({
  name: yup.string().required(),
  muscleGroup: yup.string().oneOf(muscleGroupValues).required(),
  // links: yup
  //   .object()
  //   .shape({
  //     create: yup.object().shape({
  //       url: yup.string().required(),
  //     }),
  //   })
  //   .optional(),
  userInfoId: yup.string().optional(),
});

export const validateExercise = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await exerciseSchema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      throw new CustomError(400, error.errors[0]);
    } else {
      throw new CustomError(500, 'Internal Server Error');
    }
  }
};
