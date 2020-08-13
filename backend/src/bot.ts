import Discord from 'discord.js';
import config from './config';
import logger from './logger';

/**
 * The main App file.
 */
class Bot {
    public client: Discord.Client;
    /**
     * Create a new App with the default configured express settings.
     */
    constructor() {
      this.client = new Discord.Client({ // TODO set owner
        presence: {
          status: 'online',
          activity: {
            name: config.activity_name,
            type: 'WATCHING', // FIXME use env variable
            url: config.activity_URL,
          },
        },
      });
      this.config();
    }

    /**
     * Configure the client field.
     */
    private config(): void {
      this.client.once('ready', ()=> {
        logger.log({
          level: 'info',
          message: `Logged in as ${this.client?.user?.tag}!`,
        });
      });
    }
}

export default new Bot().client;
