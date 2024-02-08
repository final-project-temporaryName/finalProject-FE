'use client';

import { useStore } from '@/store';
import { useForm, useWatch } from 'react-hook-form';
import SearchIcon from '../../../public/assets/icons/search.svg';
import CancelIcon from '../../../public/assets/icons/CancelIcon.svg';
import { MouseEvent, useState } from 'react';

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
        className="w-full flex-shrink text-14 text-gray-5"
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
