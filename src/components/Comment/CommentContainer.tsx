'use client';

import { getComments } from '@/api/comments/getComments';
import { postComments } from '@/api/comments/postComments';
import Comment from '@/components/Comment/Comment';
import useInfiniteData from '@/hooks/useInfiniteData';
import { useStore } from '@/store';
import { CommentProps, PostCommentsRequestType, PutCommentsRequestType } from '@/types/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import UpArrow from '../../../public/assets/icons/UpArraw.svg';
import CommentSend from './CommentSend';
import { putComments } from '@/api/comments/putComments';

interface Props {
  likeCount: number;
  commentCount: number;
  type: 'main' | 'mypage' | 'artist' | 'comment';
}

interface Comments {
  contents: CommentProps[];
  hasNext: boolean;
  pages: Comments[];
}

function CommentContainer({ likeCount, commentCount, type }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const { register, handleSubmit, watch, reset, setValue } = useForm();
  const queryClient = useQueryClient();
  const bottom = useRef<HTMLDivElement>(null);
  const clickedArtworkId = useStore((state) => state.clickedArtworkId);

  const artworkId = clickedArtworkId;

  const enterEditMode = (commentId: number, contents: string) => {
    setIsEditMode(true);
    setEditingCommentId(commentId);
    setValue('comment', contents);
  };

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

  //PUT
  const putCommentsMutation = useMutation({
    mutationFn: ({ artworkId, commentId, contents }: PutCommentsRequestType) =>
      putComments({ artworkId, commentId, contents }),
  });

  const onValid = (data: any) => {
    if (isEditMode && editingCommentId !== null) {
      putCommentsMutation.mutate(
        { artworkId, commentId: editingCommentId, contents: data.comment },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', String(artworkId)] });
            reset();
            setIsEditMode(false);
            setEditingCommentId(null);
          },
          onError: (error) => {
            console.error(error);
          },
        },
      );
    } else if (!isEditMode) {
      postCommentsMutation.mutate(
        { artworkId, contents: data.comment },
        {
          onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ['comments', String(artworkId)] });
            reset();
          },
          onError: (error) => {
            console.error(error);
          },
        },
      );
    } else {
      console.error('Editing comment ID is null.');
    }
  };

  return (
    <div className="mb-20 flex justify-center">
      <div className="mx-30 w-full rounded-lg border-2 border-solid border-gray-3 bg-white md:w-[90%]">
        <div className="flex max-h-250 flex-col overflow-y-scroll p-0 pb-7">
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
                      setValue={setValue}
                      enterEditMode={enterEditMode}
                    />
                  </div>
                );
              });
            })}
          <div ref={bottom} />
        </div>
        <form className="flex items-center gap-13 p-20 pb-36 md:pb-0" onSubmit={handleSubmit(onValid)}>
          <a id="downwards"></a>
          <input
            type="text"
            className="w-full rounded-sm border-1 border-solid border-gray-3 bg-white px-20 py-10 text-15"
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
