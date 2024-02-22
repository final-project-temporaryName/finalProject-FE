import { AxiosError } from 'axios';
import instance from '../axios';

export const postLike = async (artworkId: number) => {
  try {
    const response = await instance.post(`/artworks/${artworkId}/likes`);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return error.response;
  }
};
