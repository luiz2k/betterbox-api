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
const tokenRepository_1 = __importDefault(require("../repositories/tokenRepository"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserAuthentication {
    constructor() {
        this.verifyAuthentication = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authorization = req.headers.authorization;
                if (!authorization)
                    throw new Error('Token de autenticação não fornecido.');
                const authorizationSplit = authorization.split(' ');
                if (authorizationSplit.length < 2 || authorizationSplit.length > 2)
                    throw new Error('Token de autenticação inválido ou mal formado.');
                const [bearer, token] = authorizationSplit;
                if (bearer !== 'Bearer')
                    throw new Error('Bearer não informado ou escrito incorretamente.');
                const refreshToken = yield this.tokenRepository.getRefreshToken({
                    token,
                });
                if (refreshToken)
                    throw new Error('O token informado é um refreshToken.');
                const revokedToken = yield this.tokenRepository.getRevokedToken({
                    token,
                });
                if (revokedToken)
                    throw new Error('O token informado está revogado.');
                const JWT_SECRET = process.env.JWT_SECRET;
                const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
                const userData = yield this.userRepository.getUserDataById({
                    id: decoded.userId,
                });
                if (!userData)
                    throw new Error('Usuário não encontrado.');
                req.userId = decoded.userId;
                next();
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res.status(401).send({ error: 'Erro interno do servidor.' })
                    : res.status(401).send({ error: 'Erro interno do servidor.' });
            }
        });
        this.tokenRepository = new tokenRepository_1.default();
        this.userRepository = new userRepository_1.default();
    }
}
exports.default = UserAuthentication;
