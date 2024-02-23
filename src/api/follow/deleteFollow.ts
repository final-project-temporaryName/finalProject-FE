import { AxiosError } from 'axios';
import instance from '../axios';

interface DeleteFollowProps {
  userId: number;
  followId: number;
}

export const deleteLike = async ({ userId, followId }: DeleteFollowProps) => {
  try {
    const response = await instance.delete(`/artworks/${userId}/follow/${followId}`);
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return error.response;
  }
};
