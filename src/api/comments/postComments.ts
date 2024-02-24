import instance from '@/api/axios';
import { PostCommentsRequestType } from '@/types/comment';

export const postComments = ({ artworkId, contents }: PostCommentsRequestType) => {
  return instance.post(`/artworks/${artworkId}/comments`, { contents });
};
