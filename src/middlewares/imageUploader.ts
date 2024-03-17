import multer from 'multer';

export default class ImageUploader {
  private upload: multer.Multer;

  constructor() {
    this.upload = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './public/uploads/users');
        },
        filename: (req, file, cb) => {
          const userId: number = req.userId;

          cb(null, `${userId}.jpg`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const fileType: string | undefined = [
          'image/png',
          'image/jpg',
          'image/jpeg',
        ].find((fileType) => fileType === file.mimetype);

        if (fileType) return cb(null, true);

        cb(null, false);
      },
    });
  }

  public uploadSingle(fieldName: string) {
    return this.upload.single(fieldName);
  }
}
