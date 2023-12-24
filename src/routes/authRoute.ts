import { Router } from 'express';

export default class AuthRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {}
}
