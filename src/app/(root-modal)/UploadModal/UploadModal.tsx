'use client';

import { postArtwork } from '@/api/upload/postArtwork';
import { postUploadImageFile } from '@/api/upload/postUploadImageFile';
import { Button } from '@/components/Button';
import '@/styles/tailwind.css';
import { ImageArtworkType } from '@/types/artworks';
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
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';

export default function UploadModal() {
  // states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadImageSources, setUploadImageSources] = useState<string[]>([]);
  const [label, setLabel] = useState<'PUBLIC' | 'SELLING' | 'FREE'>('PUBLIC');
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageOrder, setImageOrder] = useState<number[]>([]);
  const [currentImageData, setCurrentImageData] = useState<ImageArtworkType | undefined>();

  //hooks
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // handlers
  const onClickClose = () => {
    router.back();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    console.log({ imageIds: imageOrder, title, description, artworkStatus: label });
    postArtwork({ imageIds: imageOrder, title, description, artworkStatus: label });
  };

  const getImageData = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const { imageId, imageUrl } = await postUploadImageFile(formData);
    setImageOrder((prev): number[] => [...prev, imageId]);
    setCurrentImageData({ imageId, imageUrl });
  };

  // const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;
  //   const files = e.target.files;
  //   let imageUrlList = [...uploadImageSources];
  //   let imageOrderList = [...imageOrder];
  //   const fileList = Array.from(files);

  //   fileList.forEach((file) => {
  //     getImageData(file);
  //     if (!currentImageData) return;
  //     imageOrderList.push(currentImageData?.imageId);
  //     imageUrlList.push(currentImageData?.imageUrl);
  //   });

  //   if (imageUrlList.length > 10) {
  //     imageUrlList = imageUrlList.slice(0, 10);
  //     imageOrderList = imageOrder.slice(0, 10);
  //   }
  //   setUploadImageSources(imageUrlList);
  //   setImageOrder(imageOrderList);
  // };

  // 테스트용
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = e.target.files;
    let imageUrlList = [...uploadImageSources];
    const fileList = Array.from(files);

    fileList.forEach((file) => {
      const currentImageUrl = URL.createObjectURL(file);
      getImageData(file);
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
    setImageOrder([]);
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

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    const newUploadImageSources = [...uploadImageSources];
    newUploadImageSources.splice(source.index, 1);
    newUploadImageSources.splice(destination?.index, 0, draggableId);
    setUploadImageSources(newUploadImageSources);
  };

  return (
    <Modal.Container onClickClose={onClickClose} classname="modalContainer">
      <Modal.Header onClickClose={onClickClose} />
      <Modal.Body classname="flex h-full">
        <DragDropContext onDragEnd={onDragEnd}>
          {uploadImageSources.length ? (
            <div className="relative flex h-full w-3/5 flex-col justify-center border-r-1 border-solid border-black pb-31 pt-26">
              <div className="relative grid grid-cols-4 grid-rows-3/96 gap-18 px-29 py-25">
                {uploadImageSources.map((uploadImageSource, index) => {
                  return (
                    <Droppable droppableId={String(uuidv4())}>
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          <PreviewImage
                            uploadImageSource={uploadImageSource}
                            index={index}
                            openEnlargedImage={openEnlargedImage}
                            handleDeleteImage={handleDeleteImage}
                          />
                        </div>
                      )}
                    </Droppable>
                  );
                })}
              </div>
              <div className="flex justify-center gap-24">
                <DeleteAllImageButton onClick={handleDeleteAllImage} />
                {uploadImageSources.length !== 10 && <AddImageButton onClick={handleUploadImageButton} />}
              </div>
            </div>
          ) : (
            <div className="relative flex h-full w-3/5 items-center justify-center border-r-1 border-solid border-black">
              <BeforeUploadImage onClick={handleUploadImageButton} />
            </div>
          )}
        </DragDropContext>
        <input
          id="image"
          className="hidden"
          type="file"
          accept="image/*"
          multiple
          ref={inputRef}
          onChange={handleUploadImage}
        />
        <div className="relative flex h-full w-2/5 flex-col gap-18 p-20">
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
          <div className="flex items-center justify-between gap-18">
            <StatusLabelsGroup setStatusValue={setLabel} />
            <Button.Modal.Action
              disabled={!title || !description || description === '<p><br></p>' || uploadImageSources.length === 0}
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
            <div
              className="fixed left-0 top-0 z-infinite flex h-full w-full  bg-[#00000066] p-10"
              onClick={closeEnlargedImage}
            >
              <div className="relative flex h-full w-full items-center justify-center">
                <Image src={selectedImage} alt="작품 확대 이미지" width={750} height={900} />
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal.Container>
  );
}
