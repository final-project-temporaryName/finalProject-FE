import instance from '@/lib/axios';
import { AxiosError, isAxiosError } from 'axios';

export const postUserId = async (id: string | undefined) => {
  try {
    const response = await instance.post(`/user/id`, {
      id: id,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError<AxiosError>(error)) {
      return error.response?.data.message;
    }
  }
};
