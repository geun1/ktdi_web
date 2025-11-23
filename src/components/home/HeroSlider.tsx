'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta1?: { text: string; href: string };
  cta2?: { text: string; href: string };
}

const slides: Slide[] = [
  {
    image: '/images/hero/main-1.avif',
    title: '대한재능개발원',
    subtitle: 'AI 시대를 이끌어갈 미래 인재를 양성합니다',
    cta1: { text: '자격증 알아보기', href: '/page/go-instructor' },
    cta2: { text: '상담 신청하기', href: '/page/consultation' },
  },
  {
    image: '/images/hero/main-2.avif',
    title: '바둑·체스 지도사 과정',
    subtitle: '체계적인 교육으로 전문 지도자를 양성합니다',
    cta1: { text: '바둑지도사', href: '/page/go-instructor' },
    cta2: { text: '체스지도사', href: '/page/chess-instructor' },
  },
  {
    image: '/images/hero/main-3.avif',
    title: 'AI 실용 교육 과정',
    subtitle: '실무에 바로 적용 가능한 AI 기술을 배웁니다',
    cta1: { text: 'AI 기초과정', href: '/page/ai-basic' },
    cta2: { text: 'AI 심화과정', href: '/page/ai-advanced' },
  },
  {
    image: '/images/hero/main-4.avif',
    title: '전문 자격증 과정',
    subtitle: '한국기원 공인 자격증부터 다양한 전문 과정까지',
    cta1: { text: '자격증 보기', href: '/page/tier' },
    cta2: { text: '문의하기', href: '/page/consultation' },
  },
  {
    image: '/images/hero/main-5.avif',
    title: '평생 유효한 자격증',
    subtitle: '비갱신형 자격증으로 한 번의 발급으로 평생 소장',
    cta1: { text: '과정 안내', href: '/page/introduction' },
    cta2: { text: '상담 신청', href: '/page/consultation' },
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds interval

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(!isPaused);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
        <motion.h1
          key={`title-${currentIndex}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-center"
        >
          {currentSlide.title}
        </motion.h1>
        <motion.p
          key={`subtitle-${currentIndex}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl text-center max-w-3xl mb-8"
        >
          {currentSlide.subtitle}
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          key={`cta-${currentIndex}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {currentSlide.cta1 && (
            <Link
              href={currentSlide.cta1.href}
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              {currentSlide.cta1.text}
            </Link>
          )}
          {currentSlide.cta2 && (
            <Link
              href={currentSlide.cta2.href}
              className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              {currentSlide.cta2.text}
            </Link>
          )}
        </motion.div>
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Pause/Play Button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
        aria-label={isPaused ? '재생' : '일시정지'}
      >
        {isPaused ? (
          <Play className="w-5 h-5 text-white" />
        ) : (
          <Pause className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
