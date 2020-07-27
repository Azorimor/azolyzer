import app from "./app";
import client from "./bot"
import config from "./config";
import {createConnection} from "typeorm";

createConnection().then(() => {
    // starting express
    app.listen(config.port, () => {
        console.log("App is listening on port "+ config.port);
    });
    // starting the bot
    client.login(config.token);
}).catch((error) => {
    console.log(error);
})