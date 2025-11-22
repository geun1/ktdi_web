import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function createTables() {
  try {
    console.log('Creating tables in new Supabase database...\n');
    
    // Create Admin table
    console.log('Creating Admin table...');
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Admin" (
        "id" TEXT NOT NULL,
        "username" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
      );
    `);
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Admin_username_key" ON "Admin"("username");
    `);
    console.log('✅ Admin table created\n');
    
    // Create NavCategory table
    console.log('Creating NavCategory table...');
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "NavCategory" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "order" INTEGER NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "NavCategory_pkey" PRIMARY KEY ("id")
      );
    `);
    console.log('✅ NavCategory table created\n');
    
    // Create Page table
    console.log('Creating Page table...');
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Page" (
        "id" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "categoryId" TEXT NOT NULL,
        "order" INTEGER NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
      );
    `);
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Page_slug_key" ON "Page"("slug");
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Page" ADD CONSTRAINT "Page_categoryId_fkey" 
      FOREIGN KEY ("categoryId") REFERENCES "NavCategory"("id") 
      ON DELETE RESTRICT ON UPDATE CASCADE;
    `);
    console.log('✅ Page table created\n');
    
    console.log('🎉 All tables created successfully!');
    
  } catch (error) {
    console.error('❌ Failed to create tables:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createTables();
