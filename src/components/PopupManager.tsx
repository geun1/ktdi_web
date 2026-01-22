'use client';

import { useState, useEffect } from 'react';
import PopupModal from './ui/PopupModal';

interface Popup {
  id: string;
  title: string;
  content: string;
}

const HIDE_DURATION_MS = 1 * 60 * 60 * 1000; // 1시간 (밀리초)

function getStorageKey(popupId: string) {
  return `popup_hidden_${popupId}`;
}

function isPopupHidden(popupId: string): boolean {
  if (typeof window === 'undefined') return false;

  const hiddenUntil = localStorage.getItem(getStorageKey(popupId));
  if (!hiddenUntil) return false;

  const hiddenUntilTime = parseInt(hiddenUntil, 10);
  const now = Date.now();

  // 1시간이 지났으면 숨김 해제
  if (now >= hiddenUntilTime) {
    localStorage.removeItem(getStorageKey(popupId));
    return false;
  }

  return true;
}

function hidePopupForToday(popupId: string) {
  const hiddenUntil = Date.now() + HIDE_DURATION_MS;
  localStorage.setItem(getStorageKey(popupId), hiddenUntil.toString());
}

export default function PopupManager() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPopups() {
      try {
        const response = await fetch('/api/popups');
        if (!response.ok) throw new Error('Failed to fetch popups');

        const allPopups: Popup[] = await response.json();

        // 숨김 처리된 팝업 필터링
        const visiblePopups = allPopups.filter(popup => !isPopupHidden(popup.id));
        setPopups(visiblePopups);
      } catch (error) {
        console.error('Error fetching popups:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPopups();
  }, []);

  const handleClose = () => {
    // 다음 팝업으로 이동
    setCurrentIndex(prev => prev + 1);
  };

  const handleHideToday = () => {
    const currentPopup = popups[currentIndex];
    if (currentPopup) {
      hidePopupForToday(currentPopup.id);
    }
    // 다음 팝업으로 이동
    setCurrentIndex(prev => prev + 1);
  };

  // 로딩 중이거나 표시할 팝업이 없으면 렌더링하지 않음
  if (isLoading || currentIndex >= popups.length) {
    return null;
  }

  const currentPopup = popups[currentIndex];

  return (
    <PopupModal
      popup={currentPopup}
      onClose={handleClose}
      onHideToday={handleHideToday}
    />
  );
}
