import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiOptions, v2 } from 'cloudinary';
import { MemoryStoredFile } from 'nestjs-form-data';
import { Readable } from 'stream';
import { CloudinaryImageResponse } from './types';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: MemoryStoredFile,
    uploadOptions: UploadApiOptions,
  ): Promise<CloudinaryImageResponse> {
    try {
      const promise = new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) {
              return reject(error);
            }

            resolve(result);
          },
        );

        Readable.from(file.buffer).pipe(upload);
      });

      const result = await promise;

      return result as CloudinaryImageResponse;
    } catch (err) {
      throw new BadRequestException(
        'Não foi possível fazer o upload da imagem, tente novamente mais tarde',
      );
    }
  }

  async deleteImage(publicId: string) {
    await v2.uploader.destroy(publicId);
  }
}
