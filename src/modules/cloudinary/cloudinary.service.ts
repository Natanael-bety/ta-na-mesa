import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiOptions, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

interface CustomUploadApiResponse extends UploadApiResponse {
  eager?: {
    transformation: string;
    width: number;
    height: number;
    bytes: number;
    format: string;
    url: string;
    secure_url: string;
  }[];
}

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    uploadOptions: UploadApiOptions,
  ): Promise<CustomUploadApiResponse> {
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

      return result as CustomUploadApiResponse;
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
