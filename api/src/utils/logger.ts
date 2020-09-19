import winston from 'winston';
import {
  ElasticsearchTransport,
} from 'winston-elasticsearch';
import {
  Client,
} from '@elastic/elasticsearch';
import config from './config';

const elasticClient = new Client({
  node: config.elasticseachNodeURI,
  maxRetries: 5,
  requestTimeout: 1000,
  auth: {
    username: config.elasticsearchUsername!,
    password: config.elasticsearchPassword!,
  },
});

const esTransport = new ElasticsearchTransport({
  level: 'info',
  client: elasticClient,
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {
    service: 'api-service',
  },
  transports: [
    esTransport,
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Compulsory error handling
logger.on('error', (error) => {
  console.error('Error caught', error);
});
esTransport.on('warning', (error) => {
  console.error('Error caught', error);
});

export default logger;
