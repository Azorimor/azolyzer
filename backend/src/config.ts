import dotenv = require("dotenv");

dotenv.config();

let botPrefix = process.env.BOT_PREFIX;
if (botPrefix == null) {
    botPrefix = "!";
}

export default {
    token: process.env.DISCORD_TOKEN,
    port: process.env.PORT,
    prefix: botPrefix,
    activity_name: process.env.BOT_PRESENCE_ACTIVITY_NAME,
    activity_type: process.env.BOT_PRESENCE_ACTIVITY_TYPE,
    activity_URL: process.env.BOT_PRESENCE_ACTIVITY_URL,

    // database
    db_type: process.env.TYPEORM_CONNECTION,
    db_host: process.env.TYPEORM_HOST,
    db_port: process.env.TYPEORM_PORT,
    db_username: process.env.TYPEORM_USERNAME,
    db_password: process.env.TYPEORM_PASSWORD,
    db_database: process.env.TYPEORM_DATABASE
};