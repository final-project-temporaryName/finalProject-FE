import getUser from '@/api/users/getUser';
import '@/styles/tailwind.css';
import Link from 'next/link';
import MessageIcon from './MessageIcon';
import NavigatorBoxButton from './NavigatorBoxButton';
import ProfileImgDropDown from './ProfileImgDropDown';

async function NavigatorBox() {
  const auth = {
    isLogin: true,
  };

  const id = 13;
  const data = await getUser(id);

  return (
    <div className="flex h-40 min-w-170 flex-shrink-0 items-center justify-between gap-40">
      <Link href={'/chatroom'}>
        <MessageIcon />
      </Link>
      {auth.isLogin && (
        <ProfileImgDropDown userName={data.nickname} profileImg={data.profileImageUrl} major={data.activityField} />
      )}
      <NavigatorBoxButton isLogin={auth.isLogin} />
    </div>
  );
}

export default NavigatorBox;
