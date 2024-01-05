import { Request, Response, NextFunction } from 'express';
import type {
  RefreshToken,
  RevokedToken,
  Decoded,
} from './userAuthentication.d';
import TokenRepository from '../repositories/tokenRepository';
import jwt from 'jsonwebtoken';

export default class UserAuthentication {
  private tokenRepository: TokenRepository;

  constructor() {
    this.tokenRepository = new TokenRepository();
  }

  public verifyAutentication = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const authorization: string | undefined = req.headers.authorization;

      if (!authorization)
        throw new Error('Token de autenticação não fornecido.');

      const authorizationSplit: string[] = authorization.split(' ');

      if (authorizationSplit.length < 2 || authorizationSplit.length > 2)
        throw new Error('Token de autenticação inválido ou mal formado.');

      const [bearer, token]: string[] = authorizationSplit;

      if (bearer !== 'Bearer')
        throw new Error('Bearer não informado ou escrito incorretamente.');

      const refreshToken: RefreshToken | null =
        await this.tokenRepository.getRefreshToken({
          token,
        });

      if (refreshToken) throw new Error('O token informado é um refreshToken.');

      const revokedToken: RevokedToken | null =
        await this.tokenRepository.getRevokedToken({
          token,
        });

      if (revokedToken) throw new Error('O token informado está revogado.');

      const JWT_SECRET: string = process.env.JWT_SECRET;

      const decoded = jwt.verify(token, JWT_SECRET) as Decoded;

      req.userId = decoded.userId;

      next();
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(401).send({ error: 'Erro interno do servidor.' })
        : res.status(401).send({ error: 'Erro interno do servidor.' });
    }
  };
}
