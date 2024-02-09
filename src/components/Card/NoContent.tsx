import { Button } from '@/components/Button';

function NoContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <p className="text-20 text-primary-3">사람들에게 소개할 작품을 올려보세요</p>
      <Button destination="/upload" classname="primary-button upload-button">
        작품 업로드
      </Button>
    </div>
  );
}

export default NoContent;
