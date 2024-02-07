'use client';

import { MouseEvent, useState } from 'react';
import Free from './Free';
import Selling from './Selling';
import WhiteComment from './WhiteComment';
import BlackComment from './BlackComment';

interface CommentProps {
  likeCount: number;
  commentCount: number;
  artworkStatus: 'PUBLIC' | 'SELLING' | 'FREE';
}

function Comment({ likeCount, commentCount, artworkStatus }: CommentProps) {
  const [isCommentClicked, setIsCommentClicked] = useState(false);

  const handleCommentClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCommentClicked((prev) => !prev);
  };

  return (
    <div
      className={
        isCommentClicked
          ? 'shadow-top relative h-500 w-full min-w-400 rounded-t-sm bg-primary-1'
          : 'shadow-top relative h-50 w-full min-w-400 rounded-t-sm bg-primary-1'
      }
    >
      <button
        className="flex items-center"
        onClick={(e) => {
          handleCommentClick(e);
        }}
      >
        {isCommentClicked ? <WhiteComment /> : <BlackComment />}
        <p className="mb-3 text-12">댓글 {commentCount}</p>
      </button>
      <div className="absolute right-20" style={{ top: '-10px' }}>
        {artworkStatus === 'SELLING' ? <Selling /> : artworkStatus === 'FREE' ? <Free /> : null}
      </div>
    </div>
  );
}

export default Comment;
