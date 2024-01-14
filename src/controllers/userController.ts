import { Request, Response } from 'express';

import UserService from '../services/userService';

import { ChangeUsernameBody, GetUser } from './userController.d';

import { changeUsernameSchema } from '../validations/userValidation';

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

  async changeUsername(req: Request, res: Response): Promise<Response> {
    const { newUsername }: ChangeUsernameBody = req.body;
    const userId: number = req.userId;

    try {
      const validation = changeUsernameSchema.safeParse({ newUsername });

      if (!validation.success) throw new Error(validation.error.message);

      await this.userService.changeUsername({
        id: userId,
        username: newUsername,
      });

      return res
        .status(200)
        .send(`Nome de usuário alterado para ${newUsername}.`);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }
}
