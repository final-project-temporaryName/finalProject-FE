'use client';

import InfiniteText from '@/components/InfiniteText';
import Image from 'next/image';
import Link from 'next/link';
import logoImg from '../../../../public/assets/images/logo.png';

function NoAccess() {
  return (
    <div className="flex-col-center h-screen w-screen gap-40">
      <div className="flex-col-center gap-20">
        <div className="flex-col-center gap-8">
          <div className="text-26 font-bold">페이지를 찾을 수 없습니다 🧐</div>
          <p className="text-center text-14 font-medium">접근 권한이 없으므로 해당 페이지를 사용하실 수 없습니다.</p>
        </div>
        <div className="flex items-center gap-15">
          <Link href="/">
            <div className="rounded-md border-1 border-solid border-primary p-8 text-center text-14 font-medium text-primary">
              아트 톡톡 작품 <br />
              검색하러 가기
            </div>
          </Link>
          <Link href="/login">
            <div className="rounded-md border-1 border-solid border-primary p-8 text-center text-14 font-medium text-primary">
              아트 톡톡 <br />
              로그인하러 가기
            </div>
          </Link>
        </div>
        <Image src={logoImg} alt="아트 톡톡 로고" width={167} height={70} />
      </div>
      <InfiniteText text="Sorry Nod Found 👻 . this page is gone .  😥 Art Talk - Talk" />
    </div>
  );
}

export default NoAccess;
