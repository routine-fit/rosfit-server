import express from 'express';

import { hasDoneOnboarding, isUser } from 'src/middlewares/firebase';

import exerciseRouter from './exercise';
import meRouter from './me';
import routineRouter from './routine';

const router = express.Router();

router.use('/me', isUser, meRouter);
router.use('/exercise', isUser, hasDoneOnboarding, exerciseRouter);
router.use('/routine', isUser, hasDoneOnboarding, routineRouter);

export default router;
