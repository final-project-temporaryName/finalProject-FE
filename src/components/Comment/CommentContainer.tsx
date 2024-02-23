'use client';

import { getComments } from '@/api/comments/getComments';
import { postComments } from '@/api/comments/postComments';
import Comment from '@/components/Comment/Comment';
import useInfiniteData from '@/hooks/useInfiniteData';
import { useStore } from '@/store';
import { CommentProps, PostCommentsRequestType } from '@/types/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import UpArrow from '../../../public/assets/icons/UpArraw.svg';
import CommentSend from './CommentSend';

interface Props {
  likeCount: number;
  commentCount: number;
  type: 'main' | 'mypage' | 'artist' | 'comment';
}

interface InputForm {
  comment?: string;
}

interface Comments {
  contents: CommentProps[];
  hasNext: boolean;
  pages: Comments[];
}

function CommentContainer({ likeCount, commentCount, type }: Props) {
  const { register, handleSubmit, watch, reset } = useForm();
  const queryClient = useQueryClient();
  const bottom = useRef<HTMLDivElement>(null);
  const contents = watch('comment');
  const clickedArtworkId = useStore((state) => state.clickedArtworkId);
  const artworkId = clickedArtworkId;

  //GET
  const argument = {
    queryKey: ['comments', String(artworkId)],
    queryFn: getComments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', String(artworkId)] });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage: Comments) => {
      return lastPage.hasNext ? lastPage.contents[lastPage.contents.length - 1].commentId : undefined;
    },
    ref: bottom,
    type: type,
    artworkId: artworkId,
  };
  const { data, isPending } = useInfiniteData(argument);

  //POST
  const postCommentsMutation = useMutation({
    mutationFn: ({ artworkId, contents }: PostCommentsRequestType) => postComments({ artworkId, contents }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', String(artworkId)] });
      reset();
    },
  });

  const onValid = (data: InputForm) => {
    console.log('제출 버튼 클릭됨!');
    // data.comment를 첨부해서 post api 요청 로직 필요
    postCommentsMutation.mutate(
      { artworkId, contents },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.error(error);
        },
        onSettled: () => {},
      },
    );
  };

  return (
    <div>
      <div className="w-full min-w-360 rounded-t-sm bg-gray-1 shadow-top">
        <div className="flex max-h-250 flex-col overflow-y-scroll bg-gray-1 p-20 pb-7">
          {data &&
            data?.pages?.map((page: Comments) => {
              const comments = page.contents;
              return comments.map((comment) => {
                return (
                  <div key={comment.commentId}>
                    <Comment
                      profileUrl={comment.profileUrl}
                      nickname={comment.nickname}
                      createdAt={comment.createdAt}
                      contents={comment.contents}
                      author={comment.author}
                      commentId={comment.commentId}
                    />
                  </div>
                );
              });
            })}
          <div ref={bottom} />
        </div>
        <form className="flex items-center gap-13 bg-gray-1 p-20 pb-36" onSubmit={handleSubmit(onValid)}>
          <a id="downwards"></a>
          <input
            type="text"
            className="w-full rounded-sm bg-white px-20 py-10 text-15"
            placeholder="작가에게 한마디 남겨보세요!"
            {...register('comment')}
          />
          <button title="submit" type="submit">
            <CommentSend />
          </button>
          <div className="animate-bounce cursor-pointer">
            <Link href={'#upwards'}>
              <UpArrow />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentContainer;
