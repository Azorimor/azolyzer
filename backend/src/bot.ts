import Commando from "discord.js-commando";
// import sqlite from "sqlite"; //FIXME temporary later postgres will be used.
const sqlite = require("sqlite");
import sqlite3 from "sqlite3";
import config from "./config";
import path from "path";

/**
 * The main App file.
 */
class Bot {
    public client: Commando.CommandoClient;
    /**
     * Create a new App with the default configured express settings.
     */
    constructor() {
      this.client = new Commando.CommandoClient({ // TODO set owner
          presence: {
              status: "online",
              activity: {
                name: config.activity_name,
                type: "WATCHING", // FIXME use env variable
                url: config.activity_URL
              },
          },
          // owner: config.bot_owner
      });
      this.config();
    }

    /**
     * Configure the client field.
     */
    private config(): void {
        this.client.registry.registerDefaultTypes()
        .registerGroups([
            ["fun","Fun commands"],
            ["moderation","Moderation commands"]
        ])
        .registerDefaultGroups()
        .registerDefaultCommands()
        .registerCommandsIn(path.join(__dirname,"commands"));

        this.client.setProvider(sqlite.open({
            filename: path.join(__dirname,"settings.sqlite3"),
            driver: sqlite3.Database
        }).then((db : sqlite3.Database) =>
            new Commando.SQLiteProvider(db)
        )).catch(error => {
            console.log(error);
        })

        this.client.once("ready", ()=> {
            console.log("Logged in as "+ this.client!.user!.tag+"!");
        });
    }
}

export default new Bot().client;