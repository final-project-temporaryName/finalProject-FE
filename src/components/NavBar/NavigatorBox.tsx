import getUser from '@/api/users/getUser';
import '@/styles/tailwind.css';
import Link from 'next/link';
import { Button } from '../Button';
import MessageIcon from './MessageIcon';
import ProfileImgDropDown from './ProfileImgDropDown';

async function NavigatorBox() {
  const auth = {
    isLogin: true,
  };

  const id = 2;
  const data = await getUser(id);

  return (
    <div className="flex h-40 min-w-170 flex-shrink-0 items-center justify-between gap-40">
      <Link href={'/chatroom'}>
        <MessageIcon />
      </Link>
      {auth.isLogin && data && (
        <ProfileImgDropDown userName={data.nickname} profileImg={data.profileImageUrl} major={data.activityField} />
      )}
      {auth.isLogin ? (
        // 추후 작품 업로드 Link 수정 예정
        <Button destination="/upload" classname="primary-button nav-upload-button">
          작품 업로드
        </Button>
      ) : (
        <Button destination="/login" classname="primary-button nav-login-button">
          로그인
        </Button>
      )}
    </div>
  );
}

export default NavigatorBox;
