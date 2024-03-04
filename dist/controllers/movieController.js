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
const movieService_1 = __importDefault(require("../services/movieService"));
const movieValidation_1 = require("../validations/movieValidation");
class MovieController {
    constructor() {
        this.movieService = new movieService_1.default();
    }
    addToWatched(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const movie = req.movie;
            try {
                yield this.movieService.addToWatched(Object.assign(Object.assign({}, movie), { userId }));
                return res.status(200).send({
                    status: 'success',
                    message: `O filme ${movie.name} foi adicionado aos assistidos.`,
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
    removeFromWatched(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const movie = req.movie;
            try {
                yield this.movieService.removeFromWatched(Object.assign(Object.assign({}, movie), { userId }));
                return res.status(200).send({
                    status: 'success',
                    message: `O filme ${movie.name} foi removido de assistidos.`,
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
    getMovieWatched(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const movie = req.movie;
            try {
                const movieWatched = yield this.movieService.getMovieWatched(Object.assign(Object.assign({}, movie), { userId }));
                return res.status(200).send({
                    status: 'success',
                    message: `O filme ${movie.name} está na lista de assistidos.`,
                    data: Object.assign({}, movieWatched),
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
    addToFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const movie = req.movie;
            try {
                yield this.movieService.addToFavorite(Object.assign(Object.assign({}, movie), { userId }));
                return res.status(200).send({
                    status: 'success',
                    message: `O filme ${movie.name} foi adicionado aos favoritos.`,
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
    removeFromFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const movie = req.movie;
            try {
                yield this.movieService.removeFromFavorite(Object.assign(Object.assign({}, movie), { userId }));
                return res.status(200).send({
                    status: 'success',
                    message: `O filme ${movie.name} foi removido dos favoritos.`,
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
    getFavoriteMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const movie = req.movie;
            try {
                yield this.movieService.getFavoriteMovie(Object.assign(Object.assign({}, movie), { userId }));
                return res.status(200).send({
                    status: 'success',
                    message: `O filme ${movie.name} está na lista de favoritos.`,
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
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { comment } = req.body;
            const userId = req.userId;
            const movie = req.movie;
            try {
                const validation = movieValidation_1.createCommentSchema.safeParse({ comment });
                if (!validation.success)
                    throw new Error(validation.error.message);
                yield this.movieService.createComment({
                    userId,
                    movieId: movie.id,
                    comment,
                    commentedAt: new Date(),
                });
                return res.status(201).send({
                    status: 'success',
                    message: `Comentário adicionado ao filme ${movie.name}.`,
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
    editComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newComment } = req.body;
            const userId = req.userId;
            const movie = req.movie;
            try {
                const validation = movieValidation_1.editCommentSchema.safeParse({ newComment });
                if (!validation.success)
                    throw new Error(validation.error.message);
                yield this.movieService.editComment({
                    userId,
                    movieId: movie.id,
                    comment: newComment,
                    editedAt: new Date(),
                });
                return res.status(200).send({
                    status: 'success',
                    message: `Comentário editado no filme ${movie.name}.`,
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
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const movie = req.movie;
            try {
                yield this.movieService.deleteComment({
                    userId,
                    movieId: movie.id,
                });
                return res.status(200).send({
                    status: 'success',
                    message: `Comentário removido do filme ${movie.name}.`,
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
}
exports.default = MovieController;
