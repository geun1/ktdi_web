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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-xl max-h-[80vh] flex flex-col overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{popup.title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-5">
          <div
            className="rich-content popup-content"
            dangerouslySetInnerHTML={{ __html: popup.content }}
          />
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4">
          <button
            onClick={onHideToday}
            className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            1시간 동안 보지 않기
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
