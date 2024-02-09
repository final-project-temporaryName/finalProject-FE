import instance from '../axios';

export const postImageFile = async (data: FormData) => {
  try {
    const response = await instance.post('/images/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};
