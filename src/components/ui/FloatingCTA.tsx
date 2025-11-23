'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isExpanded ? (
        <div className="bg-white rounded-lg shadow-2xl p-6 w-80 animate-in slide-in-from-bottom">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-900">상담 신청</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            자격증 과정이나 연수에 대해 궁금하신가요?
          </p>
          <div className="space-y-2">
            <Link
              href="/page/consultation"
              className="block w-full px-4 py-2 bg-primary text-white text-center rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              상담 신청하기
            </Link>
            <a
              href="tel:02-553-9523"
              className="block w-full px-4 py-2 bg-gray-100 text-gray-900 text-center rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              전화 상담: 02-553-9523
            </a>
            <a
              href="sms:010-7935-9556"
              className="block w-full px-4 py-2 bg-gray-100 text-gray-900 text-center rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              문자 상담: 010-7935-9556
            </a>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-primary text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-110 transition-all group"
          aria-label="상담 신청"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            상담 신청하기
          </span>
        </button>
      )}
    </div>
  );
}
