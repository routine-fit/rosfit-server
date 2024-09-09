import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { CustomError } from 'src/interfaces/custom-error';
import { Exercise, RoutineExerciseInput, Serie } from 'src/interfaces/routine';

export const routineSchema = yup.object<RoutineExerciseInput>({
  name: yup.string().required(),
  type: yup.string().required(),
  exercises: yup
    .array()
    .of(
      yup.object<Exercise>({
        id: yup.string().required(),
        repetitions: yup.number().required(),
        restTimeSecs: yup.number().optional(),
        variableWeight: yup.boolean(),
        series: yup.array(
          yup.object<Serie>().shape({
            serieNumber: yup.number().required(),
            weight: yup.number().required(),
          }),
        ),
      }),
    )
    .required()
    .min(1)
    .max(10),
});

export const validateRoutineCreation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await routineSchema.validate(req.body, { strict: true });
    return next();
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      throw new CustomError(400, error.errors[0]);
    } else {
      throw new CustomError(500, 'Internal Server Error');
    }
  }
};
