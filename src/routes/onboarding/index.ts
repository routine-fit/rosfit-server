import express from 'express';

import { validateUserInfoCreation } from 'src/validations/user-info';

import onboardingController from './controllers';

const router = express.Router();

router.post('/new', validateUserInfoCreation, onboardingController.createMyProfile);

export default router;
