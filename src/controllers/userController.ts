import { Request, Response } from 'express';

import UserService from '../services/userService';

import { GetUser } from './userController.d';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const userId: number = req.userId;

    try {
      const getUser: GetUser = await this.userService.getUserById({
        id: userId,
      });

      return res.status(200).send(getUser);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }
}
