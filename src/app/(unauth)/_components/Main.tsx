import Comment from '@/components/Comment/Comment';

function Main() {
  return (
    // 현재는 테스트 페이지
    <main className="flex min-h-screen flex-col items-center justify-center gap-100 p-24">
      전체 피드 페이지
      <Comment likeCount={1100} commentCount={0} artworkStatus="SELLING" />
    </main>
  );
}

export default Main;
