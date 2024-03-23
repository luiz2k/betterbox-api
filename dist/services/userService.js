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
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    constructor() {
        this.userRepository = new userRepository_1.default();
    }
    verifyEmailAndPassord(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userByEmail = yield this.userRepository.getUserDataByEmail({
                email: data.email,
            });
            if (!userByEmail)
                throw new Error('Usuário não encontrado.');
            const userById = yield this.userRepository.getUserDataById({
                id: data.id,
            });
            if ((userById === null || userById === void 0 ? void 0 : userById.email) !== data.email)
                throw new Error('O e-mail informado não corresponde ao e-mail atual.');
            const comparePasswords = bcryptjs_1.default.compareSync(data.password, userByEmail.password);
            if (!comparePasswords)
                throw new Error('A senha informada não corresponde a senha atual.');
        });
    }
    getUserById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUser = yield this.userRepository.getUserDataById({
                id: data.id,
            });
            if (!getUser)
                throw new Error('Perfil do usuário não encontrado.');
            return {
                id: getUser.id,
                username: getUser.username,
                picture: getUser.picture,
                bio: getUser.bio,
            };
        });
    }
    changeUsername(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUser = yield this.userRepository.getUserDataById({ id: data.id });
            if ((getUser === null || getUser === void 0 ? void 0 : getUser.username) === data.username)
                throw new Error('Impossível usar o mesmo nome de usuário.');
            yield this.userRepository.updateUserData({
                id: data.id,
                username: data.username,
            });
        });
    }
    changeEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userByEmail = yield this.userRepository.getUserDataByEmail({
                email: data.newEmail,
            });
            if (userByEmail)
                throw new Error('Já existe um registro com esse e-mail.');
            yield this.verifyEmailAndPassord({
                id: data.id,
                email: data.email,
                password: data.password,
            });
            yield this.userRepository.updateUserData({
                id: data.id,
                email: data.newEmail,
            });
        });
    }
    changePassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.verifyEmailAndPassord({
                id: data.id,
                email: data.email,
                password: data.password,
            });
            const userById = yield this.userRepository.getUserDataById({
                id: data.id,
            });
            if (!userById)
                throw new Error('Usuário não encontrado.');
            const comparePasswords = bcryptjs_1.default.compareSync(data.newPassword, userById.password);
            if (comparePasswords)
                throw new Error('A nova senha deve ser diferente da senha atual.');
            const hashPassword = bcryptjs_1.default.hashSync(data.newPassword, 10);
            yield this.userRepository.updateUserData({
                id: data.id,
                password: hashPassword,
            });
        });
    }
    getPicture(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserDataById({
                id: data.id,
            });
            /* if (!user?.picture)
              throw new Error('Esse usuário não possui uma foto de perfil.'); */
            return user === null || user === void 0 ? void 0 : user.picture;
        });
    }
    changePicture(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData();
            formData.append('image', data.imageData);
            const response = yield fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                headers: {
                    Authorization: `Client-ID c6a5a73a3d14939`,
                },
                body: formData,
            });
            const responseData = yield response.json();
            const imageLink = responseData.data.link;
            yield this.userRepository.updateUserData({
                id: data.userId,
                picture: imageLink,
            });
            return imageLink;
        });
    }
    deletePicture(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserDataById({
                id: data.id,
            });
            if (!(user === null || user === void 0 ? void 0 : user.picture))
                throw new Error('Esse usuário já não possui uma foto de perfil.');
            yield this.userRepository.updateUserData({
                id: user.id,
                picture: null,
            });
        });
    }
    deleteAccount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.verifyEmailAndPassord({
                id: data.id,
                email: data.email,
                password: data.password,
            });
            yield this.userRepository.deleteAccount({ id: data.id, email: data.email });
        });
    }
    getAllWatchedMovies(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const moviesWatched = yield this.userRepository.getAllWatchedMovies({
                userId: data.userId,
                page: data.page,
            });
            return moviesWatched;
        });
    }
    getAllFavoriteMovies(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const favoriteMovies = yield this.userRepository.getAllFavoriteMovies({
                userId: data.userId,
                page: data.page,
            });
            return favoriteMovies;
        });
    }
}
exports.default = UserService;
