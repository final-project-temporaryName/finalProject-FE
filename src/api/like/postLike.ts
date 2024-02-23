import { AxiosError } from 'axios';
import instance from '../axios';

interface LikeIdRes {
  likeId: number;
}

interface Props {
  artworkId: number;
}

export const postLike = async ({ artworkId }: Props) => {
  try {
    const response = await instance.post(`/artworks/${artworkId}/likes`);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return error.response;
  }
};
