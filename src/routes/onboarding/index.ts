import express from 'express';

import onboardingController from './controllers';

const router = express.Router();

router.post('/new', onboardingController.createMyProfile);

export default router;
