'use client';

import { useForm } from 'react-hook-form';
import SearchIcon from '../../../public/assets/icons/search.svg';

export default function SearchBar() {
  const { handleSubmit } = useForm();

  return (
    <form className="navSearchBar">
      <input type="text" className="flex-1" />
      <SearchIcon />
    </form>
  );
}
