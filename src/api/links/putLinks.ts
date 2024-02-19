import instance from '@/api/axios';

interface Props {
  userId: number;
  linkId: number;
  title: string;
  address: string;
}

export const putLinks = ({ userId, linkId, title, address }: Props) => {
  return instance.put(`/users/${userId}/links/${linkId}`, { title, address });
};
