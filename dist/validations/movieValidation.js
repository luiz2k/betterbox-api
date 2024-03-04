"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCommentSchema = exports.createCommentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createCommentSchema = zod_1.default.object({
    comment: zod_1.default
        .string()
        .min(2, 'O comentário deve ter no minímo 2 caracteres.')
        .max(100, 'O comentário deve ter no maximo 100 caracteres.'),
});
exports.editCommentSchema = zod_1.default.object({
    newComment: zod_1.default
        .string()
        .min(2, 'O comentário deve ter no minímo 2 caracteres.')
        .max(100, 'O comentário deve ter no maximo 100 caracteres.'),
});
