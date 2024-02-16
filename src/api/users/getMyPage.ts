import instance from '../axios';

export const getMyPage = async () => {
  try {
    const response = await instance.get('/users/mypage');
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
