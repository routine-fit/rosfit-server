import 'express-async-errors';
import dotenv from 'dotenv';

import app from './app';
import logger from './config/logger';

dotenv.config();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  logger.log({
    level: 'info',
    message: `⚡️ Server is running at http://${process.env.BASE_URL || 'localhost'}:${port} ✅`,
    label: 'server',
  });
});
