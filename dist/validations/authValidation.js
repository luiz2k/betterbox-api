"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpSchema = zod_1.default.object({
    username: zod_1.default
        .string()
        .min(2, 'O usuário deve ter no minímo 2 caracteres.')
        .max(15, 'O usuário deve ter no maximo 15 caracteres.'),
    email: zod_1.default
        .string()
        .email('Informe um e-mail válido.')
        .min(5, 'O e-mail deve ter no mínimo 5 caracteres.')
        .max(254, 'O e-mail deve ter no máximo 254 caracteres.'),
    password: zod_1.default
        .string()
        .min(8, 'A senha deve ter no minímo 8 caracteres.')
        .max(128, 'A senha deve ter no maximo 128 caracteres.'),
});
exports.signInSchema = zod_1.default.object({
    email: zod_1.default
        .string()
        .email('Informe um e-mail válido.')
        .min(5, 'O e-mail deve ter no mínimo 5 caracteres.')
        .max(254, 'O e-mail deve ter no máximo 254 caracteres.'),
    password: zod_1.default
        .string()
        .min(8, 'A senha deve ter no minímo 8 caracteres.')
        .max(128, 'A senha deve ter no maximo 128 caracteres.'),
});
