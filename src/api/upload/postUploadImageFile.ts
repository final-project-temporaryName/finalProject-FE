import instance from '../axios';

export const postUploadImageFile = async (data: FormData) => {
  try {
    const response = await instance.post('/images/artwork', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};
