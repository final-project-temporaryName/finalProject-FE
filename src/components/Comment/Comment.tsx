import Image from 'next/image';

interface CommentProps {
  imageUrl: string;
  nickName: string;
  createdAt: string;
  description: string;
}

function Comment({ imageUrl, nickName, createdAt, description }: CommentProps) {
  return (
    <div className="flex h-80 w-full flex-col border-b-1 border-solid border-primary-2 px-20 pb-5 pt-15">
      <div className="flex items-center gap-10">
        <div className="relative h-30 w-30">
          <Image src={imageUrl} alt="프로필이미지" fill className="rounded-full" />
        </div>
        <p className="text-12 font-bold">{nickName}</p>
        <p className="text-12 text-primary-3">{createdAt}</p>
      </div>
      <p className="pl-40 text-14">{description}</p>
    </div>
  );
}

export default Comment;
