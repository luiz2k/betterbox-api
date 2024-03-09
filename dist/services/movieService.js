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
const movieRepository_1 = __importDefault(require("../repositories/movieRepository"));
class MovieService {
    constructor() {
        this.movieRepository = new movieRepository_1.default();
    }
    addToWatched(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.movieRepository.addToWatched({
                userId: data.userId,
                movieId: data.id,
                watchedDate: new Date(),
            });
        });
    }
    removeFromWatched(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieWatched = yield this.movieRepository.getMovieWatched({
                userId: data.userId,
                movieId: data.id,
            });
            if (!movieWatched)
                throw new Error('Impossível remover um filme que nunca foi assistido.');
            yield this.movieRepository.removeFromWatched({
                userId: data.userId,
                movieId: data.id,
            });
        });
    }
    getMovieWatched(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieWatched = yield this.movieRepository.getMovieWatched({
                userId: data.userId,
                movieId: data.id,
            });
            if (!movieWatched)
                throw new Error('O filme informado não está na lista de assistidos.');
            return { watchedDate: movieWatched.watchedDate };
        });
    }
    addToFavorite(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const favoriteMovie = yield this.movieRepository.getFavoriteMovie({
                userId: data.userId,
                movieId: data.id,
            });
            if (favoriteMovie)
                throw new Error('Esse filme já está nos favoritos.');
            yield this.movieRepository.addToFavorite({
                userId: data.userId,
                movieId: data.id,
                favoriteDate: new Date(),
            });
        });
    }
    removeFromFavorite(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const favoriteMovie = yield this.movieRepository.getFavoriteMovie({
                userId: data.userId,
                movieId: data.id,
            });
            if (!favoriteMovie)
                throw new Error('Impossível remover um filme que nunca foi favoritado.');
            yield this.movieRepository.removeFromFavorite({
                userId: data.userId,
                movieId: data.id,
            });
        });
    }
    getFavoriteMovie(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieFavorite = yield this.movieRepository.getFavoriteMovie({
                userId: data.userId,
                movieId: data.id,
            });
            if (!movieFavorite)
                throw new Error('O filme informado não está na lista de favoritos.');
        });
    }
    getAllComments(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield this.movieRepository.getAllComments({
                movieId: data.movieId,
            });
            return comments;
        });
    }
    createComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.movieRepository.getCommentById({
                userId: data.userId,
                movieId: data.movieId,
            });
            if (comment)
                throw new Error('Só é possível fazer um comentário por filme.');
            yield this.movieRepository.createComment(Object.assign({}, data));
        });
    }
    editComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.movieRepository.getCommentById({
                userId: data.userId,
                movieId: data.movieId,
            });
            if (!comment)
                throw new Error('Impossível editar um comentário que não existe.');
            yield this.movieRepository.editComment(Object.assign(Object.assign({}, data), { editedAt: comment.commentedAt }));
        });
    }
    deleteComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.movieRepository.getCommentById({
                userId: data.userId,
                movieId: data.movieId,
            });
            if (!comment)
                throw new Error('Impossível deletar um comentário que não existe.');
            yield this.movieRepository.deleteComment(Object.assign({}, data));
        });
    }
}
exports.default = MovieService;
