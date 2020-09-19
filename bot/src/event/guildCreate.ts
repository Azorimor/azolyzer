import {
  DiscordEvent,
} from './discordevent';
import {
  Guild,
} from 'discord.js';
import logger from '../utils/logger';

/**
 * Handles discord event 'guildCreate'.
 */
export class DiscordGuildCreateEvent extends DiscordEvent {
  /**
   * Create a new Handler for this Event.
   */
  constructor() {
    super('guildCreate');
    logger.debug('DiscordGuildCreateEvent created');
  }

  /**
   * Called, when the events get triggered.
   * @param {Guild} guild The issued message, which called this event.
   */
  public async execute(guild: Guild):Promise<void> {
    // logger.info('guild created:-------------------'); // FIXME remove
    // guildController.saveGuild(guild);
  }
}
export default new DiscordGuildCreateEvent();
