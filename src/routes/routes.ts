import { Router } from 'express';

export default class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {}
}
