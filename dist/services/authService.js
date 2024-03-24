"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRepository_1 = __importDefault(require("../repositories/authRepository"));
const tokenRepository_1 = __importDefault(require("../repositories/tokenRepository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor() {
        this.authRepostitory = new authRepository_1.default();
        this.tokenRepostitory = new tokenRepository_1.default();
    }
    // Gera os tokens de acesso e refresh, e adiciona o refresh token ao banco de dados.
    generateTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const JWT_SECRET = process.env.JWT_SECRET;
            const accessToken = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, {
                expiresIn: '1h',
            });
            const refreshToken = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, {
                expiresIn: '7d',
            });
            const currentDate = new Date();
            const refreshTokenExpiresAt = new Date(currentDate);
            refreshTokenExpiresAt.setDate(currentDate.getDate() + 7);
            const accessTokenExpiresAt = new Date(currentDate);
            accessTokenExpiresAt.setHours(currentDate.getHours() + 1);
            yield this.tokenRepostitory.addRefreshToken({
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
        });
    }
    signIn(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authRepostitory.getUserByEmail({
                email: data.email,
            });
            if (!user)
                throw new Error('Usuário não encontrado.');
            const comparePasswords = bcryptjs_1.default.compareSync(data.password, user.password);
            if (!comparePasswords)
                throw new Error('Senha inválida.');
            const tokens = yield this.generateTokens(user.id);
            return Object.assign(Object.assign({}, tokens), { user: {
                    id: user.id,
                    username: user.username,
                } });
        });
    }
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authRepostitory.getUserByEmail({
                email: data.email,
            });
            if (user)
                throw new Error('E-mail já cadastrado.');
            const hashPassword = bcryptjs_1.default.hashSync(data.password, 10);
            const createUser = yield this.authRepostitory.createUser({
                username: data.username,
                email: data.email,
                password: hashPassword,
            });
            const tokens = yield this.generateTokens(createUser.id);
            return Object.assign(Object.assign({}, tokens), { user: {
                    id: createUser.id,
                    username: createUser.username,
                } });
        });
    }
    refreshToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRevokedToken = yield this.tokenRepostitory.getRevokedToken({ token: data.refreshToken });
            if (getRevokedToken)
                throw new Error('O token informado está revogado.');
            const getRefreshToken = yield this.tokenRepostitory.getRefreshToken({ token: data.refreshToken });
            if (!getRefreshToken)
                throw new Error('Refresh token não encontrado no banco de dados.');
            yield this.tokenRepostitory.addRevokedToken(Object.assign(Object.assign({}, getRefreshToken), { revokedAt: new Date() }));
            yield this.tokenRepostitory.removeRefreshToken({
                id: getRefreshToken.id,
                token: getRefreshToken.token,
            });
            const JWT_SECRET = process.env.JWT_SECRET;
            const decoded = jsonwebtoken_1.default.verify(data.refreshToken, JWT_SECRET);
            const tokens = yield this.generateTokens(decoded.userId);
            return tokens;
        });
    }
    signOut(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRevokedToken = yield this.tokenRepostitory.getRevokedToken({ token: data.refreshToken });
            if (getRevokedToken)
                throw new Error('O token informado está revogado.');
            const getRefreshToken = yield this.tokenRepostitory.getRefreshToken({ token: data.refreshToken });
            if (!getRefreshToken)
                throw new Error('Refresh token não encontrado no banco de dados.');
            yield this.tokenRepostitory.addRevokedToken(Object.assign(Object.assign({}, getRefreshToken), { revokedAt: new Date() }));
            yield this.tokenRepostitory.removeRefreshToken({
                id: getRefreshToken.id,
                token: getRefreshToken.token,
            });
        });
    }
}
exports.default = AuthService;
