import express from 'express';

import meRouter from './me';

const router = express.Router();

router.use('/me', meRouter);

export default router;
