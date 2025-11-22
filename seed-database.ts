import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAndSeedDatabase() {
  console.log('🗑️  Clearing existing data...\n');

  try {
    // Delete all pages first (due to foreign key constraints)
    const deletedPages = await prisma.page.deleteMany({});
    console.log(`   Deleted ${deletedPages.count} pages`);

    // Delete all categories
    const deletedCategories = await prisma.navCategory.deleteMany({});
    console.log(`   Deleted ${deletedCategories.count} categories\n`);

    console.log('🌱 Starting database seeding...\n');

    // 1. Create Navigation Categories
    console.log('📁 Creating navigation categories...');
    
    const category1 = await prisma.navCategory.create({
      data: {
        name: '개발원 소개',
        order: 1,
      },
    });
    
    const category2 = await prisma.navCategory.create({
      data: {
        name: '자격증 소개',
        order: 2,
      },
    });
    
    const category3 = await prisma.navCategory.create({
      data: {
        name: 'AI 연수과정',
        order: 3,
      },
    });
    
    const category4 = await prisma.navCategory.create({
      data: {
        name: '상담 및 신청',
        order: 4,
      },
    });
    
    const category5 = await prisma.navCategory.create({
      data: {
        name: '후기',
        order: 5,
      },
    });
    
    console.log('✅ Categories created\n');

    // 2. Create Pages
    console.log('📄 Creating pages...\n');

    // Category 1: 개발원 소개
    await prisma.page.create({
      data: {
        slug: 'introduction',
        title: '인사말',
        content: `<h2>인사말</h2>
<p>대한재능개발원에 오신 것을 환영합니다.</p>
<p>저희 대한재능개발원은 바둑, 체스 지도자 양성과 AI 교육을 통해 미래 인재를 육성하는 교육기관입니다.</p>
<p>최고의 교육 프로그램과 전문 강사진을 통해 여러분의 꿈을 실현할 수 있도록 최선을 다하겠습니다.</p>`,
        categoryId: category1.id,
        order: 1,
      },
    });

    await prisma.page.create({
      data: {
        slug: 'contest-intro',
        title: '대회 소개',
        content: `<h2>대회 소개</h2>
<p>대한재능개발원에서 주최하는 각종 바둑 및 체스 대회 정보를 안내합니다.</p>
<p>정기적으로 개최되는 대회를 통해 실력을 겨루고 성장할 수 있는 기회를 제공합니다.</p>`,
        categoryId: category1.id,
        order: 2,
      },
    });

    // Category 2: 자격증 소개
    await prisma.page.create({
      data: {
        slug: 'tier',
        title: '(재)한국기원 5단,6단 과정',
        content: `<h2>김만수 프로 인사말</h2>
<p>안녕하세요. 프로기사 김만수입니다. 교육법인 재능개발원에서 바둑지도자 자격증 코스를 여러분과 함께 하게 되어 기쁘게 생각합니다.</p>

<p>본 재능개발원 지도자 자격증은 다른 자격증과 달리 한번 발급으로 평생 소장하실 수 있습니다.</p>

<h3>저희 발급 시스템</h3>
<ol>
<li><strong>최신 정석 및 이론 소개</strong>: 본인의 실력 향상은 물론 학생들에게 최신 정석 소개하시면 여러분의 공신력을 높이는데 도움이 되리라 믿습니다.</li>
<li><strong>실전보 복기 강의</strong>: 기력대 별로 장,단점을 최대한 짚어드리면 본인 뿐 아니라 학생을 가르치실 때 큰 도움이 될 것입니다.</li>
<li><strong>지속적인 교육 영상 제공</strong>: 바둑 연수 이후에도 수시로 바둑 교육 영상을 보내드립니다.</li>
</ol>

<p>교육법인 재능개발원은 바둑지도자 자격증 발급을 통해 여러분에게 도움이 되고자 합니다.</p>
<p>아울러 (재)한국기원 바둑 공인 5, 6단 발급 코스도 운영하오니 많은 관심 부탁드립니다.</p>`,
        categoryId: category2.id,
        order: 1,
      },
    });

    await prisma.page.create({
      data: {
        slug: 'go-instructor',
        title: '바둑지도사 과정',
        content: `<h2>바둑지도사 과정</h2>
<p>바둑은 대표적인 두뇌 스포츠로 수의 계산을 통한 두뇌 활성화로 창의력과 논리적인 사고, 판단력 향상에 큰 도움이 됩니다.</p>

<h3>자격정보</h3>
<ul>
<li>자격정보: 바둑지도사 1급, 2급, 3급</li>
<li>자격의 종류: 민간자격</li>
<li>등록번호: 제 2019-000627</li>
<li>자격발급기관: 교육법인 대한재능개발원</li>
</ul>

<h3>지원자격</h3>
<ul>
<li><strong>3급</strong>: 만18세 이상, 학력제한 없음</li>
<li><strong>2급</strong>: 만18세 이상, 아마 4단증 소지자, 바둑교육현장에서 3년이상 경력자</li>
<li><strong>1급</strong>: 만18세 이상, 아마 5단증, 바둑교육현장에서 7년이상 경력자</li>
</ul>

<h3>자격증 발급 응시료</h3>
<ul>
<li>3급: 총 40만원(비갱신형)</li>
<li>2급: 총 45만원(비갱신형)</li>
<li>1급: 총 50만원(비갱신형)</li>
</ul>

<p><strong>자격유효기간</strong>: 비갱신형 (자격증발급후 추가비용 없음)</p>`,
        categoryId: category2.id,
        order: 2,
      },
    });

    await prisma.page.create({
      data: {
        slug: 'chess-instructor',
        title: '체스지도사 과정',
        content: `<h2>체스지도사 과정</h2>
<p>체스는 아시안게임 정식 스포츠 종목입니다. FIFA 다음으로 많은 회원국을 보유하고 있는 세계인의 두뇌 스포츠입니다.</p>
<p>어린이부터 성인 노인까지 지도할수 있는 체스지도사 과정입니다.</p>

<h3>자격정보</h3>
<ul>
<li>자격정보: 체스지도사 1급, 2급, 3급</li>
<li>자격의 종류: 민간자격</li>
<li>등록번호: 제 2019-000625</li>
</ul>

<h3>자격증 발급 응시료</h3>
<ul>
<li>3급: 총 40만원(비갱신형)</li>
<li>2급: 총 45만원(비갱신형)</li>
<li>1급: 총 50만원(비갱신형)</li>
</ul>`,
        categoryId: category2.id,
        order: 3,
      },
    });

    await prisma.page.create({
      data: {
        slug: 'child-counselor',
        title: '아동상담사 과정',
        content: `<h2>아동상담사 과정</h2>
<p>아동의 심리와 발달을 이해하고 전문적인 상담 기법을 배우는 과정입니다.</p>
<p>아동의 정서적 안정과 건강한 성장을 돕는 전문 상담사를 양성합니다.</p>`,
        categoryId: category2.id,
        order: 4,
      },
    });

    await prisma.page.create({
      data: {
        slug: 'chess-referee',
        title: '체스심판 과정',
        content: `<h2>체스심판 과정</h2>
<p>체스 대회의 공정한 진행을 위한 전문 심판을 양성하는 과정입니다.</p>
<p>국제 체스 규정과 심판 기법을 배우고 실전 경험을 쌓을 수 있습니다.</p>`,
        categoryId: category2.id,
        order: 5,
      },
    });

    await prisma.page.create({
      data: {
        slug: 'moral-character',
        title: '인성지도사 과정',
        content: `<h2>인성지도사 과정</h2>
<p>올바른 인성 교육을 통해 건강한 사회 구성원을 양성하는 전문 지도사 과정입니다.</p>`,
        categoryId: category2.id,
        order: 6,
      },
    });

    // Category 3: AI 연수과정
    await prisma.page.create({
      data: {
        slug: 'ai-basic',
        title: 'AI 실용 기초 과정',
        content: `<h2>나만의 AI 큐레이션, 새로운 미래를 설계하다</h2>
<p><strong>당신의 일상과 업무, 창작에 AI를 더하다!</strong></p>

<h3>효율적인 업무 도구 활용</h3>
<ul>
<li>언어 모델(ChatGPT)을 활용한 문서 작성, 데이터 정리, 번역 등의 자동화</li>
<li>이미지 생성 도구를 활용한 빠르고 창의적인 시각 자료 제작</li>
</ul>

<h3>커리큘럼</h3>
<h4>1차시) 나만의 AI 큐레이션 전략 (1시간)</h4>
<ul>
<li>AI Curating 이란?</li>
<li>ClovaNote, ChatGPT, GAMMA, SUNO, Virbo, Filmora 프로그램 설치</li>
<li>개별 컨설팅을 통한 AI 큐레이션 전략 수립 방법</li>
</ul>

<h4>2차시) 강의 제안서 작성 (2시간)</h4>
<ul>
<li>ChatGPT를 활용한 강의 및 아이디어 발상</li>
<li>감마(Gamma)를 활용한 자동 PPT 작성 실습</li>
<li>Filmora AI기능으로 동영상 편집</li>
</ul>`,
        categoryId: category3.id,
        order: 1,
      },
    });

    await prisma.page.create({
      data: {
        slug: 'ai-advanced',
        title: 'AI 실용 심화 과정',
        content: `<h2>AI 실용 심화 과정</h2>
<p>AI 기초 과정을 이수한 분들을 위한 심화 교육 프로그램입니다.</p>
<p>더욱 전문적인 AI 활용 능력을 배양하고 실무에 바로 적용할 수 있는 고급 기술을 습득합니다.</p>`,
        categoryId: category3.id,
        order: 2,
      },
    });

    // Category 4: 상담 및 신청
    await prisma.page.create({
      data: {
        slug: 'consultation',
        title: '상담 및 신청 방법',
        content: `<h2>상담 및 신청 방법</h2>
<p>고객센터 <strong>02-553-9523 (09:00~17:00)</strong>로 전화 주시거나</p>
<p>문자 <strong>010-7935-9556</strong>로 상담 편한 시간을 알려주시면 전화드려 연수 날짜를 정해 드립니다.</p>

<h3>계좌번호</h3>
<p><strong>우리은행 1005-504-685052 주식회사 대한재능개발원</strong></p>`,
        categoryId: category4.id,
        order: 1,
      },
    });

    // Category 5: 후기
    await prisma.page.create({
      data: {
        slug: 'review',
        title: '수강 후기',
        content: `<h2>수강 후기</h2>
<p>대한재능개발원의 교육 프로그램을 수강하신 분들의 생생한 후기를 확인하세요.</p>`,
        categoryId: category5.id,
        order: 1,
      },
    });

    console.log('✅ All pages created\n');
    console.log('🎉 Database seeding completed successfully!');
    
    // Summary
    const categoriesCount = await prisma.navCategory.count();
    const pagesCount = await prisma.page.count();
    
    console.log(`\n📊 Summary:`);
    console.log(`   - Categories: ${categoriesCount}`);
    console.log(`   - Pages: ${pagesCount}`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

clearAndSeedDatabase()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Failed:', error);
    process.exit(1);
  });
