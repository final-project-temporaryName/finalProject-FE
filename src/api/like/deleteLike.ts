import { AxiosError } from 'axios';
import instance from '../axios';

interface DeleteArtworkProps {
  artworkId: number;
  likeId?: number | null;
}

export const deleteLike = async ({ artworkId, likeId }: DeleteArtworkProps) => {
  try {
    const response = await instance.delete(`/artworks/${artworkId}/likes/${likeId}`);
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return error.response;
  }
};
