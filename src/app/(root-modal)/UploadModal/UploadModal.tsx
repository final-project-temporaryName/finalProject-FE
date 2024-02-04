'use client';

import '@/styles/tailwind.css';
import { useRouter } from 'next/navigation';
import UploadImage from '../../../../public/assets/icons/cloud_upload.svg';
import Modal from '../_components';

// TODO: 이미지에 따른 조건부 렌더링, API 함수 붙이기
export default function UploadModal() {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  const onClickImageUpload = () => {
    console.log('사진 업로드 API 함수 호출');
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
        <div className="h-full w-full p-20">
          <input
            className="h-39 w-300 p-10 placeholder:text-gray-5"
            type="text"
            spellCheck="false"
            placeholder="게시글 제목을 입력해주세요"
          />
        </div>
      </Modal.Body>
    </Modal.Container>
  );
}
