import instance from '@/api/axios';

interface LinkProps {
  userId: number;
  title: string;
  url: string;
}

export const postLinks = ({ userId, title, url }: LinkProps) => {
  return instance.post(`/users/${userId}/links`, { title, url });
};
