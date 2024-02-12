import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import '@/styles/tailwind.css';
import Image from 'next/image';

interface SlideContainerProps {
  imageUrlList: string[];
}

function SlideContainer({ imageUrlList }: SlideContainerProps) {
  const swiperRef = useRef<SwiperCore>();

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
              <div className="h-500 w-auto">
                <Image src={url} alt="작품 이미지" fill objectFit="cover" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default SlideContainer;
