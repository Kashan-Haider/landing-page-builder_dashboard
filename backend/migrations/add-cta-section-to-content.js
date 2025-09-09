/**
 * Migration: Add ctaSection to existing content records
 * This migration adds the new ctaSection field to all existing landing pages
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting migration: add-cta-section-to-content');

  try {
    // Get all existing landing pages
    const pages = await prisma.landingPage.findMany({
      select: {
        id: true,
        content: true,
      },
    });

    console.log(`Found ${pages.length} pages to update`);

    // Default ctaSection structure
    const defaultCtaSection = {
      subHeading: "Ready to Get Started?",
      heading: "Let's Work Together",
      description: "Contact us today to discuss your project and see how we can help you achieve your goals.",
      ctaButton: {
        label: "Get Started",
        href: "/contact",
      },
    };

    let updatedCount = 0;

    // Update each page
    for (const page of pages) {
      const content = page.content;

      // Only add ctaSection if it doesn't already exist
      if (!content.ctaSection) {
        const updatedContent = {
          ...content,
          ctaSection: defaultCtaSection,
        };

        await prisma.landingPage.update({
          where: { id: page.id },
          data: { content: updatedContent },
        });

        updatedCount++;
        console.log(`Updated page ${page.id}`);
      }
    }

    console.log(`Migration completed successfully. Updated ${updatedCount} pages.`);
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
