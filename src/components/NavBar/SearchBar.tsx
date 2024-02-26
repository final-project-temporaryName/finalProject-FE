'use client';

import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import CancelIcon from '../../../public/assets/icons/CancelIcon.svg';
import SearchIcon from '../../../public/assets/icons/search.svg';

interface IForm {
  query?: string;
}

function SearchBar() {
  const { register, handleSubmit, reset, control } = useForm();
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const { clearSearchWord, setSearchWord } = useStore((state) => ({
    setSearchWord: state.setSearchWord,
    clearSearchWord: state.clearSearchWord,
  }));

  const router = useRouter();

  const watchedValue = useWatch({
    control,
    name: 'query',
    defaultValue: '',
  });

  const onValid = (data: IForm) => {
    if (!data.query) clearSearchWord();
    else {
      setSearchWord(data.query.trim());
      setIsSearchClicked(true);
      router.push(`search/${data.query}`);
    }
  };

  const handleClearClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    clearSearchWord();
    setIsSearchClicked(false);
  };

  return (
    <form className="navSearchBar" onSubmit={handleSubmit(onValid)}>
      <input
        type="text"
        className="w-full flex-shrink bg-gray-1 text-14 text-gray-8 placeholder:text-gray-5"
        placeholder="‘감성도자기’ ‘수상작’ 을 검색해 보세요!"
        {...register('query')}
      />
      {isSearchClicked && watchedValue && (
        <button type="button" onClick={(e) => handleClearClick(e)} title="cancel">
          <CancelIcon />
        </button>
      )}
      <button title="Submit" type="submit">
        <SearchIcon />
      </button>
    </form>
  );
}

export default SearchBar;
