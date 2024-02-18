import { useRouter } from 'next/navigation';
import instance from '../axios';

export const getMe = async () => {
  const router = useRouter();

  try {
    const response = await instance.get('/users/me');
    return response.data;
  } catch (error: any) {
    if (error.response.state === 400) router.replace('/login');
    return error.response;
  }
};
