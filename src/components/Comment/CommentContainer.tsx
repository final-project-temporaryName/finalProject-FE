'use client';

import { useForm } from 'react-hook-form';
import { CommentProps } from '@/types/comment';
import Comment from '@/components/Comment/Comment';
import CommentSend from './CommentSend';
import Free from './Free';
import Selling from './Selling';
import UpArrow from '../../../public/assets/icons/UpArraw.svg';
import Link from 'next/link';
import { postComments } from '@/api/comments/postComments';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/store';
import { getComments } from '@/api/comments/getComments';
import { GetCommentsResponse } from '@/types/comment';

interface CommentContainerProps {
  likeCount: number;
  commentCount: number;
  artworkStatus: 'PUBLIC' | 'SELLING' | 'FREE';
}

interface InputForm {
  comment?: string;
}

// interface Comment {
//   profileUrl: string;
//   nickname: string;
//   createdAt: string;
//   contents: string;
// }

const data: CommentProps[] = [
  {
    profileUrl:
      'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nickname: 'Elon Musk',
    createdAt: '2024년 2월 11일',
    contents: '내가 본 것 중에서 단연 최고였다. 와우~',
    author: true,
  },
  {
    profileUrl:
      'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nickname: 'Elon Musk',
    createdAt: '2024년 2월 10일',
    contents: '내가 본 것 중에서 단연 최고였다. 와우~',
    author: true,
  },
  {
    profileUrl:
      'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nickname: 'Elon Musk',
    createdAt: '2024년 2월 9일',
    contents: '내가 본 것 중에서 단연 최고였다. 와우~',
    author: false,
  },
  {
    profileUrl:
      'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nickname: 'Elon Musk',
    createdAt: '2024년 2월 8일',
    contents: '내가 본 것 중에서 단연 최고였다. 와우~',
    author: true,
  },
  {
    profileUrl:
      'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nickname: 'Elon Musk',
    createdAt: '2024년 2월 7일',
    contents: 'Awesome !!!!!',
    author: false,
  },
  {
    profileUrl:
      'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nickname: 'Elon Musk',
    createdAt: '2024년 2월 6일',
    contents: 'Slay',
    author: true,
  },
  {
    profileUrl:
      'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nickname: 'Elon Musk',
    createdAt: '2024년 2월 6일',
    contents: 'Slay',
    author: false,
  },
];

function CommentContainer({ likeCount, commentCount, artworkStatus }: CommentContainerProps) {
  const { register, handleSubmit, watch } = useForm();
  const queryClient = useQueryClient();
  const clickedArtworkId = useStore((state) => state.clickedArtworkId);
  const artworkId = clickedArtworkId;
  console.log(artworkId);
  const contents = watch('comment');

  //GET
  // const response = useQuery({
  //   queryKey: ['comments'],
  //   queryFn: getComments,
  // });

  //POST
  const postCommentsMutation = useMutation({
    mutationFn: postComments,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    // },
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
    <div className="relative">
      <div className="absolute -top-10 right-20 z-first">
        {artworkStatus === 'SELLING' ? <Selling /> : artworkStatus === 'FREE' ? <Free /> : null}
      </div>
      <div className="w-full min-w-360 rounded-t-sm bg-gray-1 shadow-top">
        <div className="flex flex-col bg-gray-1 p-20 pb-7">
          {data &&
            data.length > 0 &&
            data.map((comment) => (
              <div key={comment.createdAt + comment.nickname}>
                <Comment
                  profileUrl={comment.profileUrl}
                  nickname={comment.nickname}
                  createdAt={comment.createdAt}
                  contents={comment.contents}
                  author={comment.author}
                />
              </div>
            ))}
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
