import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: '개인정보처리방침' }]} />
        
        <h1 className="text-4xl font-bold text-primary mb-8 border-b pb-4">
          개인정보처리방침
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-sm text-gray-500 mb-8">
            시행일자: 2024년 1월 1일
          </p>

          <h2>제1조 (개인정보의 처리 목적)</h2>
          <p>
            대한재능개발원('이하 '개발원')은 다음의 목적을 위하여 개인정보를 처리합니다. 
            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 
            이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul>
            <li>자격증 발급 및 관리</li>
            <li>교육 과정 운영 및 관리</li>
            <li>상담 및 문의 응대</li>
            <li>교육 관련 정보 제공</li>
          </ul>

          <h2>제2조 (개인정보의 처리 및 보유 기간)</h2>
          <p>
            개발원은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 
            동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </p>
          <ul>
            <li>자격증 발급 정보: 영구 보관 (자격증 관리 목적)</li>
            <li>상담 문의 정보: 3년</li>
            <li>교육 수강 정보: 5년</li>
          </ul>

          <h2>제3조 (처리하는 개인정보의 항목)</h2>
          <p>개발원은 다음의 개인정보 항목을 처리하고 있습니다.</p>
          <ul>
            <li>필수항목: 성명, 생년월일, 연락처(전화번호, 이메일), 주소</li>
            <li>선택항목: 경력사항, 학력사항</li>
          </ul>

          <h2>제4조 (개인정보의 제3자 제공)</h2>
          <p>
            개발원은 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 
            정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 
            개인정보를 제3자에게 제공합니다.
          </p>

          <h2>제5조 (개인정보의 파기)</h2>
          <p>
            개발원은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 
            지체없이 해당 개인정보를 파기합니다.
          </p>
          <ul>
            <li>파기절차: 불필요하게 된 개인정보는 내부 방침에 따라 파기합니다.</li>
            <li>파기방법: 전자적 파일 형태는 복구 불가능한 방법으로 영구 삭제하며, 
            종이 문서는 분쇄기로 분쇄하거나 소각합니다.</li>
          </ul>

          <h2>제6조 (정보주체의 권리·의무 및 행사방법)</h2>
          <p>
            정보주체는 개발원에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
          </p>
          <ul>
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리정지 요구</li>
          </ul>

          <h2>제7조 (개인정보 보호책임자)</h2>
          <p>
            개발원은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 
            개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 
            아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg my-4">
            <p><strong>개인정보 보호책임자</strong></p>
            <ul className="mt-2">
              <li>성명: 김명서</li>
              <li>연락처: 02-553-9523</li>
              <li>이메일: (문의 시 제공)</li>
            </ul>
          </div>

          <h2>제8조 (개인정보 처리방침 변경)</h2>
          <p>
            이 개인정보 처리방침은 2024년 1월 1일부터 적용되며, 
            법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 
            변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </p>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">문의하기</h3>
            <p>
              개인정보 처리방침에 대한 문의사항이 있으시면 아래 연락처로 문의해 주시기 바랍니다.
            </p>
            <ul className="mt-4">
              <li>전화: 02-553-9523</li>
              <li>문자: 010-7935-9556</li>
              <li>
                <Link href="/page/consultation" className="text-primary hover:underline">
                  상담 신청하기 →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
