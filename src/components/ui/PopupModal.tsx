'use client';

import { X } from 'lucide-react';

interface PopupModalProps {
  popup: {
    id: string;
    title: string;
    content: string;
  };
  onClose: () => void;
  onHideToday: () => void;
}

export default function PopupModal({ popup, onClose, onHideToday }: PopupModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-4 border-b bg-gradient-to-r from-primary/10 to-primary/5">
          <h2 className="text-lg font-bold text-gray-900 pr-8">{popup.title}</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div
            className="prose prose-sm max-w-none rich-content
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-strong:text-primary prose-strong:font-semibold
              prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto
              [&_img]:max-w-full [&_img]:h-auto"
            dangerouslySetInnerHTML={{ __html: popup.content }}
          />
        </div>

        {/* Footer Buttons */}
        <div className="border-t bg-gray-50 px-4 py-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={onHideToday}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors"
            >
              오늘 하루 보지 않기
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
