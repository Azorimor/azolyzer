import Discord from 'discord.js';
import config from './utils/config';
import logger from './utils/logger';
import DiscordMessageEvent from './event/message';
import DiscordGuildCreateEvent from './event/guildCreate';
import DiscordChannelCreateEvent from './event/channelCreate';

/**
 * The main App file.
 */
export class Bot {
    public client: Discord.Client;
    public token: string = config.token!; // TODO message on empty token
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
    public config(): void {
      this.client.once('ready', ()=> {
        logger.info(`Logged in as ${this.client?.user?.tag}.`);
      });
      // this.client.on('message', (message) => DiscordMessageEvent.execute(message));
      // this.client.on('guildCreate', (guild) => DiscordGuildCreateEvent.execute(guild));
      // this.client.on('channelCreate', (channel) => DiscordChannelCreateEvent.execute(channel));
    }
}
