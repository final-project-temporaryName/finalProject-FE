import { AxiosError } from 'axios';
import instance from '../axios';

interface DeleteFollowProps {
  userId?: number;
  followId: number | null;
}

export const deleteFollow = async ({ userId, followId }: DeleteFollowProps) => {
  try {
    const response = await instance.delete(`/users/${userId}/follows/${followId}`);
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return error.response;
  }
};
