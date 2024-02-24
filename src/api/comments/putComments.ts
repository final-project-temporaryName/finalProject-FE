import { PutCommentsRequestType } from '@/types/comment';
import instance from '../axios';

export const putComments = ({ artworkId, commentId, contents }: PutCommentsRequestType) => {
  return instance.put(`artworks/${artworkId}/comments/${commentId}`, { contents });
};
