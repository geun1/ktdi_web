'use client';

import { useState } from 'react';
import { createPopup } from '../actions';
import RichTextEditor from '@/components/admin/RichTextEditor';
import Link from 'next/link';
import { ArrowLeft, Eye } from 'lucide-react';

export default function PopupForm() {
  const [content, setContent] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <form action={createPopup as any} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              팝업 제목
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
              placeholder="예: 신규 이벤트 안내"
            />
          </div>

          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
              표시 순서
            </label>
            <input
              type="number"
              name="order"
              id="order"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
              defaultValue={0}
              min={0}
            />
            <p className="text-xs text-gray-500 mt-1">숫자가 낮을수록 먼저 표시됩니다</p>
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              시작일 (선택)
            </label>
            <input
              type="datetime-local"
              name="startDate"
              id="startDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              종료일 (선택)
            </label>
            <input
              type="datetime-local"
              name="endDate"
              id="endDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActiveCheckbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="isActiveCheckbox" className="text-sm font-medium text-gray-700">
            팝업 활성화
          </label>
          <input type="hidden" name="isActive" value={isActive.toString()} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              팝업 내용
            </label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800"
            >
              <Eye size={16} />
              <span>{showPreview ? '미리보기 닫기' : '미리보기'}</span>
            </button>
          </div>
          <RichTextEditor value={content} onChange={setContent} />
          <input type="hidden" name="content" value={content} />
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Link
            href="/admin/dashboard/popups"
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={18} />
            <span>목록으로</span>
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            팝업 생성
          </button>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">팝업 미리보기</h3>
            </div>
            <div
              className="p-6 overflow-y-auto max-h-[60vh] prose prose-sm max-w-none rich-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="p-4 border-t bg-gray-50 flex justify-center space-x-3">
              <button
                type="button"
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                오늘 하루 보지 않기
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
