import { UserType } from '@/types/users';
import instance from '../axios';

export const getUser: (id: string | number) => Promise<any> = async (id) => {
  const response = await instance.get<UserType>(`users/${id}`);
  return response.data;
};
