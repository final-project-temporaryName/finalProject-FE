'use client';

import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useMemo } from 'react';
import './TextEditor.css';

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface Props {
  value?: string;
  setValue: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<string | undefined>>;
}

function TextEditor({ value, setValue }: Props) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ size: ['small', false, 'large'] }],
        [{ color: [] }],
        ['bold', 'underline', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    }),
    [],
  );

  const formats = ['size', 'color', 'bold', 'underline', 'blockquote', 'list', 'bullet'];

  return (
    <div className="h-330 w-355">
      <QuillNoSSRWrapper
        theme="bubble"
        modules={modules}
        formats={formats}
        value={value}
        placeholder={'작품을 어필해보세요!'}
        onChange={setValue}
      />
    </div>
  );
}

export default TextEditor;
