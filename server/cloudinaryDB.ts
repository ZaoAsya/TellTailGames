// @ts-ignore
import * as cloudinary from 'cloudinary'; // Я не смогла найти конкретное название ошибки
import { CLOUD_CONFIG } from './config';

cloudinary.config(CLOUD_CONFIG);

const cloudinaryDB = {
  upload: async (base64: string): Promise<string> =>
    new Promise((resolve: any) => {
      cloudinary.uploader.upload(base64, (error: any, result: any) => {
        if (error) {
          resolve(error.url);
          return;
        }
        resolve(result);
      });
    }),
};

export default cloudinaryDB;
