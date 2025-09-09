// Utility to list all admin users in the database
// Usage: node utils/listAdmins.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function listAdmins() {
  try {
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    console.log('\n=== Admin Users in Database ===');
    if (admins.length === 0) {
      console.log('No admin users found.');
    } else {
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. Email: ${admin.email}`);
        console.log(`   ID: ${admin.id}`);
        console.log(`   Role: ${admin.role}`);
        console.log(`   Created: ${admin.createdAt}`);
        console.log('');
      });
    }
    console.log('===============================\n');

  } catch (error) {
    console.error('❌ Error listing admin users:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

listAdmins();
