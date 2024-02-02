'use client';

import Input from '@/components/Input/Input';
import PlusButtonIcon from '@/components/SvgComponents/PlusButtonIcon/PlusButtonIcon';
import { nicknameRules } from '@/constants/InputErrorRules';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import LinkInput from './LinkInput';

function Profile() {
  const [links, setLinks] = useState<{ id: number }[]>([{ id: 0 }]);
  const idCount = useRef(1); // useRef를 사용하여 idCount를 관리

  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
    },
  });

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
    links.map((link, index) => <LinkInput key={link.id} link={link} removeLink={removeLink} index={index} />);

  const renderAddButton = () =>
    links.length < 5 && (
      <button className="ml-90" onClick={addLink}>
        <PlusButtonIcon />
      </button>
    );

  return (
    <div className="h-475 w-571">
      <div className="relative ml-75 flex items-center gap-10">
        <Input type="file" id="image_file" accept="image/*" />
        <Input
          type="nickname"
          label="닉네임"
          id="name"
          placeholder="작가명을 써주세요"
          style="md-input relative"
          register={register('name', nicknameRules)}
          error={errors.name?.message}
        />
        <div className="absolute left-170 top-27 text-[#C90000]">*</div>
        <button className="primary-button duplication-button justify-center">중복확인</button>
      </div>
      <div className="mt-30 flex gap-33">
        <Input label="활동지역" id="zone" placeholder="이태원" style="sm-input" />
        <Input label="활동분야" id="field" placeholder="3D Art" style="sm-input" />
      </div>
      <div className="my-40 flex">
        <div className="flex h-40 w-90 items-center justify-start gap-20 whitespace-nowrap p-10 text-18">소개글</div>
        <textarea
          name="content"
          className="min-h-92 w-465 resize-none rounded-xs bg-gray-1 p-15 text-14 focus:outline-none "
          placeholder="사람들에게 나를 알릴 수 있는 글을 자유롭게 적어보세요."
        ></textarea>
      </div>
      <div>
        {renderLinks()}
        {renderAddButton()}
      </div>
    </div>
  );
}

export default Profile;
