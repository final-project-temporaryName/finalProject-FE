'use client';

import { useStore } from '@/store';
import { useForm } from 'react-hook-form';
import SearchIcon from '../../../public/assets/icons/search.svg';

interface IForm {
  query?: string;
}

function SearchBar() {
  const { register, handleSubmit } = useForm();
  const { clearSearchWord, setSearchWord } = useStore((state) => ({
    setSearchWord: state.setSearchWord,
    clearSearchWord: state.clearSearchWord,
  }));

  const onValid = (data: IForm) => {
    if (!data.query) clearSearchWord();
    else setSearchWord(data.query.trim());
  };

  return (
    <form className="navSearchBar" onSubmit={handleSubmit(onValid)}>
      <input
        type="text"
        className="w-full flex-shrink text-14 text-gray-5"
        placeholder="‘감성도자기’ ‘수상작’ 을 검색해 보세요!"
        {...register('query')}
      />
      <button title="Submit" type="submit">
        <SearchIcon />
      </button>
    </form>
  );
}

export default SearchBar;
