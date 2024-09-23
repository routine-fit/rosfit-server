import * as yup from 'yup';

import { allowedTrainingTypes, trainingIntensity } from 'src/constants/validations';
import { createValidationFn } from 'src/utils/validations';

export const trainingPreferenceSchema = yup.object({
  type: yup.string().oneOf(allowedTrainingTypes).required(),
  time: yup.number().positive().required(),
  intensity: yup.string().oneOf(trainingIntensity).required(),
});

export const validateTrainingPreferenceCreation = createValidationFn(trainingPreferenceSchema);
