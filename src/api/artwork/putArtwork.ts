import { PutCardRequestType } from '@/types/cards';
import { AxiosError } from 'axios';
import instance from '../axios';

export const putArtwork = async ({ artworkId, imageIds, title, description, artworkStatus }: PutCardRequestType) => {
  try {
    const response = await instance.put(
      `artworks/${artworkId}`,
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
