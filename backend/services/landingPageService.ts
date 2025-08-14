import { PrismaClient } from '@prisma/client';
import { CreateLandingPageData } from '../types';
import { webhookService } from './webhookService';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Complete database includes for fetching landing pages
const FULL_LANDING_PAGE_INCLUDES = {
  BusinessContact: { include: { BusinessHour: true } },
  SEOSettings: true,
  Theme: true,
  ServiceArea: true,
  SocialLink: { include: { socialPlatforms: true } },
  ImagesPool: { include: { Image: true } },
  HeroSection: true,
  AboutSection: true,
  ServicesSection: true,
  GallerySection: true,
  TestimonialsSection: true,
  FAQSection: true,
  ServiceAreaSection: true,
  BusinessDetailsSection: {
    include: {
      BusinessDetailSubSection: true,
      BusinessContactForm: true,
      MapSettings: true
    }
  },
  CompanyOverviewSection: {
    include: { CompanyOverviewSubSection: true }
  },
  ServiceHighlightsSection: true,
  PreFooterSection: true,
  FooterSection: true
};

// Required sections that must be present in the data
const REQUIRED_SECTIONS = [
  'serviceArea', 'socialLink', 'image', 'heroSection', 'aboutSection',
  'servicesSection', 'gallerySection', 'testimonialsSection', 'faqSection',
  'serviceAreaSection', 'businessDetailsSection', 'companyOverviewSection',
  'serviceHighlightsSection', 'preFooterSection', 'footerSection'
];

// Default CTA button configurations
const DEFAULT_CTA_BUTTONS = [
  { label: "View Service Area", href: "/service-areas" },
  { label: "Learn More About Us", href: "/about" },
  { label: "View All Services", href: "/services" },
  { label: "Contact Local Office", href: "/contact" },
  { label: "Get Started", href: "/get-started" }
];

/**
 * Validates that all required data is present for creating a landing page
 */
function validateLandingPageData(data: any): void {
  if (!data.templateId || !data.businessName) {
    throw new Error('templateId and businessName are required');
  }

  const missingSections = REQUIRED_SECTIONS.filter(section => !data[section]);
  if (missingSections.length > 0) {
    throw new Error(`Missing required sections: ${missingSections.join(', ')}`);
  }
}

/**
 * Creates or retrieves business contact, SEO settings, and theme
 */
async function setupBasicEntities(data: any) {
  const results = {
    businessContactId: data.businessContactId,
    seoSettingsId: data.seoSettingsId,
    themeId: data.themeId
  };

  // Create business contact if not provided
  if (!results.businessContactId && data.businessContact) {
    const businessHours = data.businessContact.businessHours || [];
    const { businessHours: _, ...contactData } = data.businessContact;

    const contact = await prisma.businessContact.create({
      data: {
        id: uuidv4(),
        ...contactData,
        BusinessHour: {
          create: businessHours.map((hour: any) => ({ id: uuidv4(), ...hour }))
        }
      }
    });
    results.businessContactId = contact.id;
  }

  // Create SEO settings if not provided
  if (!results.seoSettingsId && data.seoSettings) {
    const seo = await prisma.sEOSettings.create({
      data: { id: uuidv4(), ...data.seoSettings }
    });
    results.seoSettingsId = seo.id;
  }

  // Create theme if not provided
  if (!results.themeId && data.theme) {
    const themeData = data.theme.create || data.theme;
    const theme = await prisma.theme.create({
      data: { id: uuidv4(), ...themeData }
    });
    results.themeId = theme.id;
  }

  // Validate that we have all required entities
  if (!results.businessContactId || !results.seoSettingsId || !results.themeId) {
    throw new Error('businessContact, seoSettings, and theme are required');
  }

  return results;
}

/**
 * Creates the default CTA buttons for the landing page
 */
async function createCtaButtons() {
  const buttons = await Promise.all(
    DEFAULT_CTA_BUTTONS.map(button => 
      prisma.ctaButton.create({
        data: { id: uuidv4(), ...button }
      })
    )
  );

  return {
    serviceArea: buttons[0].id,
    about: buttons[1].id,
    services: buttons[2].id,
    serviceAreaSection: buttons[3].id,
    companyOverview: buttons[4].id
  };
}

/**
 * Creates a service area with CTA button
 */
async function createServiceArea(serviceAreaData: any, ctaButtonId: string) {
  return prisma.serviceArea.create({
    data: {
      id: uuidv4(),
      city: serviceAreaData.city,
      region: serviceAreaData.region,
      description: serviceAreaData.description,
      ctaButtonId
    }
  });
}

/**
 * Creates social links with platforms
 */
async function createSocialLink(socialLinkData: any) {
  return prisma.socialLink.create({
    data: {
      id: uuidv4(),
      name: socialLinkData.name || 'Social Links',
      socialPlatforms: socialLinkData.socialPlatforms ? {
        create: socialLinkData.socialPlatforms.map((platform: any) => ({
          id: uuidv4(),
          platform: platform.platform,
          url: platform.url
        }))
      } : undefined
    }
  });
}

/**
 * Creates image pool with images
 */
async function createImagePool(imageData: any) {
  const images = imageData.images || [imageData];
  
  return prisma.imagesPool.create({
    data: {
      id: uuidv4(),
      name: imageData.name || 'Landing Page Images',
      description: imageData.description || 'Images for this landing page',
      updatedAt: new Date(),
      Image: {
        create: images.map((img: any) => ({
          id: uuidv4(),
          imageId: img.imageId,
          title: img.title,
          altText: img.altText,
          imageUrl: img.imageUrl || img.image,
          category: img.category || 'hero',
          description: img.description,
          updatedAt: new Date()
        }))
      }
    }
  });
}

/**
 * Creates all page sections with their respective CTA buttons
 */
async function createPageSections(data: any, ctaButtonIds: any) {
  const {
    heroSection, aboutSection, servicesSection, gallerySection,
    testimonialsSection, faqSection, serviceAreaSection,
    businessDetailsSection, companyOverviewSection,
    serviceHighlightsSection, preFooterSection, footerSection
  } = data;

  // Create sections that need CTA buttons
  const sectionsWithCta = await Promise.all([
    prisma.heroSection.create({
      data: { id: uuidv4(), ...heroSection }
    }),
    prisma.aboutSection.create({
      data: {
        id: uuidv4(),
        ...aboutSection,
        features: aboutSection.features || [],
        ctaButtonId: ctaButtonIds.about
      }
    }),
    prisma.servicesSection.create({
      data: {
        id: uuidv4(),
        ...servicesSection,
        ctaButtonId: ctaButtonIds.services
      }
    }),
    prisma.serviceAreaSection.create({
      data: {
        id: uuidv4(),
        ...serviceAreaSection,
        ctaButtonId: ctaButtonIds.serviceAreaSection
      }
    }),
    prisma.companyOverviewSection.create({
      data: {
        id: uuidv4(),
        title: companyOverviewSection.title,
        CompanyOverviewSubSection: companyOverviewSection.sections ? {
          create: companyOverviewSection.sections.map((section: any) => ({ id: uuidv4(), ...section }))
        } : undefined,
        ctaButtonId: ctaButtonIds.companyOverview
      }
    })
  ]);

  // Create simple sections without CTA buttons
  const simpleSections = await Promise.all([
    prisma.gallerySection.create({ data: { id: uuidv4(), ...gallerySection } }),
    prisma.testimonialsSection.create({ data: { id: uuidv4(), ...testimonialsSection } }),
    prisma.fAQSection.create({ data: { id: uuidv4(), ...faqSection } }),
    prisma.businessDetailsSection.create({
      data: {
        id: uuidv4(),
        title: businessDetailsSection.title,
        BusinessDetailSubSection: businessDetailsSection.sections ? {
          create: businessDetailsSection.sections.map((section: any) => ({ id: uuidv4(), ...section }))
        } : undefined
      }
    }),
    prisma.serviceHighlightsSection.create({ data: { id: uuidv4(), ...serviceHighlightsSection } }),
    prisma.preFooterSection.create({ data: { id: uuidv4(), ...preFooterSection } }),
    prisma.footerSection.create({ data: { id: uuidv4(), ...footerSection } })
  ]);

  return {
    hero: sectionsWithCta[0],
    about: sectionsWithCta[1],
    services: sectionsWithCta[2],
    serviceAreaSection: sectionsWithCta[3],
    companyOverview: sectionsWithCta[4],
    gallery: simpleSections[0],
    testimonials: simpleSections[1],
    faq: simpleSections[2],
    businessDetails: simpleSections[3],
    serviceHighlights: simpleSections[4],
    preFooter: simpleSections[5],
    footer: simpleSections[6]
  };
}

class LandingPageService {
  /**
   * Fetch all landing pages with complete data
   */
  async getAllLandingPages() {
    try {
      return await prisma.landingPage.findMany({ 
        include: FULL_LANDING_PAGE_INCLUDES 
      });
    } catch (error) {
      throw new Error('Failed to fetch landing pages');
    }
  }

  /**
   * Fetch a single landing page by ID with complete data
   */
  async getLandingPageById(id: string) {
    try {
      return await prisma.landingPage.findUnique({
        where: { id },
        include: FULL_LANDING_PAGE_INCLUDES
      });
    } catch (error) {
      throw new Error('Failed to fetch landing page');
    }
  }

  /**
   * Creates a new landing page with all required sections
   * This method orchestrates the entire creation process:
   * 1. Validates input data
   * 2. Creates basic entities (contact, SEO, theme)
   * 3. Creates CTA buttons
   * 4. Creates service area and social links
   * 5. Creates image pool
   * 6. Creates all page sections
   * 7. Creates the main landing page record
   * 8. Triggers webhooks
   */
  async createLandingPage(data: any) {
    try {
      // Step 1: Validate input
      validateLandingPageData(data);

      // Step 2: Setup basic entities (contact, SEO, theme)
      const basicEntities = await setupBasicEntities(data);

      // Step 3: Create CTA buttons
      const ctaButtonIds = await createCtaButtons();

      // Step 4: Create service area and social links
      const [serviceArea, socialLink, imagePool] = await Promise.all([
        createServiceArea(data.serviceArea, ctaButtonIds.serviceArea),
        createSocialLink(data.socialLink),
        createImagePool(data.image)
      ]);

      // Step 5: Create all page sections
      const sections = await createPageSections(data, ctaButtonIds);

      // Step 6: Create the main landing page record
      const landingPage = await prisma.landingPage.create({
        data: {
          id: uuidv4(),
          templateId: data.templateId,
          businessName: data.businessName,
          ...basicEntities,
          socialLinkId: socialLink.id,
          imagePoolId: imagePool.id,
          heroSectionId: sections.hero.id,
          aboutSectionId: sections.about.id,
          servicesSectionId: sections.services.id,
          gallerySectionId: sections.gallery.id,
          testimonialsSectionId: sections.testimonials.id,
          faqSectionId: sections.faq.id,
          serviceAreaSectionId: sections.serviceAreaSection.id,
          businessDetailsSectionId: sections.businessDetails.id,
          companyOverviewSectionId: sections.companyOverview.id,
          serviceHighlightsSectionId: sections.serviceHighlights.id,
          preFooterSectionId: sections.preFooter.id,
          footerSectionId: sections.footer.id,
          updatedAt: new Date(),
          ...(data.githubUrl && { githubUrl: data.githubUrl })
        }
      });

      // Step 7: Trigger webhooks
      await webhookService.triggerWebhooks('created', {
        templateId: landingPage.templateId,
        githubUrl: landingPage.githubUrl
      });

      // Return the complete landing page
      return this.getLandingPageById(landingPage.id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates an existing landing page
   * Only updates provided fields, leaving others unchanged
   */
  async updateLandingPage(id: string, data: any) {
    try {
      // Check if landing page exists
      const existing = await prisma.landingPage.findUnique({
        where: { id },
        include: {
          BusinessContact: true,
          SEOSettings: true,
          Theme: true,
          HeroSection: true,
          AboutSection: true
        }
      });

      if (!existing) {
        throw new Error('Landing page not found');
      }

      // Prepare main landing page updates
      const mainPageUpdates: any = { updatedAt: new Date() };
      const fieldsToUpdate = ['templateId', 'businessName', 'githubUrl'];
      
      fieldsToUpdate.forEach(field => {
        if (data[field] !== undefined) {
          mainPageUpdates[field] = data[field];
        }
      });

      // Update related entities in parallel
      const updatePromises = [];

      // Update business contact if provided
      if (data.businessContact?.id) {
        const { businessHours, BusinessHour, ...contactData } = data.businessContact;
        updatePromises.push(
          prisma.businessContact.update({
            where: { id: data.businessContact.id },
            data: contactData
          })
        );
      }

      // Update SEO settings if provided
      if (data.seoSettings?.id) {
        updatePromises.push(
          prisma.sEOSettings.update({
            where: { id: data.seoSettings.id },
            data: {
              title: data.seoSettings.title,
              description: data.seoSettings.description,
              keywords: data.seoSettings.keywords || []
            }
          })
        );
      }

      // Update hero section if provided and valid
      if (data.heroSection && existing.HeroSection) {
        const title = data.heroSection.title?.trim();
        if (title && title.length >= 3) {
          updatePromises.push(
            prisma.heroSection.update({
              where: { id: existing.HeroSection.id },
              data: {
                title,
                subtitle: data.heroSection.subtitle,
                description: data.heroSection.description
              }
            })
          );
        }
      }

      // Execute all updates in parallel
      await Promise.all(updatePromises);

      // Update main landing page record
      const updatedPage = await prisma.landingPage.update({
        where: { id },
        data: mainPageUpdates
      });

      // Trigger webhooks
      await webhookService.triggerWebhooks('updated', {
        templateId: updatedPage.templateId,
        githubUrl: updatedPage.githubUrl
      });

      return this.getLandingPageById(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a landing page and all its related data
   * This is a cascading delete that removes all sections and entities
   */
  async deleteLandingPage(id: string) {
    try {
      // Fetch the landing page with necessary related data
      const existingPage = await prisma.landingPage.findUnique({
        where: { id },
        include: {
          ServiceArea: true,
          BusinessContact: { include: { BusinessHour: true } },
          BusinessDetailsSection: {
            include: {
              BusinessDetailSubSection: true,
              BusinessContactForm: true,
              MapSettings: true
            }
          },
          CompanyOverviewSection: {
            include: { CompanyOverviewSubSection: true }
          }
        }
      });

      if (!existingPage) {
        throw new Error('Landing page not found');
      }

      // Delete related data that needs manual cleanup
      const cleanupPromises = [];

      // Delete service areas if they exist
      if (existingPage.ServiceArea.length > 0) {
        cleanupPromises.push(
          prisma.serviceArea.deleteMany({ where: { landingPageId: id } })
        );
      }

      // Delete business hours if they exist
      if (existingPage.BusinessContact.BusinessHour.length > 0) {
        cleanupPromises.push(
          prisma.businessHour.deleteMany({
            where: { businessContactId: existingPage.BusinessContact.id }
          })
        );
      }

      await Promise.all(cleanupPromises);

      // Delete the main landing page (this should cascade to most related entities)
      const result = await prisma.landingPage.delete({ where: { id } });

      // Delete all sections (these might not cascade automatically)
      const sectionDeletions = [
        prisma.heroSection.delete({ where: { id: existingPage.heroSectionId } }),
        prisma.aboutSection.delete({ where: { id: existingPage.aboutSectionId } }),
        prisma.servicesSection.delete({ where: { id: existingPage.servicesSectionId } }),
        prisma.gallerySection.delete({ where: { id: existingPage.gallerySectionId } }),
        prisma.testimonialsSection.delete({ where: { id: existingPage.testimonialsSectionId } }),
        prisma.fAQSection.delete({ where: { id: existingPage.faqSectionId } }),
        prisma.serviceAreaSection.delete({ where: { id: existingPage.serviceAreaSectionId } }),
        prisma.businessDetailsSection.delete({ where: { id: existingPage.businessDetailsSectionId } }),
        prisma.companyOverviewSection.delete({ where: { id: existingPage.companyOverviewSectionId } }),
        prisma.serviceHighlightsSection.delete({ where: { id: existingPage.serviceHighlightsSectionId } }),
        prisma.preFooterSection.delete({ where: { id: existingPage.preFooterSectionId } }),
        prisma.footerSection.delete({ where: { id: existingPage.footerSectionId } })
      ];

      // Delete basic entities
      const entityDeletions = [
        prisma.businessContact.delete({ where: { id: existingPage.businessContactId } }),
        prisma.sEOSettings.delete({ where: { id: existingPage.seoSettingsId } }),
        prisma.theme.delete({ where: { id: existingPage.themeId } }),
        prisma.socialLink.delete({ where: { id: existingPage.socialLinkId } }),
        prisma.imagesPool.delete({ where: { id: existingPage.imagePoolId } })
      ];

      // Execute all deletions in parallel
      await Promise.all([...sectionDeletions, ...entityDeletions]);

      return result;
    } catch (error) {
      throw error;
    }
  }
}

// Export a singleton instance
export const landingPageService = new LandingPageService();
