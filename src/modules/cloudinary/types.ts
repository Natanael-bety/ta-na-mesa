import { UploadApiResponse } from 'cloudinary';

export interface CloudinaryImageResponse extends UploadApiResponse {
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
