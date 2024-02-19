import { ImageArtworkType } from '@/types/image';
import { AxiosResponse } from 'axios';
import instance from '../axios';

export const postUploadImageFile = async <T = ImageArtworkType, R = FormData>(data: R): Promise<T> => {
  try {
    const response = await instance.post<T, AxiosResponse<T>, R>('/image/artwork', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err: any) {
    return err.response;
  }
};
