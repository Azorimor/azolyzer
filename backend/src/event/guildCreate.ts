import {
  DiscordEvent,
} from './discordevent';
import {
  Guild,
} from 'discord.js';
import logger from '../logger';

/**
 * Handles discord event 'guildCreate'.
 */
export class DiscordGuildCreateEvent extends DiscordEvent {
  /**
   * Create a new Handler for this Event.
   */
  constructor() {
    super('guildCreate');
  }

  /**
   * Called, when the events get triggered.
   * @param {Guild} guild The issued message, which called this event.
   */
  public async execute(guild: Guild):Promise<void> {
    logger.info('guildCreated triggered ');
    guild.members.fetch().then((member)=> {
      logger.info(member);
    }).catch((error) => {
      logger.error(`Members of the guild ${guild.id}, could not be loaded. Error: ${error}`);
    });
  }
}
export default new DiscordGuildCreateEvent();
