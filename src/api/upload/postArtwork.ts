import { AxiosError } from 'axios';
import instance from '../axios';

interface postArtworkProps {
  imageIds: number[];
  title: string;
  description: string;
  artworkStatus: 'PUBLIC' | 'SELLING' | 'FREE';
}

export const postArtwork = async ({ imageIds, title, description, artworkStatus }: postArtworkProps) => {
  try {
    const response = await instance.post(
      '/artworks',
      {
        imageIds,
        title,
        description,
        artworkStatus,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return error.response;
  }
};
