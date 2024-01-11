import type {
  User,
  CreateUser,
  SignIn,
  SignUp,
  RefreshToken,
  SignOut,
  SignInReturn,
  SignUpReturn,
  RefreshTokenReturn,
  GetRevokedToken,
  GetRefreshToken,
  Decoded,
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

    const JWT_SECRET: string = process.env.JWT_SECRET;

    const accessToken: string = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1h',
    });
    const refreshToken: string = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    const createdAt: Date = new Date();
    const expiresAt: Date = new Date(createdAt);
    expiresAt.setDate(createdAt.getDate() + 7);

    await this.tokenRepostitory.addRefreshToken({
      token: refreshToken,
      createdAt: createdAt,
      expiresAt: expiresAt,
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
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
      profile: { create: {} },
    });

    const JWT_SECRET: string = process.env.JWT_SECRET;

    const accessToken: string = jwt.sign(
      { userId: createUser.id },
      JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );
    const refreshToken: string = jwt.sign(
      { userId: createUser.id },
      JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );

    const createdAt: Date = new Date();
    const expiresAt: Date = new Date(createdAt);
    expiresAt.setDate(createdAt.getDate() + 7);

    await this.tokenRepostitory.addRefreshToken({
      token: refreshToken,
      createdAt: createdAt,
      expiresAt: expiresAt,
      userId: createUser.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async refreshToken(data: RefreshToken): Promise<RefreshTokenReturn> {
    const getRevokedToken: GetRevokedToken | null =
      await this.tokenRepostitory.getRevokedToken({ token: data.refreshToken });

    if (getRevokedToken) throw new Error('O token informado está revogado.');

    const getRefreshToken: GetRefreshToken | null =
      await this.tokenRepostitory.getRefreshToken({ token: data.refreshToken });

    if (!getRefreshToken) throw new Error('Refresh token não encontrado.');

    await this.tokenRepostitory.addRevokedToken({
      token: getRefreshToken.token,
      revokedAt: new Date(),
      expiresAt: getRefreshToken.expiresAt,
      userId: getRefreshToken.userId,
    });

    await this.tokenRepostitory.removeRefreshToken({
      id: getRefreshToken.id,
      token: getRefreshToken.token,
    });

    const JWT_SECRET: string = process.env.JWT_SECRET;

    const decoded = jwt.verify(data.refreshToken, JWT_SECRET) as Decoded;

    const accessToken: string = jwt.sign(
      { userId: decoded.userId },
      JWT_SECRET,
      { expiresIn: '1h' },
    );
    const refreshToken: string = jwt.sign(
      { userId: decoded.userId },
      JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );

    const createdAt: Date = new Date();
    const expiresAt: Date = new Date(createdAt);
    expiresAt.setDate(createdAt.getDate() + 7);

    await this.tokenRepostitory.addRefreshToken({
      token: refreshToken,
      createdAt: createdAt,
      expiresAt: expiresAt,
      userId: decoded.userId,
    });

    return { accessToken, refreshToken };
  }

  public async signOut(data: SignOut): Promise<void> {
    const getRevokedToken: GetRevokedToken | null =
      await this.tokenRepostitory.getRevokedToken({
        token: data.refreshToken,
      });

    if (getRevokedToken) throw new Error('O token informado está revogado.');

    const getRefreshToken: GetRefreshToken | null =
      await this.tokenRepostitory.getRefreshToken({ token: data.refreshToken });

    if (!getRefreshToken) throw new Error('Refresh token inválido.');

    await this.tokenRepostitory.removeRefreshToken({
      id: getRefreshToken.id,
      token: getRefreshToken.token,
    });

    await this.tokenRepostitory.addRevokedToken({
      ...getRefreshToken,
      revokedAt: new Date(),
    });
  }
}
