import CategoryButtonGroup from '@/components/Button/Category/CategoryButtonGroup';
import NavBar from '@/components/NavBar/NavBar';
import SideBar from '@/components/SideBar/SideBar';
import profileImg from '../../../../public/assets/images/하니.jpg';

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
        {/* CardSection */}
      </main>
    </>
  );
}

export default MyPage;
