import instance from '../axios';

export interface LinkProps {
  userId: number;
  title: string;
  url: string;
}

export const postLinks = async ({ userId, title, url }: LinkProps) => {
  try {
    const response = await instance.post(`/users/${userId}/links`, { title, url });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
