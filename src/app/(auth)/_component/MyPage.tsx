import CategoryButtonGroup from '@/components/Button/Category/CategoryButtonGroup';
import NavBar from '@/components/NavBar/NavBar';
import SideBar from '@/components/SideBar/SideBar';
import Card from '@/components/Card/Card';

function MyPage() {
  return (
    <>
      <NavBar />
      <SideBar id={2} displayStatus="myWork" />
      <main className="ml-330 mt-157">
        <CategoryButtonGroup />
        <Card
          saleStatus={'isFree'}
          workImageUrl="https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          workTitle="작품 제목"
          likeCount={1100}
          viewCount={999}
          commentCount={1}
          profileImageUrl="https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          authorName="작가이름"
          workUrl="/"
          authorUrl="/"
          displayStatus="myWork"
        />
      </main>
    </>
  );
}

export default MyPage;
