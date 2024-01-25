import Card from '@/components/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      main
      <p>dev 브랜치 자동 배포 테스트용 텍스트입니다..!</p>
      <Card
        onSale={true}
        workTitle="작품 제목"
        authorName="작가 닉네임"
        likeCount={1}
        viewCount={1}
        commentCount={1}
        workImageUrl="https://images.unsplash.com/photo-1579273168855-c63546c129dd?q=80&w=1355&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        profileImageUrl="https://images.unsplash.com/photo-1579273168855-c63546c129dd?q=80&w=1355&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <p className="font-light">test</p>
    </main>
  );
}
