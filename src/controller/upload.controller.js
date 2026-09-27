import catchAsync from '../utils/catchAsync.js';
import { sendSuccess } from '../utils/responseHelper.js';
import * as uploadService from '../service/upload.service.js';

export const uploadSingleFile = catchAsync(async (req, res) => {
  const result = uploadService.formatUploadedFile(req.file, req);
  return sendSuccess(res, 201, 'Upload file thành công', result);
});
export const uploadMultipleFilesR2 = catchAsync(async (req, res) => {
  const results = await uploadService.uploadMultipleToR2(req.files, 'documents');
  return sendSuccess(res, 201, 'Upload các file lên Cloudflare R2 thành công!', results);
});