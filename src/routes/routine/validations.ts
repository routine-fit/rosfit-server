import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { CustomError } from 'src/interfaces/custom-error';
import { Exercise, RoutineExerciseInput, Serie } from 'src/interfaces/routine';

export const routineSchemaCreation = yup
  .object<RoutineExerciseInput>({
    name: yup.string().required(),
    // TODO: Add a list of possible values
    type: yup.string().required(),
    exercises: yup
      .array()
      .of(
        yup.object<Exercise>({
          exerciseId: yup.string().required(),
          repetitions: yup.number().required(),
          order: yup.number().min(1).required(),
          restTimeSecs: yup.number().optional(),
          series: yup
            .array()
            .of(
              yup.object<Serie>({
                id: yup.string().optional(),
                order: yup.number().min(1).required(),
                weight: yup.number().required(),
                weightMeasure: yup.string().optional(),
                routineExerciseId: yup.string().optional(),
              }),
            )
            .min(1)
            .max(10),
        }),
      )
      .required()
      .min(1)
      .max(10),
  })
  .noUnknown(true)
  .required();

export const validateRoutineCreation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await routineSchemaCreation.validate(req.body, { strict: true });
    return next();
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      throw new CustomError(400, error.errors[0]);
    } else {
      throw new CustomError(500, 'Internal Server Error');
    }
  }
};
