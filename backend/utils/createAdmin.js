// Utility to create an admin user directly in the database
// Usage: node utils/createAdmin.js "admin@example.com" "your-password"

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin(email, password) {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      console.log('❌ Admin user already exists:', existingAdmin.email);
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('ID:', admin.id);
    console.log('\nYou can now login at: http://localhost:5173/admin/login');
    console.log('================================\n');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Get email and password from command line arguments
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.log('\nUsage: node utils/createAdmin.js "email@example.com" "password"');
  console.log('Example: node utils/createAdmin.js "admin@company.com" "admin123"');
  process.exit(1);
}

createAdmin(email, password);
