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
const authValidation_1 = require("../validations/authValidation");
const authService_1 = __importDefault(require("../services/authService"));
class AuthController {
    constructor() {
        this.authService = new authService_1.default();
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const validation = authValidation_1.signInSchema.safeParse({
                    email,
                    password,
                });
                if (!validation.success)
                    throw new Error(validation.error.message);
                const signInResponse = yield this.authService.signIn({
                    email,
                    password,
                });
                return res.status(200).send(signInResponse);
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res.status(400).send({ error: 'Erro interno do servidor.' })
                    : res.status(400).send({ error: 'Erro interno do servidor.' });
            }
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            try {
                const validation = authValidation_1.signUpSchema.safeParse({
                    username,
                    email,
                    password,
                });
                if (!validation.success)
                    throw new Error(validation.error.message);
                const signUpResponse = yield this.authService.signUp({
                    username,
                    email,
                    password,
                });
                return res.status(201).send(signUpResponse);
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res.status(400).send({ error: 'Erro interno do servidor.' })
                    : res.status(400).send({ error: 'Erro interno do servidor.' });
            }
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.body;
            try {
                const refreshTokenResponse = yield this.authService.refreshToken({ refreshToken });
                return res.status(200).send(refreshTokenResponse);
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res.status(400).send({ error: 'Erro interno do servidor.' })
                    : res.status(400).send({ error: 'Erro interno do servidor.' });
            }
        });
    }
    signOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.body;
            try {
                yield this.authService.signOut({ refreshToken });
                return res.status(200).send('Usuário deslogado com sucesso.');
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res.status(400).send({ error: 'Erro interno do servidor.' })
                    : res.status(400).send({ error: 'Erro interno do servidor.' });
            }
        });
    }
}
exports.default = AuthController;
