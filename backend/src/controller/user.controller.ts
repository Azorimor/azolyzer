import {
  User,
} from 'discord.js';
import {
  getRepository,
} from 'typeorm';
import {
  DiscordUser,
} from '../entity/DiscordUser';
import logger from '../logger';

/**
 * Controller for handling user related database functionality.
 */
export class UserController {
  /**
   * Add or updates a DiscordUser in the database.
   * @param {User} user The user, who should be added or updated in the database.
   */
  public async saveUser(user: User):Promise<DiscordUser> {
    const userRepo = getRepository(DiscordUser);
    const discordUser = userRepo.create({
      id: user.id,
      avatar: user.avatar,
      accountCreatedAt: user.createdAt,
      locale: user.locale,
      username: user.username,
      tag: user.tag,
      bot: user.bot,
    });
    return await userRepo.save(discordUser);
  }

  /**
   * Remove a user from the database.
   * @param {string} userId The userId of the user, who should be removed.
   */
  public async removeUserbyId(userId: string):Promise<void> {
    // TODO make foreign keys delete themselfes with cascade option in entity settings
    await getRepository(DiscordUser).delete({id: userId});
  }

  /**
   * Return a DiscordUser with the given id.
   * @param {string} userId The user Id of the user, who should be returned.
   * @return {Promise<DiscordUser | null>} The requested user or null if no user is stored.
   */
  public async getUserById(userId: string):Promise<DiscordUser | null> {
    try {
      const user = await getRepository(DiscordUser).findOneOrFail({id: userId});
      return user;
    } catch (error) {
      logger.error(error);
    }
    return null;
  }
}

export default new UserController();
