import { Button } from '@/components/Button';

function DeleteBox() {
  return (
    <div className="mt-120 flex h-152 w-auto gap-58 pl-111 pr-515">
      <span className="text-18">계정 탈퇴</span>
      <div>
        <Button
          destination="/deleteModal"
          classname="storage-button flex-center inline-block shrink-0 rounded-xs text-14"
        >
          영구탈퇴하기
        </Button>
        <span className="text-14 text-[#C90000]">! 탈퇴시 기존 링크 및 자료가 전부 소멸됩니다.</span>
      </div>
    </div>
  );
}

export default DeleteBox;
