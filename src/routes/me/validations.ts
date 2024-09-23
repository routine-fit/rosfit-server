import * as yup from 'yup';

import {
  genderValueList,
  heightMeasureValueList,
  weightMeasureValueList,
} from 'src/constants/validations';
import { createValidationFn } from 'src/utils/validations';

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

export const validateMyInformation = createValidationFn(userInfoSchema);

const growthRecordSchema = yup.object({
  weight: yup.number().moreThan(0).required(),
  weightMeasure: yup.string().oneOf(weightMeasureValueList).optional(),
  height: yup.number().moreThan(0).required(),
  heightMeasure: yup.string().oneOf(heightMeasureValueList).optional(),
});

export const validateGrowthRecord = createValidationFn(growthRecordSchema);
