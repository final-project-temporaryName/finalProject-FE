import { AxiosError } from 'axios';
import instance from '../axios';

export const postArtwork = async ({ artworkId }: { artworkId: number }) => {
  try {
    const response = await instance.post(`/artworks/${artworkId}/likes`);
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return error.response;
  }
};
