import { AxiosError } from 'axios';
import instance from '../axios';

interface PostFollowProps {
  userId?: number;
  receiverId?: number;
}
export const postFollow = async ({ userId, receiverId }: PostFollowProps) => {
  try {
    const response = await instance.post(`/users/${userId}/follows`, { receiverId });
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return error.response;
  }
};
