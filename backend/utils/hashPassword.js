// Simple utility to generate hashed passwords for admin users
// Usage: node utils/hashPassword.js "your-password-here"

const bcrypt = require('bcrypt');

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('\n=== Password Hash Generator ===');
    console.log('Original password:', password);
    console.log('Hashed password:', hashedPassword);
    console.log('\nYou can use this hashed password to create an admin user in your database.');
    console.log('================================\n');
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

// Get password from command line argument
const password = process.argv[2];

if (!password) {
  console.log('\nUsage: node utils/hashPassword.js "your-password-here"');
  console.log('Example: node utils/hashPassword.js "admin123"');
  process.exit(1);
}

hashPassword(password);
