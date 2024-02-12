import instance from '../axios';

export const deleteImageFile = async (userId: number, imageUrl: string | null) => {
  try {
    const response = await instance.delete('/images/profile', {
      data: {
        userId: userId,
        imageUrl: imageUrl,
      },
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
