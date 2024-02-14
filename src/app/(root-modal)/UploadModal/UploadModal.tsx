'use client';

import { postArtwork } from '@/api/upload/postArtwork';
import { Button } from '@/components/Button';
import Quit from '@/components/SlideContainer/Quit';
import '@/styles/tailwind.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import SellingLabelImg from '../../../../public/assets/icons/saleFlag.svg';
import ShareLabelImg from '../../../../public/assets/icons/shareFlag.svg';
import Modal from '../_components';
import AddImageButton from './_components/AddImageButton';
import BeforeUploadImage from './_components/BeforeUploadImage';
import DeleteAllImageButton from './_components/DeleteAllImageButton';
import PreviewImage from './_components/PreviewImage';
import StatusLabelsGroup from './_components/StatusLabelsGroup';
import TextEditor from './_components/TextEditor';

export default function UploadModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadImageSources, setUploadImageSources] = useState<string[]>([]);
  const [label, setLabel] = useState<'PUBLIC' | 'SELLING' | 'FREE'>('PUBLIC');
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageOrder, setImageOrder] = useState<number[]>([1, 2]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    postArtwork({ imageIds: imageOrder, title, description, artworkStatus: label });
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = e.target.files;
    let imageUrlList = [...uploadImageSources];
    const fileList = Array.from(files);
    // const formData = new FormData();

    fileList.forEach((file) => {
      const currentImageUrl = URL.createObjectURL(file);
      // const {id, src} = await postUploadImageFile(file)
      // TODO: api image 1개 api 추가 (currentImageUrl를 담아서 사용)
      // 파일 객체(file) 담기
      // formData.append('file', file);
      // setImageOrder
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

  const handleDeleteAllImage = () => {
    setUploadImageSources([]);
  };

  const handleUploadImageButton = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current?.click();
  };

  const openEnlargedImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImage(true);
  };

  const closeEnlargedImage = () => {
    setSelectedImage('');
    setShowImage(false);
  };

  return (
    <Modal.Container onClickClose={onClickClose} classname="modalContainer">
      <Modal.Header onClickClose={onClickClose} />
      <Modal.Body classname="grid grid-cols-2 h-full">
        {uploadImageSources.length ? (
          <div className="relative flex h-full w-full justify-center border-r-1 border-solid border-black pb-31 pt-26">
            <div className="relative grid grid-cols-4 grid-rows-3 gap-18 px-29 py-25">
              {uploadImageSources.map((uploadImageSource, index) => {
                return (
                  <PreviewImage
                    uploadImageSource={uploadImageSource}
                    index={index}
                    openEnlargedImage={openEnlargedImage}
                    handleDeleteImage={handleDeleteImage}
                  />
                );
              })}
              <div className="absolute bottom-4 left-88 flex gap-24">
                <DeleteAllImageButton onClick={handleDeleteAllImage} />
                {uploadImageSources.length !== 10 && <AddImageButton onClick={handleUploadImageButton} />}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative flex h-full w-full items-center justify-center border-r-1 border-solid border-black">
            <BeforeUploadImage onClick={handleUploadImageButton} />
          </div>
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
          <div className="flex justify-between gap-40">
            <StatusLabelsGroup setStatusValue={setLabel} />
            <Button.Modal.Action
              disabled={!title || !description || description === '<p><br></p>'}
              wrapperStyle=""
              buttonStyle="save-button"
              onClick={handleSubmit}
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
          </div>
        </div>
        {showImage && (
          <>
            <div className="fixed left-0 top-0 z-infinite h-full w-full bg-black opacity-65"></div>
            <div
              className="!important fixed left-0 top-0 z-infinite flex h-full w-full items-center justify-center"
              onClick={closeEnlargedImage}
            >
              <div className="relative">
                <button className="absolute -right-10 -top-10 z-infinite" onClick={closeEnlargedImage}>
                  <Quit />
                </button>
                <Image src={selectedImage} alt="작품 확대 이미지" width={750} height={900} />
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal.Container>
  );
}
