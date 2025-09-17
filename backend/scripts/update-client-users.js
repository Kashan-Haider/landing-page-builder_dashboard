const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateClientUsers() {
  try {
    console.log('Updating CLIENT users to EMPLOYEE role...');
    
    // Update all CLIENT users to EMPLOYEE
    const result = await prisma.user.updateMany({
      where: {
        role: 'CLIENT'
      },
      data: {
        role: 'EMPLOYEE'
      }
    });
    
    console.log(`Updated ${result.count} CLIENT users to EMPLOYEE role`);
    
    // List all users to verify
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true
      }
    });
    
    console.log('Current users:');
    users.forEach(user => {
      console.log(`- ${user.email}: ${user.role}`);
    });
    
  } catch (error) {
    console.error('Error updating users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateClientUsers();
