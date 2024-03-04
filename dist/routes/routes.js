"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = __importDefault(require("./authRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const movieRoute_1 = __importDefault(require("./movieRoute"));
const userAuthentication_1 = __importDefault(require("../middlewares/userAuthentication"));
const createMovie_1 = __importDefault(require("../middlewares/createMovie"));
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authRoute = new authRoute_1.default();
        this.userRoute = new userRoute_1.default();
        this.movieRoute = new movieRoute_1.default();
        this.userAuthentication = new userAuthentication_1.default();
        this.createMovie = new createMovie_1.default();
        this.routes();
    }
    routes() {
        this.router.use('/auth', this.authRoute.router);
        this.router.use(this.userAuthentication.verifyAuthentication);
        this.router.use('/user', this.userRoute.router);
        this.router.use(this.createMovie.verifyMovie);
        this.router.use('/movie', this.movieRoute.router);
    }
}
exports.default = Routes;
