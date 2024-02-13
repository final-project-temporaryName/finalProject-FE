import instance from '../axios';

interface Props {
  userId: number;
  linkId: number;
}

export const postLinks = async ({ userId, linkId }: Props) => {
  try {
    const response = await instance.delete(`/users/${userId}/links/${linkId}`);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
