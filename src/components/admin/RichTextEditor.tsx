'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);
  const quillRef = useRef<any>(null);
  const reactQuillRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Store Quill instance when component updates
    if (reactQuillRef.current) {
      try {
        // Check if getEditor method exists and editor is ready
        if (typeof reactQuillRef.current.getEditor === 'function') {
          const editor = reactQuillRef.current.getEditor();
          if (editor) {
            quillRef.current = editor;
            console.log('✅ Quill instance stored:', !!editor);
          }
        }
      } catch (error) {
        // Editor not ready yet, will retry on next render
        console.log('⏳ Editor not ready yet...');
      }
    }
  }, [value, mounted]);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      console.log('📤 Uploading image:', file.name);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          alert(`Upload failed: ${error.error}`);
          return;
        }

        const { url } = await response.json();
        console.log('✅ Image uploaded:', url);

        // Try multiple methods to get Quill instance
        let quill = quillRef.current;
        
        if (!quill && reactQuillRef.current) {
          quill = reactQuillRef.current.getEditor();
          quillRef.current = quill;
        }

        if (!quill) {
          // Last resort: find via DOM
          const editorElement = document.querySelector('.ql-editor');
          if (editorElement && (editorElement.parentElement as any).__quill) {
            quill = (editorElement.parentElement as any).__quill;
            quillRef.current = quill;
          }
        }

        if (quill) {
          const range = quill.getSelection(true);
          const index = range ? range.index : quill.getLength();
          
          console.log('📝 Inserting image at index:', index);
          quill.insertEmbed(index, 'image', url);
          quill.setSelection(index + 1);
          console.log('✅ Image inserted successfully');
        } else {
          console.error('❌ Quill instance not found after all attempts');
          alert('Failed to insert image. Please try clicking in the editor first.');
        }
      } catch (error) {
        console.error('❌ Upload error:', error);
        alert('Failed to upload image');
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
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

  if (!mounted) {
    return <div className="h-96 mb-12 bg-gray-100 animate-pulse rounded" />;
  }

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
        .ql-editor img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1rem 0;
        }
      `}</style>
      <ReactQuill
        {...({
          ref: reactQuillRef,
          theme: 'snow',
          value: value,
          onChange: onChange,
          modules: modules,
          formats: formats,
          className: 'h-96 mb-12',
        } as any)}
      />
    </div>
  );
}
