'use client';

import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useMemo } from 'react';
import './TextEditor.css';
import 'react-quill/dist/quill.snow.css';
import TextEditorLoader from './TextEditorLoader';

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <TextEditorLoader />,
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
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        ['bold', 'underline', 'blockquote'],
      ],
    }),
    [],
  );

  const formats = ['size', 'header', 'color', 'background', 'bold', 'underline', 'blockquote', 'bullet'];

  return (
    <div className="w-full">
      <QuillNoSSRWrapper
        theme="snow"
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
