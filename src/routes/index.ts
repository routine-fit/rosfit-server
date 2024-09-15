import express from 'express';

import { isUser } from 'src/middlewares/firebase';

import exerciseRouter from './exercise';
import meRouter from './me';
import routineRouter from './routine';

const router = express.Router();

router.use('/me', isUser, meRouter);
router.use('/exercise', isUser, exerciseRouter);
router.use('/routine', isUser, routineRouter);

export default router;
