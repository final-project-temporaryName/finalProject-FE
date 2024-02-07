'use client';

import Free from './Free';
import Selling from './Selling';

interface CommentProps {
  likeCount: number;
  commentCount: number;
  artworkStatus: 'PUBLIC' | 'SELLING' | 'FREE';
}

function Comment({ likeCount, commentCount, artworkStatus }: CommentProps) {
  return (
    <div className="shadow-top relative w-full min-w-400 rounded-t-sm bg-primary-1">
      댓글 컴포넌트
      <div className="absolute right-20" style={{ top: '-10px' }}>
        {artworkStatus === 'SELLING' ? <Selling /> : artworkStatus === 'FREE' ? <Free /> : null}
      </div>
    </div>
  );
}

export default Comment;
