"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieController_1 = __importDefault(require("../controllers/movieController"));
class MovieRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.movieController = new movieController_1.default();
        this.routes();
    }
    routes() {
        this.router.post('/addToWatched', this.movieController.addToWatched.bind(this.movieController));
        this.router.post('/removeFromWatched', this.movieController.removeFromWatched.bind(this.movieController));
        this.router.post('/getMovieWatched', this.movieController.getMovieWatched.bind(this.movieController));
        this.router.post('/addToFavorite', this.movieController.addToFavorite.bind(this.movieController));
        this.router.post('/removeFromFavorite', this.movieController.removeFromFavorite.bind(this.movieController));
        this.router.post('/getFavoriteMovie', this.movieController.getFavoriteMovie.bind(this.movieController));
        this.router.post('/createComment', this.movieController.createComment.bind(this.movieController));
        this.router.post('/editComment', this.movieController.editComment.bind(this.movieController));
        this.router.post('/deleteComment', this.movieController.deleteComment.bind(this.movieController));
    }
}
exports.default = MovieRoute;
