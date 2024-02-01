import Profile from '@/components/Profile/Profile';
import NavBar from '@/components/NavBar/NavBar';
import { Button } from '@/components/Button';

function EditProfilePage() {
  return (
    <>
      <NavBar />
      <form className="relative mt-160 flex-col">
        <div className="flex-center">
          <Profile />
        </div>
        <div className="absolute right-200 mt-100">
          <Button style="primary-button storage-button">저장하기</Button>
        </div>
      </form>
    </>
  );
}

export default EditProfilePage;
