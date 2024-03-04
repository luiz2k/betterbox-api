"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.changeEmailSchema = exports.changeUsernameSchema = void 0;
const zod_1 = require("zod");
exports.changeUsernameSchema = zod_1.z.object({
    newUsername: zod_1.z
        .string()
        .min(2, 'O usuário deve ter no minímo 2 caracteres.')
        .max(15, 'O usuário deve ter no maximo 15 caracteres.'),
});
exports.changeEmailSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email('Informe um e-mail válido.')
        .min(5, 'O e-mail deve ter no mínimo 5 caracteres.')
        .max(254, 'O e-mail deve ter no máximo 254 caracteres.'),
    password: zod_1.z
        .string()
        .min(8, 'A senha deve ter no minímo 8 caracteres.')
        .max(128, 'A senha deve ter no maximo 128 caracteres.'),
    newEmail: zod_1.z
        .string()
        .email('Informe um e-mail válido.')
        .min(5, 'O e-mail deve ter no mínimo 5 caracteres.')
        .max(254, 'O e-mail deve ter no máximo 254 caracteres.'),
});
exports.changePasswordSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email('Informe um e-mail válido.')
        .min(5, 'O e-mail deve ter no mínimo 5 caracteres.')
        .max(254, 'O e-mail deve ter no máximo 254 caracteres.'),
    password: zod_1.z
        .string()
        .min(8, 'A senha deve ter no minímo 8 caracteres.')
        .max(128, 'A senha deve ter no maximo 128 caracteres.'),
    newPassword: zod_1.z
        .string()
        .min(8, 'A senha deve ter no minímo 8 caracteres.')
        .max(128, 'A senha deve ter no maximo 128 caracteres.'),
});
