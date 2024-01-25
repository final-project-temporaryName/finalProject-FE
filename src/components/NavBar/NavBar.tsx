import '@/styles/tailwind.css';
import Link from 'next/link';
import SearchBar from './SearchBar';
import NavigatorBox from './NavigatorBox';

export default function NavBar() {
  return (
    <nav className="navBar">
      <Link href={'/'}>
        <div className="flex-center h-36 w-215 border-1 border-solid border-black">로고</div>
      </Link>
      <SearchBar />
      <NavigatorBox />
    </nav>
  );
}
