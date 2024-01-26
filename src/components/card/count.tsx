import Image, { StaticImageData } from 'next/image';

interface CountProps {
  imageSource: StaticImageData;
  imageSourceString: string;
  count: number;
}

function Count({ imageSource, imageSourceString, count }: CountProps) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={imageSource}
        alt={`${imageSourceString === 'like' ? '좋아요 이미지' : imageSourceString === 'view' ? '조회수 이미지' : '댓글 이미지'}`}
        width={imageSourceString === 'view' ? 16 : 12}
        height={12}
      />
      <p className="text-white text-center text-10 font-normal">{count}</p>
    </div>
  );
}

export default Count;
