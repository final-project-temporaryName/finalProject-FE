import { getArtwork } from '@/api/artwork/getArtwork';
import CommentContainer from '@/components/Comment/CommentContainer';
import SlideContainer from '@/components/SlideContainer/SlideContainer';
import DOMPurify from 'dompurify';
import Modal from '../../_components';

interface Props {
  onClickClose: () => void;
  artworkId: string;
}

async function ArtworkData({ onClickClose, artworkId }: Props) {
  const artwork = await getArtwork(artworkId);

  return (
    <>
      <Modal.ArtHeader
        onClickClose={onClickClose}
        artistName={artwork?.artistName}
        artistProfileImageUrl={artwork?.artistProfileImageUrl}
        createdAt={artwork?.updatedAt ? artwork?.updatedAt : artwork?.createdAt}
      />
      <Modal.Body classname="h-full overflow-y-scroll">
        <div className="p-10 text-[#8f8f8f]">
          {artwork?.artworkImageResponse?.length && (
            <SlideContainer artworkImageResponse={artwork?.artworkImageResponse} />
          )}
          <div className={`flex flex-col gap-20 p-10 pt-20 ${artwork?.artworkImageResponse?.length || `min-h-660`}`}>
            <p>{artwork?.title}</p>
            {artwork?.description && (
              <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(artwork?.description) }}
                className={`min-h-65`}
              ></div>
            )}
          </div>
        </div>
        <div className="sticky bottom-0 right-0 z-beforeInfinite">
          <CommentContainer likeCount={1100} commentCount={3} artworkStatus="SELLING" />
        </div>
      </Modal.Body>
    </>
  );
}

export default ArtworkData;
