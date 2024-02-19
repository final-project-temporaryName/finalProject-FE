import instance from '@/api/axios';

interface LinkProps {
  userId: number;
  title: string;
  address: string;
}

export const postLinks = ({ userId, title, address }: LinkProps) => {
  return instance.post(`/users/${userId}/links`, { title, address });
};
