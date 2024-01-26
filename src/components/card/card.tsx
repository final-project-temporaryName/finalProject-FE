import Image from 'next/image';
import Link from 'next/link';
import OnSaleImage from '../../../public/assets/images/OnSaleImage.png';
import LikeImage from '../../../public/assets/images/LikeImage.png';
import ViewImage from '../../../public/assets/images/ViewImage.png';
import CommentImage from '../../../public/assets/images/CommentImage.png';
import KebabButton from './kebabButton';
import Count from './count';

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
    <div className="flex flex-col w-280 h-328 hover:transform hover:scale-110 transition-transform duration-300">
      <Link href={workUrl} className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black rounded-md"></div>
        {onSale && (
          <div className="absolute right-22">
            <Image src={OnSaleImage} alt="판매중 이미지" width={29} height={56} />
          </div>
        )}
        <Image className="w-280 h-280 rounded-md" src={workImageUrl} alt="카드 이미지" width={280} height={280} />
        <div className="flex justify-between items-center w-280 h-10 px-15 absolute bottom-22">
          <p className="text-14 font-normal font-semibold leading-normal text-white">{workTitle}</p>
          <div className="flex items-center gap-12">
            <Count imageSource={LikeImage} imageSourceString="like" count={likeCount} />
            <Count imageSource={ViewImage} imageSourceString="view" count={viewCount} />
            <Count imageSource={CommentImage} imageSourceString="comment" count={commentCount} />
          </div>
        </div>
      </Link>
      <div className="relative flex items-center w-280 h-48 pt-10">
        <Link href={authorUrl} className="flex items-center gap-10">
          <Image className="rounded-full w-40 h-40" src={profileImageUrl} alt="프로필 이미지" width={40} height={40} />
          <p className="text-base font-normal font-bold leading-normal">{authorName}</p>
        </Link>
        <div className="absolute right-11">
          <KebabButton />
        </div>
      </div>
    </div>
  );
}

export default Card;
