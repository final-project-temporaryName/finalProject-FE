import Image from 'next/image';
import Close from '../../../../../public/assets/icons/Close.svg';
import { Draggable } from '@hello-pangea/dnd';

interface PreviewImageProps {
  uploadImageSource: string;
  index: number;
  openEnlargedImage: (uploadImageSource: string) => void;
  handleDeleteImage: (index: number) => void;
}

function PreviewImage({ uploadImageSource, index, openEnlargedImage, handleDeleteImage }: PreviewImageProps) {
  return (
    <Draggable draggableId={uploadImageSource} index={index} key={uploadImageSource}>
      {(provided) => (
        <div
          onDoubleClick={() => openEnlargedImage(uploadImageSource)}
          className="relative flex h-96 w-96 items-center bg-black"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Image
            className="h-full object-contain"
            src={uploadImageSource}
            alt="업로드한 이미지"
            width={96}
            height={96}
          />
          <button className="absolute left-9 top-9 flex h-20 w-20 items-center justify-center rounded-full bg-primary align-middle text-10 text-white">
            {index + 1}
          </button>
          <button
            onClick={() => handleDeleteImage(index)}
            className="absolute right-2 top-6 flex h-24 w-24 items-center justify-center"
          >
            <Close />
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default PreviewImage;
