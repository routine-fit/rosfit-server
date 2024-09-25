import * as yup from 'yup';
import { Exercise } from '@prisma/client';

import { muscleGroupValueList } from 'src/constants/validations';
import { createValidationFn } from 'src/utils/validations';

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

export const validateExercise = createValidationFn(exerciseSchema);
