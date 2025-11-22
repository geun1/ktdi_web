import { PrismaClient } from '@prisma/client';

// Old Supabase connection
const oldPrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:rmsdlf0579@db.ncajpimvitotaytefcya.supabase.co:5432/postgres?schema=public',
    },
  },
});

// New Supabase connection (from .env)
const newPrisma = new PrismaClient();

async function migrateData() {
  try {
    console.log('🔄 Starting data migration from old Supabase to new Supabase...\n');

    // 1. Fetch all data from old database
    console.log('📥 Fetching data from old database...');
    
    const oldAdmins = await oldPrisma.admin.findMany();
    const oldCategories = await oldPrisma.navCategory.findMany({
      include: { pages: true },
    });
    
    console.log(`  ✓ Found ${oldAdmins.length} admin(s)`);
    console.log(`  ✓ Found ${oldCategories.length} categories`);
    console.log(`  ✓ Found ${oldCategories.reduce((sum, cat) => sum + cat.pages.length, 0)} pages\n`);

    // 2. Migrate Admins
    console.log('👤 Migrating admins...');
    for (const admin of oldAdmins) {
      await newPrisma.admin.upsert({
        where: { id: admin.id },
        update: {},
        create: {
          id: admin.id,
          username: admin.username,
          password: admin.password,
          createdAt: admin.createdAt,
        },
      });
      console.log(`  ✓ Migrated admin: ${admin.username}`);
    }

    // 3. Migrate Categories (without pages first)
    console.log('\n📁 Migrating categories...');
    for (const category of oldCategories) {
      await newPrisma.navCategory.upsert({
        where: { id: category.id },
        update: {},
        create: {
          id: category.id,
          name: category.name,
          order: category.order,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        },
      });
      console.log(`  ✓ Migrated category: ${category.name}`);
    }

    // 4. Migrate Pages
    console.log('\n📄 Migrating pages...');
    for (const category of oldCategories) {
      for (const page of category.pages) {
        await newPrisma.page.upsert({
          where: { id: page.id },
          update: {},
          create: {
            id: page.id,
            slug: page.slug,
            title: page.title,
            content: page.content,
            categoryId: page.categoryId,
            order: page.order,
            createdAt: page.createdAt,
            updatedAt: page.updatedAt,
          },
        });
        console.log(`  ✓ Migrated page: ${page.title} (${page.slug})`);
      }
    }

    console.log('\n✅ Data migration completed successfully!');
    console.log('\n📊 Migration Summary:');
    console.log(`  - Admins: ${oldAdmins.length}`);
    console.log(`  - Categories: ${oldCategories.length}`);
    console.log(`  - Pages: ${oldCategories.reduce((sum, cat) => sum + cat.pages.length, 0)}`);

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    throw error;
  } finally {
    await oldPrisma.$disconnect();
    await newPrisma.$disconnect();
  }
}

// Run migration
migrateData()
  .then(() => {
    console.log('\n🎉 All done! You can now use the new Supabase database.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Migration error:', error);
    process.exit(1);
  });
