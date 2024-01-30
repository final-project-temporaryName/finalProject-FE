import { StaticImageData } from 'next/image';

// 프로필 이미지 클릭 시 나오는 드롭다운
export interface ProfileImgDropDownProps {
  userName: string;
  profileImg: string | StaticImageData; // StaticImageData 타입은 추후 서버 연결되면 삭제 예정
  major: string;
}

// 검색창
export interface IForm {
  query?: string;
}
