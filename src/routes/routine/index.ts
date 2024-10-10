import express from 'express';

import controllers from './controllers';
import scheduleRoutineRouter from './schedule-routine';
import {
  validateExercisesBelongsToUser,
  validateFinishRoutine,
  validateRoutine,
  validateStartRoutine,
} from './validations';

const router = express.Router();

router.use('/schedule', scheduleRoutineRouter);

router.post('/start', validateStartRoutine, controllers.startRoutine);
router.get('/summary', controllers.getSummaryRoutines);
router.put('/finish/:summaryRoutineId', validateFinishRoutine, controllers.finishRoutine);

router.get('/', controllers.getAllRoutines);
router.get('/:id', controllers.getRoutineById);
router.post('/', validateRoutine, validateExercisesBelongsToUser, controllers.createRoutine);
router.put('/:id', validateRoutine, validateExercisesBelongsToUser, controllers.editRoutine);
router.delete('/:id', controllers.deleteRoutine);

export default router;
