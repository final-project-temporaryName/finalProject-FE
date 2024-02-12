'use client';

import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useMemo } from 'react';
import './TextEditor.css';

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function TextEditor({ value, setValue }: Props) {
  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'underline', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    }),
    [],
  );

  const formats = ['bold', 'underline', 'blockquote', 'list', 'bullet'];

  return (
    <div className="h-333 w-355">
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
