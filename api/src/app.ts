import express, {
  Application,
} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import 'reflect-metadata';
import {
  authRouter,
} from './auth/auth.router';

/**
 * The main App file.
 */
class App {
    public app: Application;
    /**
     * Create a new App with the default configured express settings.
     */
    constructor() {
      this.app = express();
      this.config();
    }

    /**
     * Configure the app field.
     */
    private config(): void {
      // Middlewares
      this.app.use(cors());
      this.app.use(helmet());
      this.app.use(bodyParser.json());
      this.app.use(morgan('combined'));
      this.app.use(express.urlencoded({extended: false}));

      // Routing
      this.app.use('/auth', authRouter.getRouter());
    }
}

export default new App().app;
