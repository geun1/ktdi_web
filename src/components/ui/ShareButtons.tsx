'use client';

import { useState } from 'react';
import { Share2, Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleKakaoShare = () => {
    // Kakao share requires Kakao SDK initialization
    // For now, just copy link
    handleCopyLink();
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center gap-2 pt-6 border-t border-gray-200">
      <span className="text-sm text-gray-600 flex items-center gap-2">
        <Share2 className="w-4 h-4" />
        공유하기:
      </span>
      <div className="flex gap-2">
        <button
          onClick={handleKakaoShare}
          className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
          aria-label="카카오톡 공유"
          title="카카오톡"
        >
          <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/>
          </svg>
        </button>
        <button
          onClick={handleFacebookShare}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
          aria-label="페이스북 공유"
          title="페이스북"
        >
          <Facebook className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={handleTwitterShare}
          className="p-2 rounded-full bg-sky-500 hover:bg-sky-600 transition-colors"
          aria-label="트위터 공유"
          title="트위터"
        >
          <Twitter className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={handleCopyLink}
          className={`p-2 rounded-full transition-colors ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          aria-label="링크 복사"
          title="링크 복사"
        >
          {copied ? (
            <Check className="w-5 h-5" />
          ) : (
            <LinkIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
