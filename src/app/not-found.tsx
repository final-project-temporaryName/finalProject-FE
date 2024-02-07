import InfiniteText from '@/components/InfiniteText';
import Image from 'next/image';
import Link from 'next/link';
import logoImg from '../../public/assets/images/logo.png';

function NotFound() {
  return (
    <div className="flex-col-center h-screen w-screen gap-40">
      <div className="flex-col-center gap-20">
        <div className="flex-col-center gap-8">
          <div className="text-26 font-bold">페이지를 찾을 수 없습니다 🧐</div>
          <p className="text-center text-14 font-medium">
            찾으시려는 주소가 잘못입력되었거나 <br />
            주소 변경 혹은 삭제로 해당 페이지를 사용하실 수 없습니다.
          </p>
        </div>
        <Link href="/">
          <span className="text-14 font-medium text-primary underline">아트 톡톡 작품 검색하러 가기</span>
        </Link>
        <Image src={logoImg} alt="아트 톡톡 로고" width={167} height={70} />
      </div>
      <InfiniteText text="Sorry Nod Found 👻 . this page is gone .  😥 Art Talk - Talk" />
    </div>
  );
}

export default NotFound;
