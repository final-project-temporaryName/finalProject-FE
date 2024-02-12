'use client';

import { Button } from '@/components/Button';
import '@/styles/tailwind.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import SellingLabelImg from '../../../../public/assets/icons/saleFlag.svg';
import ShareLabelImg from '../../../../public/assets/icons/shareFlag.svg';
import Modal from '../_components';
import BeforeUploadImage from './_components/BeforeUploadImage';
import StatusLabelsGroup from './_components/StatusLabelsGroup';
import TextEditor from './_components/TextEditor';

// TODO: API 함수 붙이기
export default function UploadModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadImageSources, setUploadImageSources] = useState<string[]>([]);
  const [label, setLabel] = useState<'PUBLIC' | 'SELLING' | 'FREE'>('PUBLIC');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSaveClick = () => {
    console.log(title, description, label);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = e.target.files;
    let imageUrlList = [...uploadImageSources];
    const fileList = Array.from(files);

    fileList.forEach((file) => {
      const currentImageUrl = URL.createObjectURL(file);
      // TODO: api image 1개 api 추가 (currentImageUrl를 담아서 사용, mutate)
      imageUrlList.push(currentImageUrl);
    });

    if (imageUrlList.length > 10) {
      imageUrlList = imageUrlList.slice(0, 10);
    }
    setUploadImageSources(imageUrlList);
  };

  // TODO: api image delete 로직 추가
  const handleDeleteImage = (index: number) => {
    setUploadImageSources(uploadImageSources.filter((_, i) => i !== index));
  };

  const handleUploadImageButton = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current?.click();
  };

  return (
    <Modal.Container onClickClose={onClickClose} classname="modalContainer">
      <Modal.Header onClickClose={onClickClose} />
      <Modal.Body classname="grid grid-cols-2 h-full">
        <div className="relative flex h-full w-full items-center justify-center border-r-1 border-solid border-black">
          {uploadImageSources.length ? (
            <div className="relative grid grid-cols-3 grid-rows-3 gap-18 px-29 py-26">
              {uploadImageSources.map((uploadImageSource, index) => {
                return (
                  <div key={uploadImageSource} className="relative flex h-96 w-96 items-center bg-black">
                    <Image
                      className="object-contain"
                      src={uploadImageSource}
                      alt="업로드한 이미지"
                      width={96}
                      height={96}
                    />
                    <button className="absolute right-5 top-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white">
                      {index + 1}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <BeforeUploadImage onClick={handleUploadImageButton} />
          )}
          <input
            id="image"
            className="hidden"
            type="file"
            accept="image/*"
            multiple
            ref={inputRef}
            onChange={handleUploadImage}
          />
        </div>
        <div className="relative flex h-full w-full flex-col gap-18 p-20">
          <input
            id="title"
            className="h-39 w-300 p-10 text-14 font-semibold placeholder:text-gray-5"
            value={title}
            type="text"
            spellCheck="false"
            placeholder="게시글 제목을 입력해주세요"
            onChange={handleTitleChange}
          />
          <TextEditor value={description} setValue={setDescription} />
          <div className="flex justify-end">
            <Button.Modal.Action
              disabled={!title || !description || description === '<p><br></p>'}
              wrapperStyle=""
              buttonStyle="save-button"
              onClick={handleSaveClick}
            >
              게시하기
            </Button.Modal.Action>
          </div>
          <div className="flex-col-center absolute right-20 top-0 gap-25">
            <div>
              {label === 'PUBLIC' && <div className="h-57"></div>}
              {label === 'SELLING' && <SellingLabelImg />}
              {label === 'FREE' && <ShareLabelImg />}
            </div>
            <StatusLabelsGroup setStatusValue={setLabel} />
          </div>
        </div>
      </Modal.Body>
    </Modal.Container>
  );
}
