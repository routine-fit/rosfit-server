import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { CustomError } from 'src/interfaces/custom-error';

export const createValidationFn =
  <Scheme extends yup.ObjectSchema<yup.Maybe<yup.AnyObject>>>(yupScheme: Scheme) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await yupScheme.validate(req.body, { abortEarly: false, strict: true });
      return next();
    } catch (error) {
      if (yup.ValidationError.isError(error)) {
        throw new CustomError(400, error.errors[0]);
      } else {
        throw new CustomError(500, 'Internal Server Error');
      }
    }
  };

export const hasUniqueValues = <T>(
  items: T[] = [],
  valueExtractor: (item: T) => number | string,
) => {
  if (!Array.isArray(items)) return false;

  const values = items.map(valueExtractor);

  return new Set(values).size === values.length;
};
