'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'link',
  'image',
];

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <div className="bg-white">
      <style jsx global>{`
        .ql-editor {
          color: black !important;
        }
        .ql-editor p,
        .ql-editor h1,
        .ql-editor h2,
        .ql-editor h3,
        .ql-editor li {
          color: black !important;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="h-96 mb-12"
      />
    </div>
  );
}
