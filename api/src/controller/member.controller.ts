import {
  GuildMember,
} from 'discord.js';
import {
  getRepository,
} from 'typeorm';
import {
  GuildMember as DiscordGuildMember,
} from '../entity/GuildMember';
import logger from '../utils/logger';
import userController from './user.controller';
import {
  DiscordGuild,
} from '../entity/DiscordGuild';

/**
 * Controller for handling user related database functionality.
 */
export class MemberController {
  /**
   * Add or updates a GuildMember in the database.
   * @param {GuildMember} member The member, who should be added or updated in the database.
   * @param {DiscordGuild} guild The guild, in with this member is.
   */
  public async saveMember(member: GuildMember, guild: DiscordGuild)
  :Promise<DiscordGuildMember | null> {
    let user = await userController.getUserById(member.id);
    if (user == null) {
      user = await userController.saveUser(member.user);
    }
    const memberRepo = getRepository(DiscordGuildMember);
    const discordUser = memberRepo.create({
      // TODO actually get the data
      displayName: member.displayName,
      user: user!,
      guild,
    });
    return await memberRepo.save(discordUser);
  }

  /**
   * Remove a member from the database.
   * @param {string} memberId The id of the member, who should be removed.
   */
  public async removeMemberById(memberId: string):Promise<void> {
    // TODO make foreign keys delete themselfes with cascade option in entity settings
    await getRepository(GuildMember).delete({id: memberId});
  }

  /**
   * Return a GuildMember with the given id.
   * @param {string} memberId The user Id / memberId of the member, who should be returned.
   * @return {Promise<DiscordUser | null>} The requested member or null if no member is stored.
   */
  public async getMemberById(memberId: string):Promise<DiscordGuildMember | null> {
    try {
      const member = await getRepository(DiscordGuildMember).findOneOrFail(); // TODO fix
      return member;
    } catch (error) {
      logger.error(error);
    }
    return null;
  }
}

export default new MemberController();
