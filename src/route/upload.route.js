import { Router } from 'express';
import * as uploadController from '../controller/upload.controller.js';
import { uploadSingleImage, uploadMultipleFiles } from '../middleware/upload.middleware.js';

const router = Router();

router.post('/file', uploadSingleImage('file'), uploadController.uploadSingleFile);
router.post('/image', uploadSingleImage('image'), uploadController.uploadSingleFile);
router.post('/avatar', uploadSingleImage('avatar'), uploadController.uploadSingleFile);
router.post(
  '/multiple',
  uploadMultipleFiles('files', 5, true),
  uploadController.uploadMultipleFilesR2
);
export default router;
