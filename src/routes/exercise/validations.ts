import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { Exercise } from '@prisma/client';

import { muscleGroupValueList } from 'src/constants/validations';
import { CustomError } from 'src/interfaces/custom-error';

export const exerciseSchema = yup.object<Exercise>({
  name: yup.string().required(),
  muscleGroup: yup.string().oneOf(muscleGroupValueList).required(),
  links: yup
    .array()
    .of(
      yup.object({
        url: yup.string().required(),
      }),
    )
    .optional(),
});

export const validateExercise = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await exerciseSchema.validate(req.body, { abortEarly: false, strict: true });
    return next();
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      throw new CustomError(400, error.errors[0]);
    } else {
      throw new CustomError(500, 'Internal Server Error');
    }
  }
};
