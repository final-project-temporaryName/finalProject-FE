'use client';

import { useBrowserSize } from '@/hooks/useBrowserSize';
import '@/styles/tailwind.css';
import { GetArtworkImageResponse } from '@/types/cards';
import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Expand from './Expand';

interface Props {
  artworkImageResponse?: GetArtworkImageResponse[];
}

function SlideContainer({ artworkImageResponse }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const swiperRef = useRef<SwiperCore>();
  const {
    windowSize: { width: browserWidthSize },
  } = useBrowserSize();

  const setSlidesPerView = (width: number | undefined, num: number) => {
    if (!width) return 1;

    if (num >= 3) {
      if (width < 768) return 1;
      else if (width < 1200) return 2;
      else return 3;
    } else {
      if (num === 2) {
        if (width < 768) return 1;
        else return 2;
      } else if (num === 1) {
        return 1;
      }
    }
  };

  let slidesPerView;
  if (artworkImageResponse) {
    slidesPerView = useMemo(() => setSlidesPerView(browserWidthSize, artworkImageResponse.length), [browserWidthSize]);
  }

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setShowModal(false);
  };

  return (
    <div>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Scrollbar]}
        spaceBetween={10}
        slidesPerView={slidesPerView}
        autoplay={false}
        loop={false}
        navigation
        scrollbar={{ draggable: true }}
        className="swiper-container"
      >
        {artworkImageResponse?.map((data) => {
          return (
            <SwiperSlide key={data.imageId}>
              <div className="relative h-510 w-auto bg-[#000000ee]">
                <Image src={data.imageUrl} alt="작품 이미지" fill objectFit="contain" />
                <button className="absolute bottom-15 right-15" onClick={() => openModal(data.imageUrl)}>
                  <Expand />
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {showModal && (
        <>
          <div
            className="flex-center fixed left-0 top-0 z-infinite h-full w-full bg-[#000000ee] p-10"
            onClick={closeModal}
          >
            <div className="relative h-full w-full">
              <Image src={selectedImage} alt="작품 확대 이미지" fill priority style={{ objectFit: 'contain' }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SlideContainer;
