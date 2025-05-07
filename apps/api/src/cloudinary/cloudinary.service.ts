import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  async uploadImageToCloudinary(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise<UploadApiResponse | UploadApiErrorResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          if (!result)
            return reject(
              new InternalServerErrorException(
                'Image upload failed without error (and with no result)',
              ),
            );

          resolve(result);
        });

        streamifier.createReadStream(file.buffer).pipe(stream);
      },
    );
  }

  async uploadFileToCloudinary(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise<UploadApiResponse | UploadApiErrorResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'raw' },
          (error, result) => {
            if (error) return reject(error);
            if (!result)
              return reject(
                new InternalServerErrorException(
                  'File upload failed without error (and with no result)',
                ),
              );

            resolve(result);
          },
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      },
    );
  }
}
