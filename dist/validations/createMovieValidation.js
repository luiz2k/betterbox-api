"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovieSchema = void 0;
const zod_1 = require("zod");
exports.createMovieSchema = zod_1.z.object({
    movieId: zod_1.z
        .number()
        .int('O ID do filme deve ser um número inteiro.')
        .positive('O ID do filme deve ser positivo.')
        .max(9999999, 'O ID do filme deve ter no maximo 7 caracteres.'),
});
