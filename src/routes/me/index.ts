import express from 'express';

import { hasDoneOnboarding } from 'src/middlewares/firebase';

import controllers from './controllers';
import trainingPreferenceRouter from './training-preference';
import { validateGrowthRecord, validateMyInformation } from './validations';

const router = express.Router();

router.get('/', hasDoneOnboarding, controllers.getMe);
router.put('/', hasDoneOnboarding, validateMyInformation, controllers.updateMyProfile);
router.post('/onboarding', validateMyInformation, controllers.createMyProfile);
router.post(
  '/growth-record',
  hasDoneOnboarding,
  validateGrowthRecord,
  controllers.createGrowthRecord,
);
router.use('/training-preference', hasDoneOnboarding, trainingPreferenceRouter);

export default router;
