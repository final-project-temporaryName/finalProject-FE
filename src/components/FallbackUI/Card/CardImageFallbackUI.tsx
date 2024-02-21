interface Props {
  type: 'main' | 'mypage' | 'artist';
}

export default function CardImageFallbackUI({ type }: Props) {
  return (
    <div className="flex animate-pulse flex-col gap-5">
      <div className="h-280 min-w-280 rounded-md bg-gray-2"></div>
      {type === 'main' && <div className="h-48 w-280 rounded-md bg-gray-2"></div>}
    </div>
  );
}
