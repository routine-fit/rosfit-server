import * as yup from 'yup';

import { weightMeasureValueList } from 'src/constants/validations';
import { Exercise, RoutineExerciseInput, Serie } from 'src/interfaces/routine';
import { createValidationFn } from 'src/utils/validations';

const routineSchemaCreation = yup
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
                weightMeasure: yup.string().oneOf(weightMeasureValueList).optional(),
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
