import express from 'express';

import controllers from './controllers';
import { validateExercise } from './validations';

const router = express.Router();

router.get('/', controllers.getAllExercises);
router.post('/', validateExercise, controllers.createExercise);
router.get('/:id', controllers.getExerciseById);
router.put('/:id', validateExercise, controllers.editExercise);
router.delete('/:id', controllers.deleteExercise);

export default router;
