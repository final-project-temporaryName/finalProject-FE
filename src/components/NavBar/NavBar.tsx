import '@/styles/tailwind.css';
import Link from 'next/link';
import NavigatorBox from './NavigatorBox';
import SearchBar from './SearchBar';
import Image from 'next/image';
import logoImg from '../../../public/assets/images/youthLogo.png';

interface NavBarProps {
  id: number;
}

function NavBar({ id }: NavBarProps) {
  return (
    <nav className="navBar">
      <Link href={'/'} className="shrink-0">
        <Image src={logoImg} alt="청춘예찬 로고" width={85} height={85} />
      </Link>
      <SearchBar />
      <NavigatorBox id={id} />
    </nav>
  );
}

export default NavBar;
