import {
  Bot,
} from './bot';

const bot = new Bot();
const client = bot.client;

client.login(bot.token);
