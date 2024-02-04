'use client';

import PrimaryButton from '@/components/Button/PrimaryButton';
import '@/styles/tailwind.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import UploadImage from '../../../../public/assets/icons/cloud_upload.svg';
import Modal from '../_components';
import Image from 'next/image';
import saleLable from '../../../../public/assets/images/OnSaleImage.png';

// document가 정의되기 전에 react-quill이 로드 되고, 정의되지 않은 document를 조작하려고 해서 에러가 발생
// 그래서 lazy-load하기 위해 dynamic import 사용
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

// TODO: 이미지에 따른 조건부 렌더링, API 함수 붙이기
export default function UploadModal() {
  const [description, setDescription] = useState('');
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

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'align',
    'image',
  ];

  const onClickClose = () => {
    router.back();
  };

  const onClickImageUpload = () => {
    console.log('사진 업로드 API 함수 호출');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value);
  };

  return (
    <Modal.Container onClickClose={onClickClose} classname="modalContainer">
      <Modal.Header onClickClose={onClickClose} />
      <Modal.Body classname="grid grid-cols-2 h-full">
        <div className="flex h-full w-full items-center justify-center border-r-1 border-solid border-black">
          <div className="flex h-138 w-213 flex-col items-center">
            {/* 이미지가 있을 시 디폴트 태그들 없애기 - 조건부 렌더링 */}
            <UploadImage className="mb-8" width={32} height={32} alt={'이미지 업로드'} />
            <p className="whitespace-nowrap text-[10px] text-gray-5">사람들에게 소개할 작품의 사진을 업로드 해주세요</p>
            <p className="mb-20 text-[10px] text-gray-5">최대 10장까지 가능해요</p>
            <button
              onClick={onClickImageUpload}
              className="flex h-50 w-213 items-center justify-center rounded-[200px] border-1 border-solid border-black py-13 hover:border-primary hover:bg-primary hover:text-white"
            >
              사진 가져오기
            </button>
          </div>
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
              <Image src={saleLable} alt="세일 라벨" width={30} height={56} />
            </div>
            <div>
              <div className="status-label">게시용</div>
              <div className="status-label">판매용</div>
              <div className="status-label">나눔용</div>
            </div>
          </div>
          <div className="h-333 w-355 p-10">
            {/* value, onChange, ref 추가 */}
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
