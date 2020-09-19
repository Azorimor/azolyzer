import {
  DiscordEvent,
} from './discordevent';
import {
  Channel,
} from 'discord.js';
import logger from '../utils/logger';
import {
  TextChannel as DiscordTextChannel,
} from 'discord.js';

/**
 * Handles discord event 'channelCreate'.
 */
export class DiscordChannelCreateEvent extends DiscordEvent {
  /**
   * Create a new Handler for this Event.
   */
  constructor() {
    super('channelCreate');
    logger.debug('DiscordChannelCreateEvent created');
  }

  /**
   * Called, when the events get triggered.
   * @param {Channel} channel The issued message, which called this event.
   */
  public async execute(channel: Channel):Promise<void> {
    // logger.info('channel created:-------------------'); // FIXME remove
    // console.log(channel);
    // if (channel.type === 'dm') {
    //   // TODO insert dm channel
    // } else if (channel.type === 'text') {
    //   const textRepo = getRepository(TextChannel);
    //   const guildRepo = getRepository(DiscordGuild);
    //   const textChannel = channel as DiscordTextChannel;
    //   const guild = await guildRepo.findOne({id: textChannel.id});
    //   const newChannel = textRepo.create({
    //     id: textChannel.id,
    //     name: textChannel.name,
    //     channelCreatedAt: textChannel.createdAt,
    //     guild: guild,
    //     // FIXME members
    //   });
    //   textRepo.save(newChannel);
    // } else if (channel.type === 'voice') {
    //   // TODO insert voice channel
    // }
  }
}
export default new DiscordChannelCreateEvent();
