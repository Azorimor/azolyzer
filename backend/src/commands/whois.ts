import {
  Command, CommandoClient, CommandoMessage,
} from 'discord.js-commando';
import {
  Message,
} from 'discord.js';

/**
 * The command for getting user information.
 */
export class WhoIsCommand extends Command {
  /**
   * Create this Command.
   * @param {CommandoClient} client The client, who should react to the command.
   */
  constructor(client : CommandoClient) {
    super(client, {
      name: 'whois',
      group: 'moderation',
      memberName: 'whois',
      description: 'Return user information about a mentioned user.',
      aliases: ['userinfo'],
    });
  }
  /**
   * This code gets executed, if the command is triggered.
   * @param {CommandoMessage} message
   * Actual message of the issuer of the command
   * @return {Promise} Promise for the return.
   */
  run(message: CommandoMessage):Promise<(Message|Message[])> {
    return message.say('Testing');
  }
}
