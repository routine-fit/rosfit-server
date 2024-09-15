import express from 'express';

import controllers from './controllers';
import trainingPreferenceRouter from './training-preferences';

const router = express.Router();

router.get('/', controllers.getMe);
router.use('/training-preference', trainingPreferenceRouter);

export default router;
