import type {
  User,
  CreateUser,
  SignIn,
  SignUp,
  GenerateTokensReturn,
  RefreshToken,
  SignOut,
  SignInReturn,
  SignUpReturn,
  RefreshTokenReturn,
  GetRevokedToken,
  GetRefreshToken,
  Decoded,
  AccessAndRefreshToken,
} from './authService.d';

import AuthRepository from '../repositories/authRepository';
import TokenRepository from '../repositories/tokenRepository';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AuthService {
  authRepostitory: AuthRepository;
  tokenRepostitory: TokenRepository;

  constructor() {
    this.authRepostitory = new AuthRepository();
    this.tokenRepostitory = new TokenRepository();
  }

  // Gera os tokens de acesso e refresh, e adiciona o refresh token ao banco de dados.
  private async generateTokens(userId: number): Promise<GenerateTokensReturn> {
    const JWT_SECRET: string = process.env.JWT_SECRET;

    const accessToken: string = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: '1h',
    });
    const refreshToken: string = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: '7d',
    });

    const currentDate: Date = new Date();

    const refreshTokenExpiresAt: Date = new Date(currentDate);
    refreshTokenExpiresAt.setDate(currentDate.getDate() + 7);

    const accessTokenExpiresAt: Date = new Date(currentDate);
    accessTokenExpiresAt.setHours(currentDate.getHours() + 1);

    await this.tokenRepostitory.addRefreshToken({
      token: refreshToken,
      createdAt: currentDate,
      expiresAt: refreshTokenExpiresAt,
      userId,
    });

    return {
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
    };
  }

  public async signIn(data: SignIn): Promise<SignInReturn> {
    const user: User | null = await this.authRepostitory.getUserByEmail({
      email: data.email,
    });

    if (!user) throw new Error('Usuário não encontrado.');

    const comparePasswords: boolean = bcrypt.compareSync(
      data.password,
      user.password,
    );

    if (!comparePasswords) throw new Error('Senha inválida.');

    const tokens = await this.generateTokens(user.id);

    return {
      ...tokens,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  public async signUp(data: SignUp): Promise<SignUpReturn> {
    const user: User | null = await this.authRepostitory.getUserByEmail({
      email: data.email,
    });

    if (user) throw new Error('E-mail já cadastrado.');

    const hashPassword: string = bcrypt.hashSync(data.password, 10);

    const createUser: CreateUser = await this.authRepostitory.createUser({
      username: data.username,
      email: data.email,
      password: hashPassword,
    });

    const tokens: AccessAndRefreshToken = await this.generateTokens(
      createUser.id,
    );

    return {
      ...tokens,
      user: {
        id: createUser.id,
        username: createUser.username,
      },
    };
  }

  public async refreshToken(data: RefreshToken): Promise<RefreshTokenReturn> {
    const getRevokedToken: GetRevokedToken | null =
      await this.tokenRepostitory.getRevokedToken({ token: data.refreshToken });

    if (getRevokedToken) throw new Error('O token informado está revogado.');

    const getRefreshToken: GetRefreshToken | null =
      await this.tokenRepostitory.getRefreshToken({ token: data.refreshToken });

    if (!getRefreshToken)
      throw new Error('Refresh token não encontrado no banco de dados.');

    await this.tokenRepostitory.addRevokedToken({
      ...getRefreshToken,
      revokedAt: new Date(),
    });

    await this.tokenRepostitory.removeRefreshToken({
      id: getRefreshToken.id,
      token: getRefreshToken.token,
    });

    const JWT_SECRET: string = process.env.JWT_SECRET;

    const decoded = jwt.verify(data.refreshToken, JWT_SECRET) as Decoded;

    const tokens = await this.generateTokens(decoded.userId);

    return tokens;
  }

  public async signOut(data: SignOut): Promise<void> {
    const getRevokedToken: GetRevokedToken | null =
      await this.tokenRepostitory.getRevokedToken({ token: data.refreshToken });

    if (getRevokedToken) throw new Error('O token informado está revogado.');

    const getRefreshToken: GetRefreshToken | null =
      await this.tokenRepostitory.getRefreshToken({ token: data.refreshToken });

    if (!getRefreshToken)
      throw new Error('Refresh token não encontrado no banco de dados.');

    await this.tokenRepostitory.addRevokedToken({
      ...getRefreshToken,
      revokedAt: new Date(),
    });

    await this.tokenRepostitory.removeRefreshToken({
      id: getRefreshToken.id,
      token: getRefreshToken.token,
    });
  }
}
