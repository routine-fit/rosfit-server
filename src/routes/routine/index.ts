import express from 'express';

import controllers from './controllers';
import { validateRoutineCreation } from './validations';

const router = express.Router();

router.get('/', controllers.getAllRoutines);
router.get('/:id', controllers.getRoutineById);
router.post('/', validateRoutineCreation, controllers.createRoutine);
router.put('/:id', validateRoutineCreation, controllers.editRoutine);
router.delete('/:id', controllers.deleteRoutine);

export default router;
