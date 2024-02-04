'use client';

import PrimaryButton from '@/components/Button/PrimaryButton';
import '@/styles/tailwind.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Modal from '../_components';
import Image from 'next/image';
import saleLabel from '../../../../public/assets/images/OnSaleImage.png';
import BeforeUploadImage from './_components/BeforeUploadImage';

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
  const [uploadImageSrc, setUploadImageSrc] = useState<string>();

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

  const formats = ['font', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet'];

  const onClickClose = () => {
    router.back();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value);
  };

  // 타입 수정하기
  const onUploadImage = (e: any) => {
    const [file] = e.target.files;
    const imageUrl = URL.createObjectURL(file);
    setUploadImageSrc(imageUrl);
  };

  const handleUploadImage = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };

  return (
    <Modal.Container onClickClose={onClickClose} classname="modalContainer">
      <Modal.Header onClickClose={onClickClose} />
      <Modal.Body classname="grid grid-cols-2 h-full">
        <div className="flex h-full w-full items-center justify-center border-r-1 border-solid border-black">
          {uploadImageSrc ? (
            <Image className="h-490 w-490" src={uploadImageSrc} alt="업로드한 이미지" width={490} height={490} />
          ) : (
            <BeforeUploadImage onClick={handleUploadImage} />
          )}
          {/* 업로드하는 인풋 */}
          <input className="hidden" type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} />
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
              <Image src={saleLabel} alt="세일 라벨" width={30} height={56} />
            </div>
            <div>
              <div className="status-label">게시용</div>
              <div className="status-label">판매용</div>
              <div className="status-label">나눔용</div>
            </div>
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
