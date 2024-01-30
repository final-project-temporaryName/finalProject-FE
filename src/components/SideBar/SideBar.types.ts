import { StaticImageData } from 'next/image';

export interface SideBarProps {
  name: string;
  role: string;
  description: string;
  likes: number;
  followers: number;
  image?: string | StaticImageData;
}
