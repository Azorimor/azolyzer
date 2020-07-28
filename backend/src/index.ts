import app from "./app";
import client from "./bot"
import config from "./config";
import logger from "./logger";
import {createConnection} from "typeorm";

createConnection().then((connection) => {
    // starting express
    app.listen(config.port, () => {
        logger.log({
            level: "info",
            message: `App is listening on port ${config.port}`,
        });
    });
    // starting the bot
    client.login(config.token);
}).catch((error) => {
    logger.log({
        level: "error",
        message: error,
    });
})