"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const userAuthentication_1 = __importDefault(require("../middlewares/userAuthentication"));
class AuthRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authController = new authController_1.default();
        this.userAuthentication = new userAuthentication_1.default();
        this.routes();
    }
    routes() {
        this.router.post('/signin', this.authController.signIn.bind(this.authController));
        this.router.post('/signup', this.authController.signUp.bind(this.authController));
        this.router.post('/refreshToken', this.authController.refreshToken.bind(this.authController));
        this.router.use(this.userAuthentication.verifyAuthentication);
        this.router.post('/signout', this.authController.signOut.bind(this.authController));
    }
}
exports.default = AuthRoute;
