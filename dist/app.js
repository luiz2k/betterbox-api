"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routeController = new routes_1.default();
        this.routes();
    }
    config() {
        this.app.use((0, cors_1.default)({ origin: process.env.CORS_ACCESS }));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.routeController.router);
    }
    listen(port) {
        this.app.listen(port, () => console.log(`Servidor iniciado na porta ${port}.`));
    }
}
exports.default = App;
