import express from 'express';

import controllers from './controllers';
import scheduleRoutineRouter from './schedule-routine';
import { validateRoutineCreation } from './validations';

const router = express.Router();

router.use('/schedule', scheduleRoutineRouter);

router.get('/', controllers.getAllRoutines);
router.get('/:id', controllers.getRoutineById);
router.post('/', validateRoutineCreation, controllers.createRoutine);
router.put('/:id', validateRoutineCreation, controllers.editRoutine);
router.delete('/:id', controllers.deleteRoutine);

export default router;
