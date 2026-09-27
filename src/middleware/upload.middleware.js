import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { BadRequestError } from '../core/error.response.js';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const imageFileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError('Định dạng file không hợp lệ! Chỉ chấp nhận ảnh (jpeg, jpg, png, webp, gif).'), false);
  }
};

export const multerUpload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: imageFileFilter,
});

export const uploadSingleImage = (fieldName = 'file', required = true) => {
  return (req, res, next) => {
    const upload = multerUpload.single(fieldName);

    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new BadRequestError('Kích thước file vượt quá giới hạn cho phép (Tối đa 2MB)!'));
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return next(new BadRequestError(`Field name không đúng quy định! Vui lòng đặt tên key là '${fieldName}'.`));
        }
        return next(new BadRequestError(`Lỗi upload file: ${err.message}`));
      }

      if (err) {
        return next(err);
      }

      if (required && !req.file) {
        return next(new BadRequestError(`Vui lòng chọn một file để tải lên (key: '${fieldName}')!`));
      }

      next();
    });
  };
};
const documentFileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError(`Định dạng file '${file.originalname}' không được hỗ trợ!`), false);
  }
};
const multerMemoryUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: documentFileFilter,
});

export const uploadMultipleFiles = (fieldName = 'files', maxCount = 5, required = true) => {
  return (req, res, next) => {
    const upload = multerMemoryUpload.array(fieldName, maxCount);

    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new BadRequestError('Kích thước file vượt quá giới hạn cho phép (Tối đa 10MB/file)!'));
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return next(
            new BadRequestError(
              `Số lượng file vượt quá giới hạn cho phép (Tối đa ${maxCount} file) hoặc sai tên key ('${fieldName}')!`
            )
          );
        }
        return next(new BadRequestError(`Lỗi upload file: ${err.message}`));
      }

      if (err) {
        return next(err);
      }

      if (required && (!req.files || req.files.length === 0)) {
        return next(new BadRequestError(`Vui lòng chọn ít nhất một file để tải lên (key: '${fieldName}')!`));
      }

      next();
    });
  };
};
