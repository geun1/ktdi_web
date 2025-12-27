'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useRef, useMemo } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import imageCompression from 'browser-image-compression';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill-new');
    const { default: ImageResize } = await import('quill-image-resize-module-react');
    RQ.Quill.register('modules/imageResize', ImageResize);
    return RQ;
  },
  { ssr: false }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const quillRef = useRef<any>(null);
  const reactQuillRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Store Quill instance when component updates
    if (reactQuillRef.current) {
      try {
        if (typeof reactQuillRef.current.getEditor === 'function') {
          const editor = reactQuillRef.current.getEditor();
          if (editor) {
            quillRef.current = editor;
            // console.log('✅ Quill instance stored');
          }
        }
      } catch (error) {
        // console.log('⏳ Editor not ready yet...');
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

      console.log(`📤 Uploading image: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
      setIsUploading(true);

      try {
        // 1. Image Compression
        const options = {
          maxSizeMB: 1, // Target size ~1MB
          maxWidthOrHeight: 2560, // QHD quality
          useWebWorker: true,
          initialQuality: 0.85, // High quality
          fileType: file.type,
        };

        const compressedFile = await imageCompression(file, options);
        console.log(`📉 Compressed to: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

        // 2. Upload to Server
        const formData = new FormData();
        formData.append('file', compressedFile);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          alert(`Upload failed: ${error.error}`);
          setIsUploading(false);
          return;
        }

        const { url } = await response.json();
        console.log('✅ Image uploaded:', url);

        // 3. Insert into Editor
        let quill = quillRef.current;
        
        if (!quill && reactQuillRef.current) {
          quill = reactQuillRef.current.getEditor();
          quillRef.current = quill;
        }

        if (!quill) {
           const editorElement = document.querySelector('.ql-editor');
           if (editorElement && (editorElement.parentElement as any).__quill) {
             quill = (editorElement.parentElement as any).__quill;
             quillRef.current = quill;
           }
        }

        if (quill) {
          const range = quill.getSelection(true);
          const index = range ? range.index : quill.getLength();
          
          quill.insertEmbed(index, 'image', url);
          quill.setSelection(index + 1);
        } else {
          alert('Failed to insert image. Please try again.');
        }
      } catch (error) {
        console.error('❌ Upload error:', error);
        alert('Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    };
  };

  const modules = useMemo(() => ({
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
    imageResize: {
      parchment: {
        import: () => import('react-quill-new').then(m => m.Quill.import('parchment')),
      },
      modules: ['Resize', 'DisplaySize'],
    },
  }), []);

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'link', 'image',
  ];

  if (!mounted) {
    return <div className="h-96 mb-12 bg-gray-100 animate-pulse rounded" />;
  }

  return (
    <div className="bg-white relative">
      {isUploading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded">
          <div className="flex flex-col items-center">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
             <p className="text-sm font-medium text-gray-700">이미지 압축 및 업로드 중...</p>
          </div>
        </div>
      )}
      <style jsx global>{`
        .ql-editor {
          color: black !important;
          min-height: 300px;
        }
        /* Mobile Responsive Force */
        .ql-editor img {
          max-width: 100% !important;
          height: auto !important;
          display: block;
        }
        /* Fix resize handle visibility */
        .ql-container {
           font-family: inherit;
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
