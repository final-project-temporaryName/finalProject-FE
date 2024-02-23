import { AxiosError } from 'axios';
import instance from '../axios';

interface Props {
  artworkId: number;
}

export const deleteArtwork = async ({ artworkId }: Props) => {
  try {
    const response = await instance.delete(`/artworks/${artworkId}`);
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return error.response;
  }
};
