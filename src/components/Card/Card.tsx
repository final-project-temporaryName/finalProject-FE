import Image from 'next/image';
import Link from 'next/link';
import CommentImage from '../../../public/assets/images/CommentImage.png';
import LikeImage from '../../../public/assets/images/LikeImage.png';
import OnSaleImage from '../../../public/assets/images/OnSaleImage.png';
import ViewImage from '../../../public/assets/images/ViewImage.png';
import { Button } from '../Button';
import Count from './Count';

interface CardProps {
  onSale: boolean;
  workImageUrl: string;
  workTitle: string;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  profileImageUrl: string;
  authorName: string;
  workUrl: string;
  authorUrl: string;
}

function Card({
  onSale,
  workImageUrl,
  workTitle,
  likeCount,
  viewCount,
  commentCount,
  profileImageUrl,
  authorName,
  workUrl,
  authorUrl,
}: CardProps) {
  return (
    <div className="flex h-328 w-280 flex-col transition-transform duration-300 hover:scale-110 hover:transform">
      <Link href={workUrl} className="relative">
        <div className="absolute inset-0 rounded-md bg-gradient-to-b from-transparent via-transparent to-black"></div>
        <div className="absolute left-18 top-11">
          <Button.Kebab />
        </div>
        {onSale && (
          <div className="absolute right-18">
            <Image src={OnSaleImage} alt="판매중 이미지" width={29} height={56} />
          </div>
        )}
        <Image className="h-280 w-280 rounded-md" src={workImageUrl} alt="카드 이미지" width={280} height={280} />
        <div className="absolute bottom-22 flex h-10 w-280 items-center justify-between px-15">
          <p className="font-normal text-14 font-semibold leading-normal text-white">{workTitle}</p>
          <div className="flex items-center gap-12">
            <Count imageSource={LikeImage} imageSourceString="like" count={likeCount} />
            <Count imageSource={ViewImage} imageSourceString="view" count={viewCount} />
            <Count imageSource={CommentImage} imageSourceString="comment" count={commentCount} />
          </div>
        </div>
      </Link>
      <div className="relative flex h-48 w-280 items-center pt-10">
        <Link href={authorUrl} className="flex items-center gap-10">
          <Image className="h-40 w-40 rounded-full" src={profileImageUrl} alt="프로필 이미지" width={40} height={40} />
          <p className="text-base font-normal font-bold leading-normal">{authorName}</p>
        </Link>
      </div>
    </div>
  );
}

export default Card;
