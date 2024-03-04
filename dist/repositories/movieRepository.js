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
const database_1 = __importDefault(require("../database/database"));
class MovieRepository {
    getMovieById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.default.movie.findUnique({
                where: Object.assign({}, data),
            });
        });
    }
    createMovie(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.movie.create({
                data: Object.assign({}, data),
            });
        });
    }
    getMovieWatched(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.default.movieWatched.findUnique({
                where: {
                    userId_movieId: {
                        userId: data.userId,
                        movieId: data.movieId,
                    },
                },
            });
        });
    }
    addToWatched(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.movieWatched.create({
                data: Object.assign({}, data),
            });
        });
    }
    removeFromWatched(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.movieWatched.delete({
                where: {
                    userId_movieId: {
                        userId: data.userId,
                        movieId: data.movieId,
                    },
                },
            });
        });
    }
    getFavoriteMovie(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.default.favoriteMovie.findUnique({
                where: {
                    userId_movieId: {
                        userId: data.userId,
                        movieId: data.movieId,
                    },
                },
            });
        });
    }
    addToFavorite(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.favoriteMovie.create({
                data: Object.assign({}, data),
            });
        });
    }
    removeFromFavorite(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.favoriteMovie.delete({
                where: {
                    userId_movieId: {
                        userId: data.userId,
                        movieId: data.movieId,
                    },
                },
            });
        });
    }
    getCommentById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.default.movieComment.findUnique({
                where: {
                    userId_movieId: {
                        userId: data.userId,
                        movieId: data.movieId,
                    },
                },
            });
        });
    }
    createComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.movieComment.create({
                data: Object.assign({}, data),
            });
        });
    }
    editComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.movieComment.update({
                where: { userId_movieId: { userId: data.userId, movieId: data.movieId } },
                data: Object.assign({}, data),
            });
        });
    }
    deleteComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.movieComment.delete({
                where: { userId_movieId: Object.assign({}, data) },
            });
        });
    }
}
exports.default = MovieRepository;
