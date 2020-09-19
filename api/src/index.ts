import app from './app';
import config from './utils/config';
import logger from './utils/logger';
import {
  createConnection,
} from 'typeorm';

createConnection().then(() => {
  // starting express
  app.listen(config.port, () => {
    logger.log({
      level: 'info',
      message: `App is listening on port ${config.port}`,
    });
  });
}).catch((error) => {
  logger.log({
    level: 'error',
    message: error,
  });
});
