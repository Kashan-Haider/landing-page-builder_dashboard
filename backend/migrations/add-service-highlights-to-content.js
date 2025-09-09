const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting migration: Adding serviceHighlights to existing landing pages...');

  try {
    // Get all existing landing pages
    const landingPages = await prisma.landingPage.findMany({
      select: {
        id: true,
        content: true,
        businessName: true
      }
    });

    console.log(`Found ${landingPages.length} landing pages to update`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const page of landingPages) {
      try {
        const content = page.content;
        
        // Check if serviceHighlights already exists
        if (content.serviceHighlights) {
          console.log(`Skipping page ${page.id} (${page.businessName}) - serviceHighlights already exists`);
          skippedCount++;
          continue;
        }

        // Add serviceHighlights section with default values
        const updatedContent = {
          ...content,
          serviceHighlights: {
            title: "Our Key Services",
            description: "Discover what makes us stand out in the industry",
            services: []
          }
        };

        // Update the page
        await prisma.landingPage.update({
          where: { id: page.id },
          data: { content: updatedContent }
        });

        console.log(`✅ Updated page ${page.id} (${page.businessName})`);
        updatedCount++;

      } catch (error) {
        console.error(`❌ Error updating page ${page.id} (${page.businessName}):`, error.message);
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`- Total pages found: ${landingPages.length}`);
    console.log(`- Pages updated: ${updatedCount}`);
    console.log(`- Pages skipped: ${skippedCount}`);
    console.log(`- Pages with errors: ${landingPages.length - updatedCount - skippedCount}`);
    
    if (updatedCount > 0) {
      console.log('\n✅ Migration completed successfully!');
      console.log('All existing landing pages now have the serviceHighlights section.');
    } else {
      console.log('\n⚠️  No pages were updated. All pages may already have serviceHighlights.');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Migration error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
