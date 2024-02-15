'use client';

import '@/styles/tailwind.css';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Expand from './Expand';
import { useBrowserSize } from '@/hooks/useBrowserSize';

interface SlideContainerProps {
  imageUrlList: string[];
}

function SlideContainer({ imageUrlList }: SlideContainerProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const swiperRef = useRef<SwiperCore>();
  const { width: browserWidthSize } = useBrowserSize();

  const setSlidesPerView = (width: number | undefined, num: number) => {
    if (!width) return 1;

    if (num > 3) {
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
  slidesPerView = useMemo(() => setSlidesPerView(browserWidthSize, imageUrlList.length), [browserWidthSize]);

  console.log(browserWidthSize);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setShowModal(false);
  };

  return (
    <>
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
        {imageUrlList?.map((url, idx) => {
          return (
            <SwiperSlide key={idx}>
              <div className="relative h-520 w-auto">
                <Image src={url} alt="작품 이미지" fill objectFit="cover" />
                <button className="absolute bottom-15 right-15" onClick={() => openModal(url)}>
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
            className="flex-center fixed left-0 top-0 z-infinite h-full w-full bg-[#00000066] p-10"
            onClick={closeModal}
          >
            <div className="relative h-full w-full">
              <Image src={selectedImage} alt="작품 확대 이미지" fill priority style={{ objectFit: 'contain' }} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SlideContainer;
