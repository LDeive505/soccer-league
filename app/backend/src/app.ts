import * as express from 'express';
import errorHandler from './middlewares/errorHandler';
import 'express-async-errors';
import loginRoutes from './routes/loginRoutes';
import teamRoutes from './routes/teamRoutes';
import matchRoutes from './routes/matchRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use('/login', loginRoutes);
    this.app.use('/teams', teamRoutes);
    this.app.use('/matches', matchRoutes);
    this.app.get('/', (_req, res) => res.json({ ok: true }));
    this.app.use(errorHandler);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
