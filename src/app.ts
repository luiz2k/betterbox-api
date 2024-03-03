import express, { Application } from 'express';
import Routes from './routes/routes';
import cors from 'cors';

export default class App {
  private app: Application;
  private routeController: Routes;

  constructor() {
    this.app = express();

    this.config();

    this.routeController = new Routes();
    this.routes();
  }

  private config(): void {
    this.app.use(cors({ origin: process.env.CORS_ACCESS }));
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(this.routeController.router);
  }

  public listen(port: number): void {
    this.app.listen(port, () =>
      console.log(`Servidor iniciado na porta ${port}.`),
    );
  }
}
