import CategoryButtonGroup from '@/components/Button/Category/CategoryButtonGroup';
import NavBar from '@/components/NavBar/NavBar';
import SideBar from '@/components/SideBar/SideBar';
import profileImg from '../../../../public/assets/images/하니.jpg';
import Card from '@/components/Card/Card';

function MyPage() {
  const MY_PROFILE = {
    name: '하니',
    role: '제품디자인 학부생/ 3D Modeling',
    description: '캐릭터 드로잉 및 3D 목업 제품 작업합니다. (졸작 판매 중)',
    likes: 230,
    followers: 20,
    image: profileImg,
  };

  return (
    <>
      <NavBar />
      <SideBar
        name={MY_PROFILE.name}
        role={MY_PROFILE.role}
        description={MY_PROFILE.description}
        likes={MY_PROFILE.likes}
        followers={MY_PROFILE.followers}
        image={MY_PROFILE.image}
      />
      <main className="absolute left-330 top-157">
        <CategoryButtonGroup />
        <Card
          status={'isFree'}
          workImageUrl="https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          workTitle="작품 제목"
          likeCount={1100}
          viewCount={999}
          commentCount={1}
          profileImageUrl="https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          authorName="작가이름"
          workUrl="/"
          authorUrl="/"
        />
      </main>
    </>
  );
}

export default MyPage;
