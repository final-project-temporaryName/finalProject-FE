'use client';

import PlusButtonIcon from '@/components/SvgComponents/PlusButtonIcon/PlusButtonIcon';
import UpLoadIcon from '@/components/SvgComponents/UpLoadIcon/UpLoadIcon';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';

interface Props {
  label?: string;
  id: string;
  type?: 'text' | 'nickname' | 'file';
  placeholder?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  style?: string;
  accept?: string;
}

function Input({ label, id, type = 'text', placeholder, error, register, style }: Props) {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const inputClasses = `${style} primary-input rounded-xs ${error ? 'error-class' : ''}`;
  const fileInputClasses = type === 'file' ? inputClasses : `${inputClasses} file-input-wrapper relative`;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imgFile = e.target.files[0];
    if (imgFile && imgFile.type.startsWith('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(imgFile);
    }
  };

  const handleImgDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    setProfileImage(null);
  };

  const renderLabel = () =>
    label && (
      <label htmlFor={id} className="flex h-40 w-90 items-center justify-start gap-20 whitespace-nowrap p-10 text-18">
        {label}
      </label>
    );

  const renderFileInput = () => (
    <div className="file-input-wrapper relative">
      {profileImage ? (
        <img src={profileImage} alt="Uploaded" className="h-95 w-95 rounded-full object-cover" />
      ) : (
        <div className="h-95 w-95"></div>
      )}
      <div
        className={`absolute inset-0 flex items-center justify-center ${profileImage ? 'opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-70' : 'opacity-100'}`}
      >
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="primary-input hidden-file-input"
          onChange={handleFileChange}
        />
        <label htmlFor={id} className="file-input-label">
          <div className="absolute right-25 top-20">
            <UpLoadIcon />
            <div className="mt-2 text-7">사진 가져오기</div>
          </div>
          {profileImage && (
            <button className="absolute right-0 top-0" onClick={handleImgDelete}>
              <PlusButtonIcon className="rotate-45" />
            </button>
          )}
        </label>
      </div>
    </div>
  );

  const renderInput = () => (
    <input type={type} id={id} placeholder={placeholder} className={inputClasses} {...register} />
  );

  const renderError = () => error && <p className="text-red">{error}</p>;

  return (
    <div className="flex-center">
      {renderLabel()}
      {type === 'file' ? renderFileInput() : renderInput()}
      {renderError()}
    </div>
  );
}

export default Input;
