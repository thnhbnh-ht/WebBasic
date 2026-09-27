import fs from 'fs';
import path from 'path';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '../config/r2.config.js';

export const formatUploadedFile = (file, req) => {
  if (!file) return null;

  const relativeUrl = `/uploads/${file.filename}`;

  return {
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url: relativeUrl,
    path: relativeUrl,
  };
};

export const deleteUploadedFile = (fileUrlOrPath) => {
  if (!fileUrlOrPath) return false;

  const sanitizedPath = fileUrlOrPath.replace(/^\/+/, '');
  const absolutePath = path.join(process.cwd(), sanitizedPath);

  if (fs.existsSync(absolutePath)) {
    try {
      fs.unlinkSync(absolutePath);
      return true;
    } catch (error) {
      console.error(`[UploadService] Không thể xóa file: ${absolutePath}`, error.message);
      return false;
    }
  }

  return false;
};
export const uploadBufferToR2 = async (file, folder = 'documents') => {
  const ext = path.extname(file.originalname).toLowerCase();
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const key = `${folder}/${uniqueSuffix}${ext}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await r2Client.send(command);

  const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

  return {
    filename: key,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url: publicUrl,
  };
};

export const uploadMultipleToR2 = async (files, folder = 'documents') => {
  const uploadPromises = files.map((file) => uploadBufferToR2(file, folder));
  const results = await Promise.all(uploadPromises);
  return results;
};