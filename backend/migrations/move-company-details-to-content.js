// Migration script to move companyDetails from separate column to content field
// Run this script before applying the Prisma schema changes

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateCompanyDetailsToContent() {
  console.log('Starting migration: Moving companyDetails to content field...');
  
  try {
    // Get all landing pages with companyDetails
    const pages = await prisma.landingPage.findMany({
      select: {
        id: true,
        content: true,
        companyDetails: true,
      },
    });

    console.log(`Found ${pages.length} pages to migrate`);

    for (const page of pages) {
      // Parse existing content and companyDetails
      const existingContent = typeof page.content === 'string' 
        ? JSON.parse(page.content) 
        : page.content;
        
      const companyDetails = typeof page.companyDetails === 'string'
        ? JSON.parse(page.companyDetails)
        : page.companyDetails;

      // Add companyDetails to content
      const updatedContent = {
        ...existingContent,
        companyDetails: companyDetails || { sections: [] }
      };

      // Update the page with new content structure
      await prisma.landingPage.update({
        where: { id: page.id },
        data: {
          content: updatedContent,
        },
      });

      console.log(`✓ Migrated page: ${page.id}`);
    }

    console.log('✅ Migration completed successfully!');
    console.log('You can now apply the Prisma schema changes to remove the companyDetails column.');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
if (require.main === module) {
  migrateCompanyDetailsToContent()
    .then(() => {
      console.log('Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateCompanyDetailsToContent };
