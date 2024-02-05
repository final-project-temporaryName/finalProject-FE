'use client';

import PrimaryButton from '@/components/Button/PrimaryButton';
import '@/styles/tailwind.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import saleLabel from '../../../../public/assets/images/OnSaleImage.png';
import freeLabel from '../../../../public/assets/images/FreeImage.png';
import Modal from '../_components';
import BeforeUploadImage from './_components/BeforeUploadImage';
import StatusLabels from './_components/StatusLabels';

// document가 정의되기 전에 react-quill이 로드 되고, 정의되지 않은 document를 조작하려고 해서 에러가 발생
// 그래서 lazy-load하기 위해 dynamic import 사용
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

// TODO: API 함수 붙이기
// TODO: 리액트 훅폼 데이터 붙이기
export default function UploadModal() {
  const [description, setDescription] = useState<string>('');
  const [uploadImageSources, setUploadImageSources] = useState<string[]>([]);
  const [isPost, setIsPost] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [isFree, setIsFree] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ],
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  const formats = useMemo(() => ['font', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet'], []);

  const onClickClose = () => {
    router.back();
  };

  // 에디터 관련 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value);
  };

  // 이미지 업로드 관련 함수
  const handleUploadImage = (e: any) => {
    const fileList = e.target.files;
    let imageUrlList = [...uploadImageSources];

    // 조건문이 0
    for (let i = 0; i <= imageUrlList.length; i++) {
      console.log(fileList[i]);
      const currentImageUrl = URL.createObjectURL(fileList[i]);
      imageUrlList.push(currentImageUrl);
    }

    if (imageUrlList.length > 10) {
      imageUrlList = imageUrlList.slice(0, 10);
    }
    setUploadImageSources(imageUrlList);
  };

  const handleUploadImageButton = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current?.click();
  };

  const handleDeleteImage = (id: number) => {
    setUploadImageSources(uploadImageSources.filter((_, index) => index !== id));
  };

  return (
    <Modal.Container onClickClose={onClickClose} classname="modalContainer">
      <Modal.Header onClickClose={onClickClose} />
      <Modal.Body classname="grid grid-cols-2 h-full">
        <div className="relative flex h-full w-full items-center justify-center border-r-1 border-solid border-black">
          {uploadImageSources.length ? (
            <>
              {uploadImageSources.map((uploadImageSource) => {
                <Image
                  className="object-contain"
                  src={uploadImageSource}
                  alt="업로드한 이미지"
                  width={490}
                  height={490}
                />;
              })}
              <button className="absolute right-5 top-5" onClick={() => handleDeleteImage}>
                <svg
                  width={24}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
                >
                  <g>
                    <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                  </g>
                </svg>
              </button>
            </>
          ) : (
            <BeforeUploadImage onClick={handleUploadImageButton} />
          )}
          <input className="hidden" type="file" accept="image/*" multiple ref={inputRef} onChange={handleUploadImage} />
        </div>
        <div className="relative flex h-full w-full flex-col gap-18 p-20">
          <input
            className="h-39 w-300 p-10 placeholder:text-gray-5"
            type="text"
            spellCheck="false"
            placeholder="게시글 제목을 입력해주세요"
          />
          <div className="absolute right-5 top-0 gap-13">
            <div className="flex items-center justify-center">
              {isFree || isSale || <div className="h-57 w-30"></div>}
              {isSale && <Image src={saleLabel} alt="판매용 라벨 이미지" width={30} height={56} />}
              {isFree && <Image src={freeLabel} alt="나눔용 라벨 이미지" width={30} height={56} />}
            </div>
            <StatusLabels
              isPost={isPost}
              isSale={isSale}
              isFree={isFree}
              setIsPost={setIsPost}
              setIsSale={setIsSale}
              setIsFree={setIsFree}
            />
          </div>
          <div className="h-333 w-355 p-10">
            {/* ref 추가 */}
            <QuillNoSSRWrapper
              theme="snow"
              id={'description'}
              modules={modules}
              formats={formats}
              value={description}
              placeholder={'작품을 어필해보세요!'}
              onChange={() => handleChange}
            />
          </div>
          <div className="flex justify-end">
            <PrimaryButton destination={'/mypage'} classname={'save-button'}>
              저장하기
            </PrimaryButton>
          </div>
        </div>
      </Modal.Body>
    </Modal.Container>
  );
}
