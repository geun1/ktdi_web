import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.page.deleteMany();
  await prisma.navCategory.deleteMany();
  await prisma.admin.deleteMany();

  // Create Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.admin.create({
    data: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  const categories = [
    {
      name: '개발원 소개',
      order: 1,
      pages: ['인사말', '오시는 길'],
    },
    {
      name: '자격증 소개',
      order: 2,
      pages: [
        '자격증 안내',
        '자격증 종류',
        '시험 일정',
        '합격자 발표',
        '자격증 발급',
        '자료실',
      ],
    },
    {
      name: 'AI 연수과정 소개',
      order: 3,
      pages: ['과정 안내', '커리큘럼'],
    },
    {
      name: '상담 및 신청',
      order: 4,
      pages: ['상담 신청'],
    },
    {
      name: '후기',
      order: 5,
      pages: ['수강 후기'],
    },
  ];

  for (const cat of categories) {
    const category = await prisma.navCategory.create({
      data: {
        name: cat.name,
        order: cat.order,
      },
    });

    for (let i = 0; i < cat.pages.length; i++) {
      const pageTitle = cat.pages[i];
      await prisma.page.create({
        data: {
          title: pageTitle,
          slug: pageTitle.replace(/\s+/g, '-'), // Simple slug generation
          content: `<h1>${pageTitle}</h1><p>This is the content for ${pageTitle}.</p>`,
          categoryId: category.id,
          order: i + 1,
        },
      });
    }
  }

  console.log('Seeding completed.');
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
