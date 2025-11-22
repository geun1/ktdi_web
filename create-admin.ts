import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('Creating admin account...\n');
    
    const username = 'admin';
    const password = 'admin123';
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin
    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    
    console.log('✅ Admin account created successfully!');
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password}`);
    console.log(`   ID: ${admin.id}\n`);
    
  } catch (error) {
    console.error('❌ Failed to create admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
