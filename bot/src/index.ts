import {
  ShardingManager,
} from 'discord.js';
import logger from './utils/logger';
import config from './utils/config';

const manager = new ShardingManager('./dist/src/instance.js', {token: config.token});

manager.on('shardCreate', (shard) => {
  logger.info(`Launched shard ${shard.id}`);
});
manager.spawn();
