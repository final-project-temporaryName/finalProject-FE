import { ImageArtworkType } from '@/types/artworks';
import { AxiosResponse } from 'axios';
import instance from '../axios';

export const postUploadImageFile = async <T = ImageArtworkType, R = FormData>(data: R): Promise<T> => {
  try {
    const response = await instance.post<T, AxiosResponse<T>, R>('/images/artwork', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err: any) {
    return err.response;
  }
};
