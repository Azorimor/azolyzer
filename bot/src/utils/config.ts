import dotenv = require('dotenv');

dotenv.config();

let botPrefix = process.env.BOT_PREFIX;
if (botPrefix == null) {
  botPrefix = '!';
}

const config = {
  token: process.env.DISCORD_TOKEN,
  apiAccessTokenSecret: process.env.API_ACCESS_TOKEN_SECRET,
  apiRefreshTokenSecret: process.env.API_REFRESH_TOKEN_SECRET,
  elasticseachNodeURI: process.env.ELASTICSEARCH_NODE_URI,
  elasticsearchUsername: process.env.ELASTICSEARCH_USERNAME,
  elasticsearchPassword: process.env.ELASTICSEARCH_PASSWORD,
  port: process.env.PORT,
  prefix: botPrefix,
  activity_name: process.env.BOT_PRESENCE_ACTIVITY_NAME,
  activity_type: process.env.BOT_PRESENCE_ACTIVITY_TYPE,
  activity_URL: process.env.BOT_PRESENCE_ACTIVITY_URL,
  bot_owner: process.env.BOT_OWNER,
  bot_invite: process.env.BOT_INVITE,
};

console.log(config);

export default config;
