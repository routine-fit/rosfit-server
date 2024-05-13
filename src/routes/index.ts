import express from 'express';

import { isUser } from 'src/middlewares/firebase';

import authRouter from './auth';
import exerciseRouter from './exercise';
import routineRouter from './routine';
import trainingPreferenceRouter from './training-preferences';
import userInfoRouter from './user-info';

const router = express.Router();

router.use('/auth', isUser, authRouter);
router.use('/exercise', isUser, exerciseRouter);
router.use('/routine', isUser, routineRouter);
router.use('/training-preference', isUser, trainingPreferenceRouter);
router.use('/user-info', isUser, userInfoRouter);

export default router;
