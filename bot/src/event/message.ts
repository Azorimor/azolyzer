import {
  DiscordEvent,
} from './discordevent';
import logger from '../utils/logger';
import {
  Message,
} from 'discord.js';
import config from '../utils/config';

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
    // TODO log bot messages
    if (message.author.bot) {
      return;
    }
    // const userRepo = getRepository(DiscordUser);
    // const messageRepo = getRepository(DiscordMessage);
    // const channelRepo = getRepository(TextChannel);
    // This message is a command
    if (message.content.startsWith(config.prefix)) {
      logger.info(`Command issued: ${message.content}`);
    } else {
      // let user = await userRepo.findOne({id: message.author.id});
      // if (typeof user === 'undefined') {
      //   const author = new DiscordUser();
      //   author.id = message.author.id;
      //   // FIXME If Server message (new User) id is wrong and causes problems
      //   let avatarURL = message.author.avatarURL();
      //   if (avatarURL === null) {
      //     avatarURL = message.author.defaultAvatarURL;
      //   }
      //   author.avatarURL = avatarURL; // FIXME get the url
      //   author.accountCreatedAt = message.author.createdAt;
      //   author.locale = message.author.locale;
      //   author.username = message.author.username;
      //   author.tag = message.author.tag;
      //   userRepo.save(author);
      //   user = author;
      // }
      // let channel = await channelRepo.findOne({id: message.channel.id});
      // if (typeof channel === 'undefined') {
      //   const textChannel = new TextChannel();
      //   textChannel.id = message.channel.id;
      //   channelRepo.save(textChannel);
      //   channel = textChannel;
      // }
      // const msg = new DiscordMessage();
      // msg.id = message.id;
      // msg.author = user;
      // msg.channel = channel;
      // msg.messageCreatedAt = message.createdAt;
      // messageRepo.save(msg);
    }
  }
}
export default new DiscordMessageEvent();
