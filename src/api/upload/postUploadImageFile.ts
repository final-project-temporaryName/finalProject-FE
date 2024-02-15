import { ImageArtworkType } from '@/types/artworks';
import instance from '../axios';

export const postUploadImageFile = async (data: FormData): Promise<ImageArtworkType> => {
  try {
    const response = await instance.post('/images/artwork', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err: any) {
    return err.response;
  }
};
