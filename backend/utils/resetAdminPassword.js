// Utility to reset admin user password
// Usage: node utils/resetAdminPassword.js "admin@example.com" "new-password"

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetAdminPassword(email, newPassword) {
  try {
    // Find the admin user
    const admin = await prisma.user.findUnique({
      where: { email }
    });

    if (!admin) {
      console.log('❌ Admin user not found with email:', email);
      return;
    }

    if (admin.role !== 'ADMIN') {
      console.log('❌ User is not an admin:', email);
      return;
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });

    console.log('\n✅ Admin password updated successfully!');
    console.log('Email:', email);
    console.log('New password set for login');
    console.log('\nYou can now login at: http://localhost:5173/admin/login');
    console.log('================================\n');

  } catch (error) {
    console.error('❌ Error resetting admin password:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Get email and password from command line arguments
const email = process.argv[2];
const newPassword = process.argv[3];

if (!email || !newPassword) {
  console.log('\nUsage: node utils/resetAdminPassword.js "email@example.com" "new-password"');
  console.log('Example: node utils/resetAdminPassword.js "admin@company.com" "newpassword123"');
  process.exit(1);
}

resetAdminPassword(email, newPassword);
