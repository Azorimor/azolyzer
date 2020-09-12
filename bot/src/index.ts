import {
  ShardingManager,
} from 'discord.js';
import config from './config';

console.log("index.ts: "+config.token);
const manager = new ShardingManager('./dist/src/instance.js', {token: config.token});

manager.on('shardCreate', (shard) => {
  console.log(`Launched shard ${shard.id}`);
});
manager.spawn();
