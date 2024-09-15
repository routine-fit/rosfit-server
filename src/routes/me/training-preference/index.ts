import express from 'express';

import controllers from './controllers';
import { validateTrainingPreferenceCreation } from './validations';

const router = express.Router();

router.get('/', controllers.getMyTrainingPreference);
router.post('/', validateTrainingPreferenceCreation, controllers.createTrainingPreference);
router.put('/:id', validateTrainingPreferenceCreation, controllers.editTrainingPreference);
router.delete('/:id', controllers.deleteTrainingPreference);

export default router;
