import express, {Application} from 'express';
import cors from "cors";
import 'reflect-metadata';
import {createConnection} from 'typeorm';

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
      this.app.use(express.json());
      this.app.use(express.urlencoded({extended: false}));
      this.app.use(cors());

      // Routing
    }
}

export default new App().app;