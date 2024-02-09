'use client';

import { CardType } from '@/types/cards';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SellingLabelImg from '../../../public/assets/icons/saleFlag.svg';
import ShareLabelImg from '../../..//public/assets/icons/shareFlag.svg';
import CommentImage from '../../../public/assets/images/CommentImage.png';
import LikeImage from '../../../public/assets/images/LikeImage.png';
import ViewImage from '../../../public/assets/images/ViewImage.png';
import { Button } from '../Button';
import Count from './Count';
import { useStore } from '@/store';

type Props = Omit<CardType, 'description' | 'createdAt' | 'updatedAt'>;

function Card({
  artworkId,
  title,
  artworkStatus,
  thumbnailImageUrl,
  likeCount,
  viewCount,
  commentCount,
  artistId,
  artistName,
  artistProfileImageUrl,
}: Props) {
  const pathname = usePathname();
  const pathnameArr = pathname.split('/');
  const firstPathname = pathnameArr[1];

  const setClickedArtworkId = useStore((state) => state.setClickedArtworkId);

  const handleArtworkClick = () => {
    setClickedArtworkId(artworkId);
  };

  return (
    <div className={`flex h-${pathname === '/' ? '328' : '280'} min-w-280 flex-col`}>
      <Link href={`/art/${artworkId}`} onClick={handleArtworkClick}>
        <div id="cardImgBox" className="group relative z-first h-280 min-w-280 overflow-hidden">
          <Image
            className="rounded-md transition-all duration-200 ease-linear group-hover:scale-[1.2]"
            src={thumbnailImageUrl}
            alt="카드 이미지"
            style={{ objectFit: 'cover' }}
            priority
            fill
          />
          <div className="absolute inset-0 rounded-md bg-gradient-to-b from-transparent via-transparent to-gray-8"></div>
          {firstPathname === 'mypage' && (
            <div className="absolute left-18 top-11">
              <Button.Kebab />
            </div>
          )}
          {artworkStatus === 'FORSALE' ? (
            <div className="absolute right-18 top-0">
              <SellingLabelImg />
            </div>
          ) : artworkStatus === 'SHARE' ? (
            <div className="absolute right-18 top-0">
              <ShareLabelImg />
            </div>
          ) : null}
          <div className="items-left absolute bottom-50 flex h-10 w-280 flex-col gap-7 px-15">
            <p className="font-normal text-14 font-semibold leading-normal text-white">{title}</p>
            <div className="flex items-center gap-12">
              <Count imageSource={LikeImage} imageSourceString="like" count={likeCount} />
              <Count imageSource={ViewImage} imageSourceString="view" count={viewCount} />
              <Count imageSource={CommentImage} imageSourceString="comment" count={commentCount} />
            </div>
          </div>
        </div>
      </Link>
      {pathname === '/' && (
        <div className="relative flex h-48 w-280 items-center pt-10">
          <Link href={`/artist/${artistId}`} className="flex items-center gap-10">
            <Image
              className="h-40 w-40 rounded-full"
              src={artistProfileImageUrl}
              alt="프로필 이미지"
              width={40}
              height={40}
            />
            <p className="text-base font-normal font-bold leading-normal">{artistName}</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Card;
