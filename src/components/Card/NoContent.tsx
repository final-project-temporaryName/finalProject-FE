import UploadModal from '@/app/(root-modal)/UploadModal/UploadModal';
import { Button } from '@/components/Button';
import { useStore } from '@/store';

function NoContent() {
  const { modals, showModal } = useStore((state) => ({
    modals: state.modals,
    showModal: state.showModal,
  }));

  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <p className="text-20 text-primary">사람들에게 소개할 작품을 올려보세요</p>
      <Button isLink={false} classname="primary-button upload-button" onClick={() => showModal('uploadModal')}>
        작품 업로드
      </Button>
      {modals.includes('uploadModal') && <UploadModal />}
    </div>
  );
}

export default NoContent;
