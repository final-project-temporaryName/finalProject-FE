import { AxiosError } from 'axios';
import instance from '../axios';

export const deleteArtwork = async (artworkId: number) => {
  try {
    const response = await instance.delete(`artworks/${artworkId}`);
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return error.response;
  }
};
