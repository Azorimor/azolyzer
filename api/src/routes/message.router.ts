import {
  Router, Request, Response,
} from 'express';
/**
 * All discord message routes are handled here.
 */
class MessageRouter {
  private router: Router = Router();

  /**
   * Create a new message Router with all endpoints configured.
   */
  constructor() {
    this.config();
  }

  /**
   * Configure the express router.
   */
  private config(): void {
    this.router.get('/message', (req: Request, res: Response) => {
      // TODO add stuff (need to create openapi doc first)
    });
  }
}

export default MessageRouter;
