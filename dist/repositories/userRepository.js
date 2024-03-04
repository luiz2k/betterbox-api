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
class UserRepository {
    pagination(data) {
        const currentPage = data.currentPage;
        const take = 20;
        const skip = currentPage * take - take;
        const totalPages = Math.ceil(data.totalData / take);
        return { skip, take, currentPage, totalPages };
    }
    getUserDataById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.default.user.findUnique({ where: { id: data.id } });
        });
    }
    getUserDataByEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.default.user.findUnique({ where: { email: data.email } });
        });
    }
    updateUserData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.user.update({ where: { id: data.id }, data: Object.assign({}, data) });
        });
    }
    deleteAccount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.user.delete({ where: { id: data.id, email: data.email } });
        });
    }
    getAllWatchedMovies(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalMoviesWatched = yield database_1.default.movieWatched.count();
            const pagination = this.pagination({
                currentPage: data.page,
                totalData: totalMoviesWatched,
            });
            const movies = yield database_1.default.movieWatched.findMany({
                skip: pagination.skip,
                take: pagination.take,
                where: { userId: data.userId },
                orderBy: { watchedDate: 'desc' },
            });
            return {
                currentPage: pagination.currentPage,
                totalPages: pagination.totalPages,
                data: [...movies],
            };
        });
    }
    getAllFavoriteMovies(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalMoviesWatched = yield database_1.default.favoriteMovie.count();
            const pagination = this.pagination({
                currentPage: data.page,
                totalData: totalMoviesWatched,
            });
            const movies = yield database_1.default.favoriteMovie.findMany({
                where: { userId: data.userId },
                orderBy: { favoriteDate: 'desc' },
            });
            return {
                currentPage: pagination.currentPage,
                totalPages: pagination.totalPages,
                data: [...movies],
            };
        });
    }
}
exports.default = UserRepository;
