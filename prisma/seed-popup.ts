import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 기존 팝업 삭제 (선택사항)
  await prisma.popup.deleteMany();

  // 보드게임지도사 이벤트 팝업 생성
  await prisma.popup.create({
    data: {
      title: '보드게임지도사 첫 개설 기념 이벤트',
      content: `
<div style="text-align: center; padding: 10px 0;">
  <h2 style="color: #1a56db; font-size: 1.5rem; font-weight: bold; margin-bottom: 8px;">
    🎉 보드게임지도사 첫 개설 기념 이벤트 OPEN!
  </h2>

  <p style="color: #374151; font-size: 1rem; line-height: 1.7; margin: 16px 0;">
    수업·진행·지도까지 가능한<br/>
    <strong style="color: #1a56db;">보드게임지도사 2급 과정</strong>을 이벤트가로 만나보세요.
  </p>

  <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 12px; padding: 20px; margin: 20px 0;">
    <p style="margin: 8px 0; font-size: 0.95rem; color: #1f2937;">
      📅 <strong>일시:</strong> 2026. 2. 1.(일) 12:00 ~ 15:00
    </p>
    <p style="margin: 8px 0; font-size: 0.95rem; color: #1f2937;">
      📍 <strong>장소:</strong> 대한재능개발원 연수장
    </p>
  </div>

  <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 20px 0;">
    <p style="font-size: 1rem; color: #92400e; margin-bottom: 8px;">
      💰 <strong>수강료 (2급 기준)</strong>
    </p>
    <p style="margin: 0;">
      <span style="color: #6b7280; text-decoration: line-through; font-size: 1rem;">정가 45만원</span>
      <span style="font-size: 1.5rem; font-weight: bold; color: #dc2626; margin-left: 12px;">→ 이벤트가 20만원</span>
    </p>
  </div>

  <div style="background: #ecfdf5; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: left;">
    <p style="font-size: 1rem; color: #065f46; font-weight: bold; margin-bottom: 12px;">✅ 포함 사항</p>
    <ul style="margin: 0; padding-left: 20px; color: #047857;">
      <li style="margin: 6px 0;">그레이트킹덤 강의 프로그램 포함</li>
      <li style="margin: 6px 0;">비갱신 자격증 발급 포함</li>
    </ul>
  </div>

  <p style="color: #dc2626; font-weight: bold; font-size: 0.9rem; margin-top: 16px;">
    ※ 차후 이벤트 없음
  </p>
</div>
      `.trim(),
      isActive: true,
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-02-01'),
      order: 0,
    },
  });

  console.log('✅ 샘플 팝업 생성 완료!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
