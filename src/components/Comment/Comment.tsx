'use client';

import { MouseEvent, useState } from 'react';
import Free from './Free';
import Selling from './Selling';
import WhiteComment from './WhiteComment';
import BlackComment from './BlackComment';
import RedLike from './RedLike';
import WhiteLike from './WhiteLike';

interface CommentProps {
  likeCount: number;
  commentCount: number;
  artworkStatus: 'PUBLIC' | 'SELLING' | 'FREE';
}

function Comment({ likeCount, commentCount, artworkStatus }: CommentProps) {
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isCommentClicked, setIsCommentClicked] = useState(false);

  const handleLikeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLikeClicked((prev) => !prev);
  };

  const handleCommentClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCommentClicked((prev) => !prev);
  };

  return (
    <div
      className={
        isCommentClicked
          ? 'shadow-top relative h-500 w-full min-w-400 rounded-t-sm bg-primary-1'
          : 'shadow-top relative h-55 w-full min-w-400 rounded-t-sm bg-primary-1'
      }
    >
      <div className="ml-20 flex gap-5">
        <button
          className="mt-7 flex items-center"
          onClick={(e) => {
            handleLikeClick(e);
          }}
        >
          {isLikeClicked ? <RedLike /> : <WhiteLike />}
          <p className="mb-3 text-12">{likeCount < 1000 ? likeCount : (likeCount / 1000).toFixed(1) + 'k'}</p>
        </button>
        <button
          className="mt-7 flex items-center"
          onClick={(e) => {
            handleCommentClick(e);
          }}
        >
          {isCommentClicked ? <WhiteComment /> : <BlackComment />}
          <p className="mb-3 text-12">
            댓글 {commentCount < 1000 ? commentCount : (commentCount / 1000).toFixed(1) + 'k'}
          </p>
        </button>
      </div>
      <div className="absolute right-20" style={{ top: '-10px' }}>
        {artworkStatus === 'SELLING' ? <Selling /> : artworkStatus === 'FREE' ? <Free /> : null}
      </div>
    </div>
  );
}

export default Comment;
