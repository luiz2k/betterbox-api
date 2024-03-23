"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
class ImageUploader {
    constructor() {
        this.upload = (0, multer_1.default)({
            /* storage: multer.diskStorage({
              destination: (req, file, cb) => {
                cb(null, './public/uploads/users');
              },
              filename: (req, file, cb) => {
                const userId: number = req.userId;
      
                cb(null, `${userId}.jpg`);
              },
            }), */
            fileFilter: (req, file, cb) => {
                const fileType = [
                    'image/png',
                    'image/jpg',
                    'image/jpeg',
                ].find((fileType) => fileType === file.mimetype);
                if (fileType)
                    return cb(null, true);
                cb(null, false);
            },
        });
    }
    uploadSingle(fieldName) {
        return this.upload.single(fieldName);
    }
}
exports.default = ImageUploader;
