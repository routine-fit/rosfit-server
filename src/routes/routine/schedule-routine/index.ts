import express from 'express';

import controllers from './controllers';
import { validateScheduleRoutineCreation } from './validations';

const router = express.Router();

router.get('/', controllers.getAllScheduleRoutines);
router.post('/', validateScheduleRoutineCreation, controllers.createScheduleRoutine);
router.delete('/:id', controllers.deleteScheduleRoutine);

export default router;
