import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { prisma } from 'src/config/prisma';
import { weightMeasureValueList } from 'src/constants/validations';
import { CustomError } from 'src/interfaces/custom-error';
import { Exercise, RoutineExerciseInput } from 'src/interfaces/routine';
import { createValidationFn, hasUniqueValues } from 'src/utils/validations';

const routineSchemaCreation = yup
  .object<RoutineExerciseInput>({
    name: yup.string().required(),
    // TODO: Add a list of possible values
    type: yup.string().required(),
    exercises: yup
      .array()
      .of(
        yup.object({
          exerciseId: yup.string().required(),
          repetitions: yup.number().required(),
          order: yup.number().min(1).required(),
          restTimeSecs: yup.number().optional(),
          series: yup
            .array()
            .of(
              yup.object({
                id: yup.string().optional(),
                order: yup.number().min(1).required(),
                weight: yup.number().required(),
                weightMeasure: yup.string().oneOf(weightMeasureValueList).optional(),
                routineExerciseId: yup.string().optional(),
              }),
            )
            .min(1)
            .max(10)
            .test('hasUniqueOrder', 'The order of the series are duplicated', (value) =>
              hasUniqueValues(value, ({ order }) => order),
            ),
        }),
      )
      .required()
      .min(1)
      .max(10)
      .test('hasUniqueExercises', 'One of the exercises is duplicated', (value) =>
        hasUniqueValues(value, ({ exerciseId }) => exerciseId),
      )
      .test('hasUniqueOrder', 'The order of the exercises are duplicated', (value) =>
        hasUniqueValues(value, ({ order }) => order),
      ),
  })
  .noUnknown(true)
  .required();

export const validateRoutine = createValidationFn(routineSchemaCreation);

const startRoutineScheme = yup
  .object({ scheduleRoutineId: yup.string().required() })
  .noUnknown(true)
  .required();

export const validateStartRoutine = createValidationFn(startRoutineScheme);

const finishRoutineScheme = yup
  .object({
    exercises: yup
      .array()
      .of(
        yup.object({
          id: yup.string().required(),
          repetitions: yup.number().required(),
          restTimeSecs: yup.number().required(),
          series: yup
            .array()
            .of(
              yup.object({
                id: yup.string().required(),
                weight: yup.number().required(),
                weightMeasure: yup.string().oneOf(weightMeasureValueList).required(),
              }),
            )
            .min(1),
        }),
      )
      .required()
      .min(1),
  })
  .noUnknown(true)
  .required();

export const validateFinishRoutine = createValidationFn(finishRoutineScheme);

export const validateExercisesBelongsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const exercises = await prisma.exercise.findMany({
    where: {
      OR: req?.body?.exercises?.map(({ exerciseId }: Exercise) => ({
        id: exerciseId,
        userId: req.firebaseUid,
      })),
    },
  });

  if (exercises.length !== req.body.exercises.length)
    throw new CustomError(400, 'One of the exercises do not exists.');

  return next();
};
