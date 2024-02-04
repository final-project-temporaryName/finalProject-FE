'use client';

import Input from '@/components/Input/Input';
import LinkInput from '@/components/Input/LinkInput';
import NavBar from '@/components/NavBar/NavBar';
import PlusButtonIcon from '@/components/SvgComponents/PlusButtonIcon';
import { nicknameRules } from '@/constants/InputErrorRules';
import axios from '@/lib/axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  nickname: string;
  profileImageUrl: string;
  activityArea: string;
  activityField: string;
  description: string;
  links?: { title: string; url: string }[];
}

function EditProfilePage() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleImageUpload = (url: string) => {
    setUploadedImageUrl(url);
  };

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [links, setLinks] = useState<{ id: number }[]>([{ id: 0 }]);
  const idCount = useRef(1); // useRef를 사용하여 idCount를 관리

  const onSubmit = async (data: FormData) => {
    try {
      data.profileImageUrl = uploadedImageUrl;

      // PUT
      const response = await axios.put('/users/4', data);
      console.log(response.data);
      console.log(111111);
    } catch (err) {
      console.error(err);
    }
  };

  const addLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (links.length < 5) {
      setLinks((prevLinks) => [...prevLinks, { id: idCount.current++ }]);
    }
  };

  const removeLink = (id: number) => {
    setLinks((prevLinks) =>
      prevLinks.length === 1 ? [{ id: idCount.current++ }] : prevLinks.filter((link) => link.id !== id),
    );
  };

  const renderLinks = () =>
    links.map((link, index) => (
      <LinkInput key={link.id} link={link} removeLink={removeLink} index={index} register={register} watch={watch} />
    ));

  const renderAddButton = () =>
    links.length < 5 && (
      <button className="ml-90" onClick={addLink}>
        <PlusButtonIcon />
      </button>
    );

  return (
    <>
      <NavBar />
      <form className="relative mt-160 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-center">
          <div className="h-475 w-571">
            <div className="relative ml-75 flex items-center gap-10">
              <Input
                type="file"
                id="image_file"
                accept="image/*"
                register={register('profileImageUrl')}
                error={errors.profileImageUrl?.message}
                onImageUpload={handleImageUpload}
              />
              <Input
                type="nickname"
                label="닉네임"
                id="name"
                placeholder="작가명을 써주세요"
                style="md-input relative"
                register={register('nickname', nicknameRules)}
                error={errors.nickname?.message}
              />
              <div className="absolute left-170 top-27 text-[#C90000]">*</div>
              <button className="primary-button duplication-button justify-center">중복확인</button>
            </div>
            <div className="mt-30 flex gap-33">
              <Input
                label="활동지역"
                id="zone"
                placeholder="이태원"
                style="sm-input"
                register={register('activityArea')}
                error={errors.activityArea?.message}
              />
              <Input
                label="활동분야"
                id="field"
                placeholder="3D Art"
                style="sm-input"
                register={register('activityField')}
                error={errors.activityField?.message}
              />
            </div>
            <div className="my-40 flex">
              <div className="flex h-40 w-90 items-center justify-start gap-20 whitespace-nowrap p-10 text-18">
                소개글
              </div>
              <textarea
                className="min-h-92 w-465 resize-none rounded-xs bg-gray-1 p-15 text-14 focus:outline-none "
                placeholder="사람들에게 나를 알릴 수 있는 글을 자유롭게 적어보세요."
                {...register('description')}
              ></textarea>
            </div>
            <div>
              {renderLinks()}
              {renderAddButton()}
            </div>
          </div>
        </div>
        <div className="absolute right-200 mt-100">
          <button type="submit" className="primary-button storage-button">
            저장하기
          </button>
        </div>
      </form>
    </>
  );
}

export default EditProfilePage;
