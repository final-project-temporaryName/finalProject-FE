import '@/styles/tailwind.css';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import EditIcon from './EditIcon';
import LinkIcon from './LinkIcon';
import defaultProfileImg from '../../../public/assets/images/youthLogo.png';

interface SideBarProps {
  name: string;
  role: string;
  description: string;
  likes: number;
  followers: number;
  image?: string | StaticImageData;
}

function SideBar({ name, role, description, likes, followers, image }: SideBarProps) {
  return (
    <div className="fixed left-36 top-110 h-648 w-260 rounded-sm">
      <div className="absolute -top-10 left-1/2 z-first h-120 w-120 -translate-x-1/2 transform rounded-full">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-solid border-gray-4 bg-white hover:border-primary-3">
          <Image
            src={image ? image : defaultProfileImg}
            alt="프로필 이미지"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
      <Link href="/내정보수정" className="z-10 absolute right-13 top-60 h-32 w-32 rounded-full">
        <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-solid border-gray-4 bg-white">
          <EditIcon />
        </div>
      </Link>
      <div className="absolute top-48 flex h-600 w-260 flex-col items-center rounded-[12px] bg-gray-1">
        <div className="mb-276 mt-89 flex h-235 w-192 flex-col items-center justify-center">
          <div className="flex-grow">
            <div className="items-center text-center text-18 font-semibold">{name}</div>
            <p className="text-12 text-gray-9">{role}</p>
          </div>
          <div className="mb-16 mt-16 bg-white p-16">
            <p className="text-12 text-gray-9">{description}</p>
          </div>
          <div className="flex items-center justify-between gap-40">
            <span className="count">
              좋아요&nbsp;&nbsp;<span className="text-14 font-bold">{likes}</span>&nbsp;개
            </span>
            <span className="count">
              팔로워 &nbsp;&nbsp;<span className="text-14 font-bold">{followers}</span>&nbsp;명
            </span>
          </div>
          <Link href="/editProfile" className="mt-30 flex w-116 items-center gap-4 text-12 text-gray-9">
            <LinkIcon />
            외부링크연결
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
