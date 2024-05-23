import express, { Application } from 'express';
import dotenv from 'dotenv';
import AppDataSource from './ormconfig';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import ErrorHandler from './middlewares/ErrorHandler';

dotenv.config();

class Server {
  private app: Application;
  private port: number | string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.use('/users', userRoutes);
    this.app.use('/books', bookRoutes);
    this.app.get('/', (req, res) => {
      res.send('Library Management Application API running');
    });
    this.app.use((req, res, next) => ErrorHandler.handleNotFound(req, res, next));
  }

  private initializeErrorHandling(): void {
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => ErrorHandler.handleErrors(err, req, res, next));
  }

  public async start(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log('Data Source has been initialized!');
      this.app.listen(this.port, () => {
        console.log(`Server is running on http://localhost:${this.port}`);
      });
    } catch (error) {
      console.error('Error connecting to the database', error);
      process.exit(1);
    }
  }
}

export default Server;
