import express from 'express';

import controllers from './controllers';
import trainingPreferenceRouter from './training-preference';
import { validateGrowthRecord, validateMyInformation } from './validations';

const router = express.Router();

router.get('/', controllers.getMe);
router.put('/', validateMyInformation, controllers.updateMyProfile);
router.post('/onboarding', validateMyInformation, controllers.createMyProfile);
router.post('/growth-record', validateGrowthRecord, controllers.createGrowthRecord);
router.use('/training-preference', trainingPreferenceRouter);

export default router;
