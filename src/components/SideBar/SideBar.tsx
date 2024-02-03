import '@/styles/tailwind.css';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import EditIcon from './EditIcon';
import AddLinkIcon from './AddLinkIcon';
import defaultProfileImg from '../../../public/assets/images/youthLogo.png';
import { Button } from '@/components/Button';
import LinkIcon from './LinkIcon';

interface Links {
  title: string;
  url: string;
}

interface SideBarProps {
  name: string;
  role: string;
  description: string;
  likes: number;
  followers: number;
  image?: string | StaticImageData;
  links: Links[];
  displayStatus: 'myWork' | 'notMyWork';
}

function SideBar({ name, role, description, likes, followers, image, displayStatus, links }: SideBarProps) {
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
      <div className="absolute top-48 flex h-650 w-260 flex-col items-center rounded-[12px] bg-gray-1">
        <div className="mb-276 mt-89 flex h-650 w-192 flex-col items-center justify-center">
          {displayStatus === 'myWork' ? (
            <Link href="/editProfile" className="z-10 absolute right-13 top-15 h-32 w-32 rounded-full">
              <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-solid border-gray-4 bg-white">
                <EditIcon />
              </div>
            </Link>
          ) : null}
          <div className="flex-grow">
            <div className="items-center text-center text-18 font-semibold">{name}</div>
            <p className="text-12 text-gray-9">{role}</p>
          </div>
          <div className="mb-16 mt-16 rounded-sm bg-white p-16">
            <p className="text-12 text-gray-9">{description}</p>
          </div>
          <div className="mb-20 flex items-center justify-between gap-20">
            <span className="count">
              좋아요&nbsp;&nbsp;<span className="text-14 font-bold">{likes}</span>&nbsp;개
            </span>
            <div className="h-25 w-2 bg-white"></div>
            <span className="count">
              팔로워 &nbsp;&nbsp;<span className="text-14 font-bold">{followers}</span>&nbsp;명
            </span>
          </div>

          <div className="mb-20 flex flex-col items-start gap-20">
            {links &&
              links.map((link) => (
                <Link
                  className=" flex gap-2 text-14 font-semibold"
                  href={link.url}
                  key={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon />
                  {link.url.length > 21
                    ? link.title + ' ' + link.url.slice(0, 21) + '...'
                    : link.title + ' ' + link.url}
                </Link>
              ))}
          </div>
          {displayStatus === 'myWork' ? (
            <Link href="/editProfile" className="flex w-116 items-center gap-4 text-12 text-gray-9">
              <AddLinkIcon />
              {links.length < 5 ? '링크 추가하기' : '링크 수정하기'}
            </Link>
          ) : null}
          {displayStatus === 'notMyWork' ? (
            <Button destination="/chat" classname="primary-button nav-chat-button">
              1:1 대화걸기
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
