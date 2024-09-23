import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { daysValueList } from 'src/constants/validations';
import { CustomError } from 'src/interfaces/custom-error';
import { ScheduleRoutineInput } from 'src/interfaces/routine';

export const scheduleRoutineSchemaCreation = yup
  .object<ScheduleRoutineInput>({
    routineId: yup.string().required().uuid(),
    day: yup.string().oneOf(daysValueList).required(),
    isActive: yup.boolean().default(true),
  })
  .noUnknown(true)
  .required();

export const validateScheduleRoutineCreation = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    await scheduleRoutineSchemaCreation.validate(req.body, { strict: true });
    return next();
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      throw new CustomError(400, error.errors[0]);
    } else {
      throw new CustomError(500, 'Internal Server Error');
    }
  }
};
