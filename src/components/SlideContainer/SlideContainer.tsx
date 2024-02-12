'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import '@/styles/tailwind.css';
import Image from 'next/image';
import Expand from './Expand';
import Quit from './Quit';

interface SlideContainerProps {
  imageUrlList: string[];
}

function SlideContainer({ imageUrlList }: SlideContainerProps) {
  const swiperRef = useRef<SwiperCore>();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

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
        slidesPerView={3}
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
          <div className="fixed left-0 top-0 z-infinite h-full w-full bg-black opacity-65"></div>

          <div
            className="!important fixed left-0 top-0 z-infinite flex h-full w-full items-center justify-center"
            onClick={closeModal}
          >
            <button className="absolute right-400 top-100 z-infinite" onClick={closeModal}>
              <Quit />
            </button>
            <Image src={selectedImage} alt="작품 확대 이미지" width={750} height={900} />
          </div>
        </>
      )}
    </>
  );
}

export default SlideContainer;
