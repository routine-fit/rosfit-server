import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { allowedTrainingTypes, trainingIntensity } from 'src/constants/validations';
import { CustomError } from 'src/interfaces/custom-error';

export const trainingPreferenceSchema = yup.object({
  type: yup.string().oneOf(allowedTrainingTypes).required(),
  time: yup.number().positive().required(),
  intensity: yup.string().oneOf(trainingIntensity).required(),
});

export const validateTrainingPreferenceCreation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await trainingPreferenceSchema.validate(req.body, { abortEarly: false, strict: true });
    return next();
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      throw new CustomError(400, error.errors[0]);
    } else {
      throw new CustomError(500, 'Internal Server Error');
    }
  }
};
