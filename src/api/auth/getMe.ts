import instance from '../axios';

export const getMe = async () => {
  try {
    const response = await instance.get('/users/me');
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
