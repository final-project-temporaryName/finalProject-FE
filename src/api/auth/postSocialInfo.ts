import instance from '../axios';

export const postUserId = async (id: string | undefined, type: string) => {
  try {
    const response = await instance.post('/login', {
      socialId: id,
      socialType: type,
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
