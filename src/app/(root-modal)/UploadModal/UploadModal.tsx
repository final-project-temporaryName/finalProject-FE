'use client';

import { postArtwork } from '@/api/upload/postArtwork';
import { postUploadImageFile } from '@/api/upload/postUploadImageFile';
import { getUser } from '@/api/users/getUser';
import { Button } from '@/components/Button';
import { useStore } from '@/store';
import '@/styles/tailwind.css';
import { PostCardRequestType } from '@/types/cards';
import { ImageArtworkType } from '@/types/image';
import { UserType } from '@/types/users';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRef, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import SellingLabelImg from '../../../../public/assets/icons/saleFlag.svg';
import ShareLabelImg from '../../../../public/assets/icons/shareFlag.svg';
import Modal from '../_components';
import AddImageButton from './_components/AddImageButton';
import BeforeUploadImage from './_components/BeforeUploadImage';
import DeleteAllImageButton from './_components/DeleteAllImageButton';
import PreviewImage from './_components/PreviewImage';
import StatusLabelsGroup from './_components/StatusLabelsGroup';
import TextEditor from './_components/TextEditor';
import WarningForBigImage from '../WarningForBigImage/WarningForBigImage';

export default function UploadModal() {
  // states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadImageSources, setUploadImageSources] = useState<string[]>([]);
  const [label, setLabel] = useState<'PUBLIC' | 'SELLING' | 'FREE'>('PUBLIC');
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageOrder, setImageOrder] = useState<number[]>([]);

  const { modals, clearModal, showModal, userId } = useStore((state) => ({
    modals: state.modals,
    clearModal: state.clearModal,
    showModal: state.showModal,
    userId: state.userId,
  }));

  const { data: userData } = useQuery<UserType>({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
  });

  //hooks
  const inputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const uploadPostMutation = useMutation({
    mutationFn: (newPost: PostCardRequestType) => postArtwork(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArtworks'] });
      queryClient.invalidateQueries({ queryKey: ['myArtworks', '전체'] });
      queryClient.invalidateQueries({ queryKey: ['myArtworks', '판매중'] });
    },
    onError: () => {
      console.error('err');
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    const newPost = { imageIds: imageOrder, title, description, artworkStatus: label };
    uploadPostMutation.mutate(newPost, {
      onSuccess: (res) => {
        if (res?.data === 'fail') {
          toast.error('작품 업로드 실패!');
        } else if (res?.data.message === 'The given id must not be null') {
          toast.error('작품 업로드 실패!');
        } else {
          toast.success('작품 업로드 성공! 🎉');

          clearModal();
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  const getImageData = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { imageId, imageUrl } = await postUploadImageFile(formData);
      return { imageId, imageUrl };
    } catch (error) {
      console.error('Error occurred while uploading image file:', error);
      throw error;
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = e.target.files;
    let imageUrlList = [...uploadImageSources];
    let imageOrderList = [...imageOrder];
    const fileList = Array.from(files);

    for (const file of fileList) {
      try {
        const imageData = await getImageData(file);

        imageOrderList.push(imageData.imageId);
        imageUrlList.push(imageData.imageUrl);
      } catch (error) {
        console.error('Error occurred while getting image data:', error);
      }
    }

    if (imageUrlList.length > 10) {
      imageUrlList = imageUrlList.slice(0, 10);
      imageOrderList = imageOrderList.slice(0, 10);
    }

    for (const id of imageOrderList) {
      if (typeof id !== 'number') {
        showModal('warningForBigImageModal');
        imageOrderList = [...imageOrder];
        imageUrlList = [...uploadImageSources];
        e.target.value = '';
        break;
      }
    }

    setUploadImageSources(imageUrlList);
    setImageOrder(imageOrderList);
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
    <Modal.Container classname="modalContainer tablet-modalContainer">
      <Modal.Header nickname={userData?.nickname} profileImageUrl={userData?.profileImageUrl} />
      <Modal.Body classname="flex h-full md:flex-col">
        <DragDropContext onDragEnd={onDragEnd}>
          {uploadImageSources.length ? (
            <div className="relative flex h-full w-3/5 flex-col justify-center border-r-1 border-solid border-black pb-31 pt-26 md:w-full">
              <div className="relative grid grid-cols-4 grid-rows-3/96 gap-18 px-29 py-25">
                {uploadImageSources.map((uploadImageSource, index) => {
                  return (
                    <Droppable key={uploadImageSource} droppableId={String(uuidv4())}>
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
            <div className="relative flex h-full w-3/5 items-center justify-center border-r-1 border-solid border-black md:w-full">
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
        <div className="md: relative flex h-full w-2/5 flex-col gap-18 border-solid p-15 md:w-full md:border-t-2 md:border-gray-3 md:pt-20">
          <input
            id="title"
            className={`h-39 ${label === 'PUBLIC' ? 'w-full' : 'w-290'} rounded-xs border-1 border-solid border-[#ccc] p-10 text-14 font-semibold placeholder:text-gray-5`}
            value={title}
            type="text"
            spellCheck="false"
            placeholder="게시글 제목을 입력해주세요"
            onChange={handleTitleChange}
          />
          <TextEditor value={description} setValue={setDescription} />
          <div className="flex items-center justify-between gap-18 md:mt-80">
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
      {modals[modals.length - 1] === 'warningForBigImageModal' && <WarningForBigImage />}
    </Modal.Container>
  );
}
