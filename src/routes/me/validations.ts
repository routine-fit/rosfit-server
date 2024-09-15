import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import {
  genderValueList,
  heightMeasureValueList,
  weightMeasureValueList,
} from 'src/constants/validations';
import { CustomError } from 'src/interfaces/custom-error';

export const userInfoSchema = yup.object({
  name: yup.string().required(),
  lastName: yup.string().required(),
  birthDate: yup
    .string()
    .required()
    .test((dateString) => new Date(dateString).toString() !== 'Invalid Date'),
  gender: yup.string().oneOf(genderValueList).required(),
  pushNotification: yup.boolean().optional(),
});

export const validateMyInformation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userInfoSchema.validate(req.body, { abortEarly: false, strict: true });
    return next();
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      throw new CustomError(400, error.errors[0]);
    } else {
      throw new CustomError(500, 'Internal Server Error');
    }
  }
};

const growthRecordSchema = yup.object({
  weight: yup.number().moreThan(0).required(),
  weightMeasure: yup.string().oneOf(weightMeasureValueList).optional(),
  height: yup.number().moreThan(0).required(),
  heightMeasure: yup.string().oneOf(heightMeasureValueList).optional(),
});

export const validateGrowthRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await growthRecordSchema.validate(req.body, { abortEarly: false, strict: true });
    return next();
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      throw new CustomError(400, error.errors[0]);
    } else {
      throw new CustomError(500, 'Internal Server Error');
    }
  }
};
