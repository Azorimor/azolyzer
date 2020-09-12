import {
  Guild,
} from 'discord.js';
import {
  getRepository,
} from 'typeorm';
import {
  DiscordGuild,
} from '../entity/DiscordGuild';
import logger from '../logger';
import memberController from './member.controller';
import userController from './user.controller';

/**
 * This controller handles guild operations.
 */
export class GuildController {
  /**
   * Add / save / update a new guild with all channels and members to the database.
   * @param {Guild} guild The guild, which should be added to the database.
   */
  public async saveGuild(guild: Guild):Promise<void> {
    // Add or update the guild to the database
    const owner = await userController.saveUser(guild.owner!.user);
    const guildRepo = getRepository(DiscordGuild);
    const newGuild = guildRepo.create({
      id: guild.id,
      deleted: guild.deleted,
      banner: guild.banner,
      description: guild.description,
      joinedAt: guild.joinedAt,
      mfaLevel: guild.mfaLevel,
      name: guild.name,
      owner,
      partnered: guild.partnered,
      verified: guild.verified,
      // TODO preferredLocale
      region: guild.region,
      icon: guild.icon,
      // TODO add other columns
    });
    await guildRepo.save(newGuild);
    // Save the User to the database
    const members = await guild.members.fetch();
    members.each(async (member) => {
      memberController.saveMember(member, newGuild);
      // TODO move all to specific controllers and add channels and messages to the import
    });
  }

  /**
   * Remove / delete a guild from the database. Also removes all messages and channels.
   * @param {string} guildId The id of the guild, which should be deleted.
   */
  public async removeGuild(guildId: string):Promise<void> {
    await getRepository(DiscordGuild).delete({id: guildId});
  }

  /**
   * Returns a saved guild from the database.
   * @param {string} guildId The id of the guild, which should be returned.
   * @return {Promise<DiscordGuild | null>} The guild with the given id or null,
   * if the guild does not exist.
   */
  public async getGuild(guildId: string):Promise<DiscordGuild | null> {
    try {
      const guild = await getRepository(DiscordGuild).findOneOrFail({id: guildId});
      return guild;
    } catch (error) {
      logger.error(error);
    }
    return null;
  }
}

export default new GuildController();
