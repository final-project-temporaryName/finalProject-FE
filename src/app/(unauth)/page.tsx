import NavBar from '@/components/NavBar/NavBar';
import { Button } from '@/components/button';
import CategoryButtonGroup from '@/components/button/category/categoryButtonGroup';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-100 p-24">
      <NavBar />
      메인페이지
      <div className="flex-center">
        <CategoryButtonGroup />
      </div>
      <Button destination="/" style="primary-button upload-button">
        작품 업로드
      </Button>
    </main>
  );
}
