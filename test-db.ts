import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Connecting to database...');
    const categories = await prisma.navCategory.findMany();
    console.log('Successfully connected!');
    console.log('Categories found:', categories.length);
    console.log(JSON.stringify(categories, null, 2));
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
