import instance from '@/api/axios';

interface Props {
  userId: number;
  linkId: number;
}

export const deleteLinks = ({ userId, linkId }: Props) => {
  return instance.delete(`/users/${userId}/links/${linkId}`);
};
