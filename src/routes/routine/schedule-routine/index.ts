import express from 'express';

import controllers from './controllers';
// import { validateRoutineCreation } from './validations';

const router = express.Router();

router.get('/', controllers.getAllScheduleRoutines);
router.post('/', controllers.createScheduleRoutine);

export default router;
