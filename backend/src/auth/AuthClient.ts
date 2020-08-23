import DiscordOAuth2 from 'discord-oauth2';
import config from '../config';
import {
  DiscordUser,
} from '../entity/DiscordUser';
import {
  getRepository,
} from 'typeorm';
import {
  Session,
} from '../entity/Session';
import logger from '../logger';
import crypto from 'crypto';
/**
 * Class for managing authentication to discord oauth2.
 */
class AuthClient {
  public discordAuth: DiscordOAuth2 = new DiscordOAuth2({
    clientId: config.client_id,
    clientSecret: config.client_secret,
    redirectUri: config.redirect_uri,
  });

  /**
   * Create an AuthClient
   */
  constructor() {
    logger.info(`OAuth2 URL: ${this.generateAuthUrl()}`);
  }

  /**
   * Get a initial Access token for a user.
   * @param {string} code The Code for the exchange for the access token.
   */
  public async accessTokenRequest(code: string) {
    try {
      const access = await this.discordAuth.tokenRequest({
        code,
        scope: 'identify email guilds',
        grantType: 'authorization_code',
      });
      console.log(access);
      this.updateUserSessionData(access.access_token, access.refresh_token);
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  }

  /**
   * Request for refresh tokens.
   * @param {string} refreshToken The refresh token, which should be used to
   * refresh the access token.
   */
  public async refreshAccessTokenRequest(refreshToken: string) {
    try {
      const access = await this.discordAuth.tokenRequest({
        refreshToken,
        grantType: 'refresh_token',
        scope: 'identify email guilds',
      });
      this.updateUserSessionData(access.access_token, access.refresh_token);
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * Generate the OAuth2 Url for this specific configuration.
   * Configuration is provided by enviroment variables.
   * @return {string} The Url as string.
   */
  public generateAuthUrl():string {
    return this.discordAuth.generateAuthUrl({
      scope: 'identify email guilds',
      state: crypto.randomBytes(16).toString('hex'),
      responseType: 'code',
    });
  }

  /**
   * Update Database information for the user with this given access token.
   * @param {string} accessToken The access token for the user to update.
   * @param {string} refreshToken The refresh token for the user.
   */
  private async updateUserSessionData(accessToken:string, refreshToken:string)
  :Promise<string> { // FIX temporarly using strings should return user.
    // TODO rewrite this method nearly completly (only for testing/debugging other stuff)
    const user = await this.discordAuth.getUser(accessToken);
    const userRepository = getRepository(DiscordUser);
    const sessionRepository = getRepository(Session);
    // Create the objects for insertion
    const discordUser = new DiscordUser();
    discordUser.username = user.username;
    const userLocale = user.locale!;
    if (userLocale !== 'undefinded') {
      discordUser.locale = userLocale;
    }
    discordUser.id = user.id;
    discordUser.avatarURL = 'TODO';
    discordUser.tag = user.discriminator;
    discordUser.email = user.email!;
    await userRepository.save(discordUser);
    const finalUser = await userRepository.findOne(user.id);
    // Insert or Update the Session information
    const userSession = new Session();
    userSession.accessToken = accessToken;
    userSession.refreshToken = refreshToken;
    userSession.user = user;
    sessionRepository.save(userSession);
    return user.id;
  }
}

export const authClient = new AuthClient();
