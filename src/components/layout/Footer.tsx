import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">대한재능개발원 (KTDI)</h3>
            <p className="text-sm text-gray-300">
              미래를 선도하는 AI 교육의 중심,<br />
              대한재능개발원입니다.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">바로가기</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white">개발원 소개</Link></li>
              <li><Link href="/license" className="hover:text-white">자격증 소개</Link></li>
              <li><Link href="/ai-course" className="hover:text-white">AI 연수과정</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>고객센터: 02-553-9523 (09:00~17:00)</li>
              <li>연수상담 신청문자: 010-7935-9556</li>
              <li>주소: 서울특별시 송파구 법원로 114,<br />에이동 903호(문정동, 엠스테이트)</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="text-sm text-gray-400 space-y-1">
            <p>교육법인 대한재능개발원장 김성곤</p>
            <p>사업자등록번호: 683-86-03126</p>
            <p>개인정보처리방침 | 개인정보관리 책임자: 김명서</p>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            COPYRIGHT © 대한재능개발원 ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
