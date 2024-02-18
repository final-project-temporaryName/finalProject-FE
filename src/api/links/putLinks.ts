import instance from '@/api/axios';

interface Props {
  userId: number;
  linkId: number;
  title: string;
  url: string;
}

export const putLinks = ({ userId, linkId, title, url }: Props) => {
  return instance.put(`/users/${userId}/links/${linkId}`, { title, url });
};
