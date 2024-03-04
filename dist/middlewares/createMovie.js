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
const axios_1 = __importDefault(require("axios"));
const createMovieValidation_1 = require("../validations/createMovieValidation");
class CreateMovie {
    constructor() {
        this.verifyMovie = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { movieId } = req.body;
            try {
                const validation = createMovieValidation_1.createMovieSchema.safeParse({ movieId });
                if (!validation.success)
                    throw new Error(validation.error.message);
                const MovieData = yield (0, axios_1.default)({
                    method: 'get',
                    url: `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
                    headers: { Authorization: `Bearer ${process.env.TMDB_AUTHORIZATION}` },
                });
                req.movie = { id: MovieData.data.id, name: MovieData.data.title };
                const existingFilm = yield this.movieRepository.getMovieById({ id: MovieData.data.id });
                if (existingFilm)
                    return next();
                yield this.movieRepository.createMovie({
                    id: MovieData.data.id,
                    name: MovieData.data.title,
                });
                next();
            }
            catch (error) {
                console.error(error);
                return error instanceof Error
                    ? res.status(401).send({ error: 'Erro interno do servidor.' })
                    : res.status(401).send({ error: 'Erro interno do servidor.' });
            }
        });
        this.movieRepository = new movieRepository_1.default();
    }
}
exports.default = CreateMovie;
