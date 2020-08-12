import winston from 'winston';
import {
  PostgresTransport,
} from './utils/winston-typeorm';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {
    service: 'backend-service',
  },
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'combinded.log',
    }),
    new PostgresTransport({
      name: 'TypeOrm-Postgres',
      level: 'info',
      silent: false,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
