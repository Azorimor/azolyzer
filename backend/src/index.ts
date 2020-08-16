import app from './app';
import {
  Bot,
} from './bot';
import config from './config';
import logger from './logger';
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
  // starting the bot
  const bot = new Bot();
  bot.config();
  const client = bot.client;
  client.login(config.token).catch((error) => {
    logger.log({
      level: 'error',
      message: `Client failed to login. Maybe
      the given token is invalid. Error: ${error}`,
    });
  });
}).catch((error) => {
  logger.log({
    level: 'error',
    message: error,
  });
});
