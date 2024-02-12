import instance from '../axios';

interface Props {
  userId: number;
  title: string;
  url: string;
}

export const postLinks = async ({ userId, title, url }: Props) => {
  try {
    const response = await instance.post(`/users/${userId}/links`, { title, url });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
