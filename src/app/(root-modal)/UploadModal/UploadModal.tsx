'use client';

import PrimaryButton from '@/components/Button/PrimaryButton';
import '@/styles/tailwind.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import Modal from '../_components';
import BeforeUploadImage from './_components/BeforeUploadImage';
import TextEditor from './_components/TextEditor';
import { Button } from '@/components/Button';

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

// TODO: API 함수 붙이기
export default function UploadModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadImageSources, setUploadImageSources] = useState<string[]>([]);
  const [label, setLabel] = useState<{
    value: 'post' | 'sale' | 'free';
  }>({
    value: 'post',
  });
  // const [isPost, setIsPost] = useState(false);
  // const [isSale, setIsSale] = useState(false);
  // const [isFree, setIsFree] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  // const editorRef = useRef<Quill & { editor: QuillEditor }>(null);

  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSaveClick = () => {
    console.log(title, description);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    let imageUrlList = [...uploadImageSources];
    if (!files) return;
    const fileList = Array.from(files);

    fileList.forEach((file) => {
      const currentImageUrl = URL.createObjectURL(file);
      imageUrlList.push(currentImageUrl);
    });

    if (imageUrlList.length > 10) {
      imageUrlList = imageUrlList.slice(0, 10);
    }
    setUploadImageSources(imageUrlList);
  };

  const handleDeleteImage = (index: number) => {
    setUploadImageSources(uploadImageSources.filter((_, i) => i !== index));
  };

  const handleUploadImageButton = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current?.click();
  };

  // // 리액트 퀼 맞춤법 검사 기능 해제
  // useEffect(() => {
  //   editorRef.current?.editor.root.setAttribute('spellcheck', 'false');
  // }, []);

  return (
    <Modal.Container onClickClose={onClickClose} classname="modalContainer">
      <Modal.Header onClickClose={onClickClose} />
      <Modal.Body classname="grid grid-cols-2 h-full">
        <div className="relative flex h-full w-full items-center justify-center border-r-1 border-solid border-black">
          {uploadImageSources.length ? (
            <>
              {uploadImageSources.map((uploadImageSource, index) => {
                return (
                  <>
                    <Image
                      id={uploadImageSource}
                      className="object-contain"
                      src={uploadImageSource}
                      alt="업로드한 이미지"
                      width={490}
                      height={490}
                    />
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
                );
              })}
            </>
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
            className="h-39 w-300 p-10 placeholder:text-gray-5"
            value={title}
            type="text"
            spellCheck="false"
            placeholder="게시글 제목을 입력해주세요"
            onChange={handleTitleChange}
          />
          <TextEditor value={description} setValue={setDescription} />
          <div className="flex justify-end">
            <Button.Modal.Action
              disabled={!title && (!description || description === '<p><br></p>')}
              wrapperStyle=""
              buttonStyle="save-button"
              onClick={handleSaveClick}
            >
              저장하기
            </Button.Modal.Action>
          </div>
        </div>
      </Modal.Body>
    </Modal.Container>
  );
}
