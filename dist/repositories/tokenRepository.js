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
const database_1 = __importDefault(require("../database/database"));
class TokenRepository {
    getRefreshToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.default.refreshToken.findFirst({
                where: { token: data.token },
            });
        });
    }
    addRefreshToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.refreshToken.create({
                data: {
                    token: data.token,
                    createdAt: data.createdAt,
                    expiresAt: data.expiresAt,
                    user: { connect: { id: data.userId } },
                },
            });
        });
    }
    removeRefreshToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.refreshToken.delete({
                where: { id: data.id, token: data.token },
            });
        });
    }
    getRevokedToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.default.revokedToken.findFirst({
                where: { token: data.token },
            });
        });
    }
    addRevokedToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.revokedToken.create({
                data: {
                    token: data.token,
                    revokedAt: data.revokedAt,
                    expiresAt: data.expiresAt,
                    user: { connect: { id: data.userId } },
                },
            });
        });
    }
    removeRevokedToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.revokedToken.delete({
                where: { id: data.id, token: data.token },
            });
        });
    }
}
exports.default = TokenRepository;
