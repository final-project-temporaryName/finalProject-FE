'use client';

import { Button } from '@/components/Button';
import Input from '@/components/Input/Input';
import BinIcon from '@/components/SvgComponents/BinIcon/BinIcon';
import PlusButtonIcon from '@/components/SvgComponents/PlusButtonIcon/PlusButtonIcon';
import CheckIcon from '@/components/SvgComponents/CheckIcon/CheckIcon';
import { useRef, useState } from 'react';
import LinkInput from './LinkInput';

function Profile() {
  const [links, setLinks] = useState<{ id: number }[]>([]);

  const idCount = useRef(0); // useRef를 사용하여 idCount를 관리

  const addLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (links.length < 5) {
      const newLink = {
        id: idCount.current++, // current 속성을 사용하여 idCount 값을 가져옴
      };
      setLinks([...links, newLink]);
    }
  };

  const removeLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <div className="h-475 w-571">
      <div className="relative ml-75 flex items-center gap-10">
        <Input type="file" id="image_file" accept="image/*" />
        <Input type="nickname" label="닉네임" id="name" placeholder="작가명을 써주세요" style="md-input relative" />
        <div className="absolute left-100 text-[#C90000]">*</div>
        <Button style="primary-button duplication-button justify-center">중복확인</Button>
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
        <div className="flex-center mb-10 gap-24">
          <Input label="외부링크" id="link" placeholder="Behance" style="xs-input" />
          <Input id="link" placeholder="http://behance.com" style="lg-input" />
          <BinIcon />
        </div>

        <div>
          {links.map((link) => (
            <LinkInput key={link.id} link={link} removeLink={removeLink} />
          ))}

          {links.length < 4 ? (
            <button className="ml-90" onClick={addLink}>
              <PlusButtonIcon />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Profile;
