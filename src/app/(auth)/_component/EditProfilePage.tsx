import Profile from '@/components/Profile/Profile';
import NavBar from '@/components/NavBar/NavBar';
import { Button } from '@/components/Button';

function EditProfilePage() {
  return (
    <>
      <NavBar />
      <form className="mt-160 flex-col">
        <div className="flex-center">
          <Profile />
        </div>
        <div className="mt-60 flex h-40 w-full justify-end px-200">
          <Button style="primary-button storage-button">저장하기</Button>
        </div>
      </form>
    </>
  );
}

export default EditProfilePage;
