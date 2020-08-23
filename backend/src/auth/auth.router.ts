import {
  Router, Request, Response,
} from 'express';
import {
  authClient,
} from './AuthClient';

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
      // Login using discord oauth2
    });
    this.router.get('/login/callback', (req: Request, res: Response) => {
      const code = req.query.code!.toString();
      authClient.accessTokenRequest(code);
      res.redirect('https://google.de'); // TODO debugging
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
