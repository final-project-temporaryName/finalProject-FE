import { Button } from '@/components/Button';
import Input from '@/components/Input/Input';
import NavBar from '@/components/NavBar/NavBar';

function EditProfilePage() {
  return (
    <>
      <NavBar />
      <main className="absolute top-150">
        <form className="h-40 w-280">
          <Input label="이름" id="name" placeholder="홍길동" />
          <Button style="primary-button storage-button">저장</Button>
        </form>
      </main>
    </>
  );
}

export default EditProfilePage;
