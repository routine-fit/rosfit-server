import * as yup from 'yup';

import { daysValueList } from 'src/constants/validations';
import { ScheduleRoutineInput } from 'src/interfaces/routine';
import { createValidationFn } from 'src/utils/validations';

export const scheduleRoutineSchemaCreation = yup
  .object<ScheduleRoutineInput>({
    routineId: yup.string().required().uuid(),
    day: yup.string().oneOf(daysValueList).required(),
    isActive: yup.boolean().default(true),
  })
  .noUnknown(true)
  .required();

export const validateScheduleRoutineCreation = createValidationFn(scheduleRoutineSchemaCreation);
