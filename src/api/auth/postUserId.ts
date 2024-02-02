import instance from '@/lib/axios';

export const postUserId = async (id: string | undefined) => {
  try {
    const response = await instance.post(`/user/id`, {
      id: id,
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
