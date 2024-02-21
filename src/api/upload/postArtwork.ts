import { AxiosError } from 'axios';
import instance from '../axios';

export interface PostArtworkProps {
  imageIds: number[];
  title: string;
  description: string;
  artworkStatus: 'PUBLIC' | 'SELLING' | 'FREE';
}

export const postArtwork = async ({ imageIds, title, description, artworkStatus }: PostArtworkProps) => {
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
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return error.response;
  }
};
