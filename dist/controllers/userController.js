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
const userService_1 = __importDefault(require("../services/userService"));
const userValidation_1 = require("../validations/userValidation");
class UserController {
    constructor() {
        this.userService = new userService_1.default();
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            try {
                const getUser = yield this.userService.getUserById({
                    id: userId,
                });
                return res.status(200).send(getUser);
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res.status(400).send({ error: 'Erro interno do servidor.' })
                    : res.status(400).send({ error: 'Erro interno do servidor.' });
            }
        });
    }
    changeUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUsername } = req.body;
            const userId = req.userId;
            try {
                const validation = userValidation_1.changeUsernameSchema.safeParse({ newUsername });
                if (!validation.success)
                    throw new Error(validation.error.message);
                yield this.userService.changeUsername({
                    id: userId,
                    username: newUsername,
                });
                return res.status(200).send({
                    status: 'success',
                    message: `Nome de usuário alterado para ${newUsername}.`,
                });
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' })
                    : res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' });
            }
        });
    }
    changeEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, newEmail } = req.body;
            const userId = req.userId;
            try {
                const validation = userValidation_1.changeEmailSchema.safeParse({
                    email,
                    password,
                    newEmail,
                });
                if (!validation.success)
                    throw new Error(validation.error.message);
                yield this.userService.changeEmail({
                    id: userId,
                    email,
                    password,
                    newEmail,
                });
                return res
                    .status(200)
                    .send({ status: 'success', message: 'Email alterado com sucesso!' });
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' })
                    : res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' });
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, newPassword } = req.body;
            const userId = req.userId;
            try {
                const validation = userValidation_1.changePasswordSchema.safeParse({
                    email,
                    password,
                    newPassword,
                });
                if (!validation.success)
                    throw new Error(validation.error.message);
                yield this.userService.changePassword({
                    id: userId,
                    email,
                    password,
                    newPassword,
                });
                return res
                    .status(200)
                    .send({ status: 'success', message: 'Senha alterada com sucesso!' });
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' })
                    : res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' });
            }
        });
    }
    getPicture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            try {
                const picture = yield this.userService.getPicture({ id: userId });
                return res.status(200).json({ picture });
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' })
                    : res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' });
            }
        });
    }
    getPictureById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            try {
                const picture = yield this.userService.getPicture({ id: userId });
                return res.status(200).json({ picture });
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' })
                    : res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' });
            }
        });
    }
    changePicture(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const imageData = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer.toString('base64');
            try {
                if (!imageData)
                    throw new Error('Nenhuma imagem foi enviada');
                const picture = yield this.userService.changePicture({
                    userId,
                    imageData: imageData,
                });
                return res.status(200).json({ picture });
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' })
                    : res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' });
            }
        });
    }
    deletePicture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            try {
                yield this.userService.deletePicture({
                    id: userId,
                });
                return res.status(200).send({
                    status: 'success',
                    message: 'Foto de perfil deletada com sucesso!',
                });
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' })
                    : res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' });
            }
        });
    }
    deleteAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const userId = req.userId;
            try {
                yield this.userService.deleteAccount({
                    id: userId,
                    email,
                    password,
                });
                return res
                    .status(200)
                    .send({ status: 'success', message: 'Conta excluída com sucesso!' });
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' })
                    : res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' });
            }
        });
    }
    getAllWatchedMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const page = Number(req.query.page) <= 0 ? 1 : Number(req.query.page) || 1;
            try {
                const moviesWatched = yield this.userService.getAllWatchedMovies({
                    userId,
                    page,
                });
                return res.status(200).send(Object.assign({ status: 'success', message: `Todos os filmes assistidos pelo usuário.` }, moviesWatched));
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' })
                    : res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' });
            }
        });
    }
    getAllFavoriteMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const page = Number(req.query.page) <= 0 ? 1 : Number(req.query.page) || 1;
            try {
                const favoriteMovies = yield this.userService.getAllFavoriteMovies({
                    userId,
                    page,
                });
                return res.status(200).send(Object.assign({ status: 'success', message: `Todos os filmes favoritados pelo usuário.` }, favoriteMovies));
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' })
                    : res
                        .status(400)
                        .send({ status: 'error', message: 'Erro interno do servidor.' });
            }
        });
    }
}
exports.default = UserController;
