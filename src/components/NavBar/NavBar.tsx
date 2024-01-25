import Image from 'next/image';
import Link from 'next/link';
import '@/styles/tailwind.css';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <nav className="navBar">
      <Link href={'/'}>
        <div className="flex-center h-36 w-215 border-1 border-solid border-black">로고</div>
      </Link>
      <SearchBar />
    </nav>
  );
}
