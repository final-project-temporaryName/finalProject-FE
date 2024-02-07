'use client';

interface CommentProps {
  likeCount: number;
  commentCount: number;
  artworkStatus: 'PUBLIC' | 'SELLING' | 'FREE';
}

function Comment({ likeCount, commentCount, artworkStatus }: CommentProps) {
  return <div className="shadow-top w-full min-w-400 rounded-t-sm bg-primary-1">댓글 컴포넌트</div>;
}

export default Comment;
