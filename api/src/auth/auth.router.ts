import {
  Router, Request, Response,
} from 'express';
import {
  authClient,
} from './auth.controller';
import {
  verify,
} from 'jsonwebtoken';
import config from '../config';
import logger from '../logger';
import {
  DiscordUser,
} from '../entity/DiscordUser';
import {
  getRepository,
} from 'typeorm';

/**
 * Class for handling the routes for the authentication.
 */
class AuthRouter {
  private router: Router = Router();

  /**
   * Create the routes and configure the router.
   */
  constructor() {
    this.config();
  }
  /**
   * Configure the router.
   */
  private config(): void {
    this.router.get('/login', (req: Request, res: Response) => {
      // Get discord oauth2 login information
      const code = req.query.code!.toString();
      authClient.discordAccessTokenRequest(code).then((user) => {
        console.log(user);
        if (typeof user === 'undefined') {
          return res.send({status: 'error'});
        }
        res.cookie('refresh', authClient.createRefreshToken(user!), {
          httpOnly: true,
          path: '/refresh_token',
        });
        res.send({accessToken: authClient.createAccessToken(user!)});
        res.redirect('http://localhost:4200');
      });
    });
    this.router.post('/refresh_token', (req: Request, res: Response) => {
      const token = req.cookies.refresh;
      if (!token) {
        return res.send({ok: false, accessToken: ''});
      }
      let payload: any = null;
      try {
        payload = verify(token, config.apiRefreshTokenSecret!);
      } catch (error) {
        logger.error(error);
        return res.send({ok: false, accessToken: ''});
      }
      getRepository(DiscordUser).findOneOrFail({id: payload.userId}).then((user) => {
        if (payload.tokenVersion !== user.refreshTokenVersion) {
          return res.send({ok: false, accessToken: ''});
        }
        return res.send({
          ok: true,
          accessToken: authClient.createAccessToken(user),
        });
      });
    });
    this.router.get('/login/callback', (req: Request, res: Response) => {
      const code = req.query.code!.toString();
      const user = authClient.discordAccessTokenRequest(code);
      res.redirect('https://localhost:4200'); // TODO debugging only
    });
    this.router.get('/revoke_refresh_token', (req: Request, res: Response) => {
      // TODO revoke token by incrementing the stored tokenversion by 1
    });
    this.router.post('/logout', (req: Request, res: Response) => {
      // Logout using discord oauth2
      res.send('logout works');
    });
  }

  /**
   * Get the wrapped express router.
   * @return {Router} the wrapped express router.
   */
  public getRouter(): Router {
    return this.router;
  }
}
export const authRouter = new AuthRouter();
