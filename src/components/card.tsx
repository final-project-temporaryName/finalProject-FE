import Image from 'next/image';
import OnSaleImage from '../../public/assets/images/OnSaleImage.png';
import SampleImage from '../../public/assets/images/CardSampleImage.png';

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

function Card() {
  return (
    <div className="flex flex-col w-280 h-328">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
        <div className="absolute right-17">
          <Image src={OnSaleImage} alt="판매중 이미지" width={29} height={56} />
        </div>
        <Image src={SampleImage} alt="카드 이미지" width={280} height={280} />
        <div className="flex justify-between w-280 h-10 px-15 absolute bottom-25">
          <p className="text-base font-normal font-semibold leading-normal text-white">작품 제목</p>
          <div>좋아요 컴포넌트</div>
        </div>
      </div>
      <div className="flex items-center bg-primary-1 w-280 h-48 gap-10 pt-5">
        <Image className="rounded-full" src={SampleImage} alt="프로필 이미지" width={40} height={40} />
        <p className="text-base font-normal font-bold leading-normal">작가 닉네임</p>
      </div>
    </div>
  );
}

export default Card;
