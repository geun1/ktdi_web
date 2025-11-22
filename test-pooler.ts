import { PrismaClient } from '@prisma/client';

// Test connection pooler
const poolerUrl = 'postgresql://postgres:rmsdlf0579@db.ncajpimvitotaytefcya.supabase.co:6543/postgres?pgbouncer=true&schema=public';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: poolerUrl,
    },
  },
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  try {
    console.log('Testing connection pooler...');
    
    // Test 1: Fetch nav categories
    const categories = await prisma.navCategory.findMany({
      include: {
        pages: true,
      },
    });
    console.log(`✅ Successfully fetched ${categories.length} categories`);
    
    // Test 2: Fetch pages
    const pages = await prisma.page.findMany({
      select: {
        slug: true,
        title: true,
      },
    });
    console.log(`✅ Successfully fetched ${pages.length} pages`);
    
    console.log('\n🎉 Connection pooler is working correctly!');
  } catch (error) {
    console.error('❌ Connection pooler test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
