import DiscordOAuth2 from 'discord-oauth2';
import config from '../config';
import {
  DiscordUser,
} from '../entity/DiscordUser';
import {
  getRepository,
} from 'typeorm';
import logger from '../logger';
import crypto from 'crypto';
import {
  sign,
} from 'jsonwebtoken';

/**
 * Class for managing authentication to discord oauth2.
 */
class AuthController {
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
  public async discordAccessTokenRequest(code: string):Promise<DiscordUser | undefined> {
    try {
      const access = await this.discordAuth.tokenRequest({
        code,
        scope: 'identify guilds',
        grantType: 'authorization_code',
      });
      return this.userLoginUpdate(access.access_token, access.refresh_token);
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * Request for refresh tokens.
   * @param {string} refreshToken The refresh token, which should be used to
   * refresh the access token.
   */
  public async discordRefreshAccessTokenRequest(refreshToken: string)
  :Promise<DiscordUser | undefined> {
    try {
      const access = await this.discordAuth.tokenRequest({
        refreshToken,
        grantType: 'refresh_token',
        scope: 'identify guilds',
      });
      return this.userLoginUpdate(access.access_token, access.refresh_token);
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * Update the stored user data in the database.
   * @param {string} discordAccessToken The access Token to authenticate to the discord api.
   * @param {string} discordRefreshToken The refresh Token renewing the discord access token.
   */
  private async userLoginUpdate(discordAccessToken:string, discordRefreshToken:string)
  : Promise<DiscordUser | undefined> {
    // FIXME wrong chaining. Causes the user in the login route to be undefinded all time.
    let returnUser : DiscordUser | undefined;
    this.discordAuth.getUser(discordAccessToken).then((webUser) => {
      const userRepo = getRepository(DiscordUser);
      userRepo.findOneOrFail({id: webUser.id}).then((user) => {
        user.discordAccessToken = discordAccessToken;
        user.discordRefreshToken = discordRefreshToken;
        console.log(user);
        userRepo.save(user);
        returnUser = user;
        return returnUser;
      }).catch(async () => {
        const user = userRepo.create({
          id: webUser.id,
          bot: webUser.bot,
          avatar: webUser.avatar,
          discordAccessToken,
          discordRefreshToken,
          username: webUser.username,
          tag: webUser.discriminator,
          locale: webUser.locale,
        });
        console.log(user);
        await userRepo.insert(user);
        returnUser = user;
        return returnUser;
      }).catch((error) => {
        logger.error(error);
        return returnUser;
      });
    }).catch((error) => {
      logger.error(error);
      return returnUser;
    });
    return returnUser;
  }

  /**
   * Generate the OAuth2 Url for this specific configuration.
   * Configuration is provided by enviroment variables.
   * @return {string} The Url as string.
   */
  public generateAuthUrl():string {
    return this.discordAuth.generateAuthUrl({
      scope: 'identify guilds',
      state: crypto.randomBytes(16).toString('hex'),
      responseType: 'code',
    });
  }

  /**
   * Creates an access token, to interact with the api.
   * @param {DiscordUser} user The user, which should be signed.
   * @return {string} The created access token.
   */
  public createAccessToken(user: DiscordUser):string {
    return sign({userId: user.id}, config.apiAccessTokenSecret!, {expiresIn: '20m'});
  }

  /**
   * Creates an refresh token, to generate a new access token.
   * @param {AuthUser} user The user, which should be signed.
   * @return {string} The created access token.
   */
  public createRefreshToken(user: DiscordUser):string {
    return sign({
      userId: user.id,
      tokenVersion: user.refreshTokenVersion,
    }, config.apiRefreshTokenSecret!, {expiresIn: '14d'});
  }
}

export const authClient = new AuthController();
