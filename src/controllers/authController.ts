import { Request, Response } from 'express';

import type {
  SignIn,
  SignUp,
  SignInSafeParse,
  SignUpSafeParse,
  SignInResponse,
  SignUpResponse,
} from './authController.d';

import { signInSchema, signUpSchema } from '../validations/authValidation';

import AuthService from '../services/authService';

export default class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async signIn(req: Request, res: Response) {
    const { email, password }: SignIn = req.body;

    try {
      const validation: SignInSafeParse = signInSchema.safeParse({
        email,
        password,
      });

      if (!validation.success) throw new Error(validation.error.message);

      const signInResponse: SignInResponse = await this.authService.signIn({
        email,
        password,
      });

      return res.status(200).send(signInResponse);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }

  public async signUp(req: Request, res: Response) {
    const { username, email, password }: SignUp = req.body;

    try {
      const validation: SignUpSafeParse = signUpSchema.safeParse({
        username,
        email,
        password,
      });

      if (!validation.success) throw new Error(validation.error.message);

      const signUpResponse: SignUpResponse = await this.authService.signUp({
        username,
        email,
        password,
      });

      return res.status(201).send(signUpResponse);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }
}
