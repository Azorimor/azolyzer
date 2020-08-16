import {
  DiscordEvent,
} from './discordevent';
import logger from '../logger';
import {
  Message,
} from 'discord.js';
import config from '../config';
import {
  getRepository, Repository,
} from 'typeorm';
import {
  DiscordMessage,
} from '../entity/DiscordMessage';
import {
  DiscordUser,
} from '../entity/DiscordUser';

/**
 * This Event is called, if a user writes a message. Discord: message
 */
export class DiscordMessageEvent extends DiscordEvent {
  // private messageRepo: Repository<DiscordMessage>;
  // private userRepo: Repository<DiscordUser>;
  /**
   * Create a new DiscordMessageEvent handler. It is called on the 'message' event.
   */
  constructor() {
    super('message');
    // this.messageRepo = getRepository(DiscordMessage);
    // this.userRepo = getRepository(DiscordUser);
    logger.info('DiscordMessageEvent created');
  }

  /**
   * Called, when the events get triggered.
   * @param {Message} message The issued message, which called this event.
   */
  public async execute(message: Message):Promise<void> {
    logger.info(`Message event called successfully - ${message}`);
    const userRepo = getRepository(DiscordUser);
    const messageRepo = getRepository(DiscordMessage);
    // This message is a command
    if (message.content.startsWith(config.prefix)) {
      logger.info(`Command issued: ${message.content}`);
    } else {
      let user = await userRepo.findOne({id: message.author.id});
      if (typeof user === 'undefined') {
        const author = new DiscordUser();
        author.id = message.author.id;
        author.avatarURL = 'URL'; // FIXME get the url
        author.createdAt = message.author.createdAt;
        author.locale = message.author.locale;
        author.username = message.author.username;
        author.tag = message.author.tag;
        userRepo.save(author);
        user = author;
      }
      const msg = new DiscordMessage();
      msg.id = message.id;
      msg.author = user;
      msg.channel = message.channel.id;
      msg.guild = 'TODO';
      msg.member = 'TODO';
      messageRepo.save(msg);
    }
  }
}
export default new DiscordMessageEvent();
