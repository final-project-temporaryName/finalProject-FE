import { deleteComments } from '@/api/comments/deleteComments';
import { useStore } from '@/store';
import { CommentProps, DeleteCommentsRequestType } from '@/types/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { Button } from '../Button';

function Comment({
  profileUrl,
  nickname,
  createdAt,
  contents,
  author,
  commentId,
  setValue,
  enterEditMode,
}: CommentProps) {
  const queryClient = useQueryClient();
  const clickedArtworkId = useStore((state) => state.clickedArtworkId);
  const artworkId = clickedArtworkId;

  //DELETE
  const deleteLinkMutation = useMutation({
    mutationFn: ({ artworkId, commentId }: DeleteCommentsRequestType) => deleteComments({ artworkId, commentId }),
  });

  const handleDelete = async () => {
    if (commentId === undefined) {
      throw new Error('commentId is undefined');
    }

    deleteLinkMutation.mutate(
      { artworkId, commentId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['comments', String(artworkId)] });
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  return (
    <div className="flex h-90 w-full flex-col border-b-1 border-solid border-primary-2 px-20 pb-15 pt-15">
      <div className="flex items-center gap-10">
        <div className="relative h-30 w-30">
          <Image src={profileUrl} alt="프로필이미지" fill className="rounded-full" />
        </div>
        <p className="text-12 font-bold">{nickname}</p>
        <p className="text-12 text-gray-5">{createdAt}</p>
      </div>
      <p className="pl-40 text-14">{contents}</p>
      {author && (
        <div className="flex flex-row gap-5 pl-40 text-10">
          <Button isLink={false} classname="underline" onClick={() => enterEditMode(commentId, contents)}>
            수정
          </Button>
          <Button isLink={false} classname="underline" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      )}
    </div>
  );
}

export default Comment;
