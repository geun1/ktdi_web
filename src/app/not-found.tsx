import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            홈으로 돌아가기
          </Link>
          <Link
            href="/page/consultation"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
          >
            <Search className="w-5 h-5" />
            상담 문의하기
          </Link>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            자주 찾는 페이지
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/page/introduction"
              className="text-left p-3 bg-white rounded-lg hover:bg-primary/5 hover:border-primary border border-gray-200 transition-all"
            >
              <p className="font-medium text-gray-900">개발원 소개</p>
              <p className="text-sm text-gray-600">KTDI 소개 및 인사말</p>
            </Link>
            <Link
              href="/page/go-instructor"
              className="text-left p-3 bg-white rounded-lg hover:bg-primary/5 hover:border-primary border border-gray-200 transition-all"
            >
              <p className="font-medium text-gray-900">바둑지도사 과정</p>
              <p className="text-sm text-gray-600">자격증 과정 안내</p>
            </Link>
            <Link
              href="/page/ai-basic"
              className="text-left p-3 bg-white rounded-lg hover:bg-primary/5 hover:border-primary border border-gray-200 transition-all"
            >
              <p className="font-medium text-gray-900">AI 연수과정</p>
              <p className="text-sm text-gray-600">AI 실용 교육 프로그램</p>
            </Link>
            <Link
              href="/page/consultation"
              className="text-left p-3 bg-white rounded-lg hover:bg-primary/5 hover:border-primary border border-gray-200 transition-all"
            >
              <p className="font-medium text-gray-900">상담 및 신청</p>
              <p className="text-sm text-gray-600">문의 및 상담 신청</p>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>문제가 계속되면 고객센터로 문의해 주세요.</p>
          <p className="mt-2">
            전화: <a href="tel:02-553-9523" className="text-primary hover:underline">02-553-9523</a>
            {' | '}
            문자: <a href="sms:010-7935-9556" className="text-primary hover:underline">010-7935-9556</a>
          </p>
        </div>
      </div>
    </div>
  );
}
