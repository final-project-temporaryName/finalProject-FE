'use client';

import { deleteArtwork } from '@/api/artwork/deleteArtwork';
import { Button } from '@/components/Button';
import { useStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Modal from '../_components';

export default function AskForDeleteModal() {
  const { clearModal, clickedArtworkId } = useStore((state) => ({
    clearModal: state.clearModal,
    clickedArtworkId: state.clickedArtworkId,
  }));

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteArtwork,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myArtworks', '전체'] });
      queryClient.invalidateQueries({ queryKey: ['myArtworks', '판매중'] });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(
      { artworkId: clickedArtworkId },
      {
        onSuccess: () => {
          toast.success('작품 삭제 성공! 🎉');
          clearModal();
        },
      },
    );
  };

  return (
    <Modal.Container type={'back'} classname="askForSignupContainer">
      <Modal.Body classname="flex flex-col-center gap-30">
        <div>해당 게시물을 삭제하시겠습니다?</div>
        <div className="flex gap-15">
          <Button
            classname="primary-button h-35 w-80 text-black border-primary bg-white hover:bg-primary hover:text-white"
            isLink={false}
            onClick={handleDelete}
          >
            확인
          </Button>
          <Button
            classname="primary-button h-35 w-80 text-black border-primary bg-white hover:bg-primary hover:text-white"
            isLink={false}
            onClick={clearModal}
          >
            취소
          </Button>
        </div>
      </Modal.Body>
    </Modal.Container>
  );
}
