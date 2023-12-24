import express, { Application } from 'express';

export default class App {
  private app: Application;

  constructor() {
    this.app = express();

    this.config();

    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
  }

  private routes(): void {}

  public listen(port: number): void {
    this.app.listen(port, () =>
      console.log(`Servidor iniciado na porta ${port}.`),
    );
  }
}
