"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const userAuthentication_1 = __importDefault(require("../middlewares/userAuthentication"));
class UserRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.UserController = new userController_1.default();
        this.userAuthentication = new userAuthentication_1.default();
        this.routes();
    }
    routes() {
        this.router.use(this.userAuthentication.verifyAuthentication);
        this.router.get('/getUserById', this.UserController.getUserById.bind(this.UserController));
        this.router.patch('/changeUsername', this.UserController.changeUsername.bind(this.UserController));
        this.router.patch('/changeEmail', this.UserController.changeEmail.bind(this.UserController));
        this.router.patch('/changePassword', this.UserController.changePassword.bind(this.UserController));
        this.router.delete('/deleteAccount', this.UserController.deleteAccount.bind(this.UserController));
        this.router.post('/getAllWatchedMovies', this.UserController.getAllWatchedMovies.bind(this.UserController));
        this.router.post('/getAllFavoriteMovies', this.UserController.getAllFavoriteMovies.bind(this.UserController));
    }
}
exports.default = UserRoute;
