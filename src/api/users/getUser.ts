import instance from '@/lib/axios';
import { BASE_URL } from '@/api/baseUrl';

export const getUser = async (id: number) => {
  try {
    const response = await instance.get(`${BASE_URL}users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
