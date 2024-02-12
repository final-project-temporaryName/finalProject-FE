import Image from 'next/image';
import defaultProfileImg from '../../../public/assets/images/youthLogo.png';

function ProfileIcon() {
  return (
    <div>
      <Image src={defaultProfileImg} alt="기본 프로필 이미지" className="h-full w-full rounded-full object-cover" />
    </div>
  );
}

export default ProfileIcon;
