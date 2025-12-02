import { Injectable } from '@nestjs/common';
import cloudinary from '../config/cloudinary.config';
import * as streamifier from 'streamifier';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File, folder: string = 'maia-advocacia'): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result!.secure_url);
          }
        }
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
