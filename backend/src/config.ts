import dotenv = require('dotenv');

dotenv.config();

let botPrefix = process.env.BOT_PREFIX;
if (botPrefix == null) {
  botPrefix = '!';
}

export default {
  token: process.env.DISCORD_TOKEN,
  apiAccessTokenSecret: process.env.API_ACCESS_TOKEN_SECRET,
  apiRefreshTokenSecret: process.env.API_REFRESH_TOKEN_SECRET,
  client_id: process.env.DISCORD_CLIENT_ID,
  client_secret: process.env.DISCORD_CLIENT_SECRET,
  access_token_uri: process.env.DISCORD_ACCESS_TOKEN_URI,
  authorization_uri: process.env.DISCORD_AUTHORIZATION_URI,
  redirect_uri: process.env.DISCORD_REDIRECT_URI,
  port: process.env.PORT,
  prefix: botPrefix,
  activity_name: process.env.BOT_PRESENCE_ACTIVITY_NAME,
  activity_type: process.env.BOT_PRESENCE_ACTIVITY_TYPE,
  activity_URL: process.env.BOT_PRESENCE_ACTIVITY_URL,
  bot_owner: process.env.BOT_OWNER,
  bot_invite: process.env.BOT_INVITE,

  // database
  db_type: process.env.TYPEORM_CONNECTION,
  db_host: process.env.TYPEORM_HOST,
  db_port: process.env.TYPEORM_PORT,
  db_username: process.env.TYPEORM_USERNAME,
  db_password: process.env.TYPEORM_PASSWORD,
  db_database: process.env.TYPEORM_DATABASE,
};
