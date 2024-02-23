import { AxiosError } from 'axios';
import instance from '../axios';

export const postFollow = async (userId: number) => {
  try {
    const response = await instance.post(`/users/${userId}/follows`);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return error.response;
  }
};
