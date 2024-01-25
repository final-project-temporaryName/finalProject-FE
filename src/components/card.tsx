import Image from 'next/image';
import OnSaleImage from '../../public/assets/images/OnSaleImage.png';
import KebabButton from './kebabButton';

interface CardProps {
  onSale: boolean;
  workImageUrl: string;
  workTitle: string;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  profileImageUrl: string;
  authorName: string;
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
}: CardProps) {
  return (
    <div className="flex flex-col w-280 h-328">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
        {onSale && (
          <div className="absolute right-17">
            <Image src={OnSaleImage} alt="판매중 이미지" width={29} height={56} />
          </div>
        )}
        <Image className="w-280 h-280" src={workImageUrl} alt="카드 이미지" width={280} height={280} />
        <div className="flex justify-between w-280 h-10 px-15 absolute bottom-25">
          <p className="text-base font-normal font-semibold leading-normal text-white">{workTitle}</p>
          <div>좋아요 컴포넌트</div>
        </div>
      </div>
      <div className="relative flex items-center w-280 h-48 gap-10 pt-5">
        <Image className="rounded-full w-40 h-40" src={profileImageUrl} alt="프로필 이미지" width={40} height={40} />
        <p className="text-base font-normal font-bold leading-normal">{authorName}</p>
        <div className="absolute right-13">
          <KebabButton />
        </div>
      </div>
    </div>
  );
}

export default Card;
