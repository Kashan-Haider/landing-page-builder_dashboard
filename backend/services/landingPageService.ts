import { PrismaClient } from '@prisma/client';
import { CreateLandingPageData } from '../types';
import { webhookService } from './webhookService';
import type { CreateLandingPageInput } from '../validation/schemas';
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

// Default CTA button configurations (create once and reuse)
const DEFAULT_CTA_BUTTONS = [
  { label: "View Service Area", href: "/service-areas" },
  { label: "Learn More About Us", href: "/about" },
  { label: "View All Services", href: "/services" },
  { label: "Contact Local Office", href: "/contact" },
  { label: "Get Started", href: "/get-started" }
];

/**
 * Get or create default CTA buttons (reuse existing ones)
 */
async function getOrCreateCtaButtons() {
  const existingButtons = await prisma.ctaButton.findMany({
    where: {
      label: { in: DEFAULT_CTA_BUTTONS.map(btn => btn.label) }
    }
  });

  // If we have all buttons, return them
  if (existingButtons.length === DEFAULT_CTA_BUTTONS.length) {
    return {
      serviceArea: existingButtons.find(b => b.label === "View Service Area")!.id,
      about: existingButtons.find(b => b.label === "Learn More About Us")!.id,
      services: existingButtons.find(b => b.label === "View All Services")!.id,
      serviceAreaSection: existingButtons.find(b => b.label === "Contact Local Office")!.id,
      companyOverview: existingButtons.find(b => b.label === "Get Started")!.id
    };
  }

  // Create missing buttons
  const missingButtons = DEFAULT_CTA_BUTTONS.filter(
    btn => !existingButtons.some(existing => existing.label === btn.label)
  );

  const newButtons = await Promise.all(
    missingButtons.map(button => 
      prisma.ctaButton.create({ data: { id: uuidv4(), ...button } })
    )
  );

  const allButtons = [...existingButtons, ...newButtons];
  
  return {
    serviceArea: allButtons.find(b => b.label === "View Service Area")!.id,
    about: allButtons.find(b => b.label === "Learn More About Us")!.id,
    services: allButtons.find(b => b.label === "View All Services")!.id,
    serviceAreaSection: allButtons.find(b => b.label === "Contact Local Office")!.id,
    companyOverview: allButtons.find(b => b.label === "Get Started")!.id
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
   * Creates a new landing page using a transaction and simplified logic
   * Major improvements over original: validation, reusable CTAs, transaction safety
   */
  async createLandingPage(data: CreateLandingPageInput) {
    try {
      return await prisma.$transaction(async (tx) => {
        // Get or create reusable CTA buttons
        const ctaButtonIds = await getOrCreateCtaButtons();

        // Create basic entities first if they don't exist
        let businessContactId = data.businessContactId;
        let seoSettingsId = data.seoSettingsId;
        let themeId = data.themeId;

        if (!businessContactId && data.businessContact) {
          const businessContact = await tx.businessContact.create({
            data: {
              id: uuidv4(),
              ...data.businessContact,
              BusinessHour: data.businessContact.businessHours ? {
                create: data.businessContact.businessHours.map(hour => ({
                  id: uuidv4(),
                  ...hour
                }))
              } : undefined
            }
          });
          businessContactId = businessContact.id;
        }

        if (!seoSettingsId && data.seoSettings) {
          const seoSettings = await tx.sEOSettings.create({
            data: {
              id: uuidv4(),
              ...data.seoSettings
            }
          });
          seoSettingsId = seoSettings.id;
        }

        if (!themeId && data.theme) {
          const theme = await tx.theme.create({
            data: {
              id: uuidv4(),
              ...data.theme
            }
          });
          themeId = theme.id;
        }

        // Create social link with platforms
        const socialLink = await tx.socialLink.create({
          data: {
            id: uuidv4(),
            name: data.socialLink.name || 'Social Links',
            socialPlatforms: data.socialLink.socialPlatforms ? {
              create: data.socialLink.socialPlatforms.map(platform => ({
                id: uuidv4(),
                ...platform
              }))
            } : undefined
          }
        });

        // Create image pool with images
        const imagePool = await tx.imagesPool.create({
          data: {
            id: uuidv4(),
            name: data.image.name || 'Landing Page Images',
            description: data.image.description || 'Images for this landing page',
            updatedAt: new Date(),
            Image: {
              create: data.image.images.map(img => ({
                id: uuidv4(),
                imageId: img.imageId,
                title: img.title,
                altText: img.altText,
                imageUrl: img.imageUrl,
                category: img.category || 'hero',
                description: img.description,
                updatedAt: new Date()
              }))
            }
          }
        });

        // Create all sections in parallel
        const [heroSection, aboutSection, servicesSection, gallerySection, 
               testimonialsSection, faqSection, serviceAreaSection,
               businessDetailsSection, companyOverviewSection, 
               serviceHighlightsSection, preFooterSection, footerSection] = await Promise.all([
          tx.heroSection.create({ data: { id: uuidv4(), ...data.heroSection } }),
          tx.aboutSection.create({ 
            data: { 
              id: uuidv4(), 
              ...data.aboutSection, 
              ctaButtonId: ctaButtonIds.about 
            } 
          }),
          tx.servicesSection.create({ 
            data: { 
              id: uuidv4(), 
              ...data.servicesSection, 
              ctaButtonId: ctaButtonIds.services 
            } 
          }),
          tx.gallerySection.create({ data: { id: uuidv4(), ...data.gallerySection } }),
          tx.testimonialsSection.create({ data: { id: uuidv4(), ...data.testimonialsSection } }),
          tx.fAQSection.create({ data: { id: uuidv4(), ...data.faqSection } }),
          tx.serviceAreaSection.create({ 
            data: { 
              id: uuidv4(), 
              ...data.serviceAreaSection, 
              ctaButtonId: ctaButtonIds.serviceAreaSection 
            } 
          }),
          tx.businessDetailsSection.create({
            data: {
              id: uuidv4(),
              title: data.businessDetailsSection.title,
              BusinessDetailSubSection: data.businessDetailsSection.sections ? {
                create: data.businessDetailsSection.sections.map(section => ({
                  id: uuidv4(),
                  ...section
                }))
              } : undefined
            }
          }),
          tx.companyOverviewSection.create({
            data: {
              id: uuidv4(),
              title: data.companyOverviewSection.title,
              ctaButtonId: ctaButtonIds.companyOverview,
              CompanyOverviewSubSection: data.companyOverviewSection.sections ? {
                create: data.companyOverviewSection.sections.map(section => ({
                  id: uuidv4(),
                  ...section
                }))
              } : undefined
            }
          }),
          tx.serviceHighlightsSection.create({ data: { id: uuidv4(), ...data.serviceHighlightsSection } }),
          tx.preFooterSection.create({ data: { id: uuidv4(), ...data.preFooterSection } }),
          tx.footerSection.create({ data: { id: uuidv4(), ...data.footerSection } })
        ]);

        // Create service area linked to landing page
        const serviceArea = await tx.serviceArea.create({
          data: {
            id: uuidv4(),
            ...data.serviceArea,
            ctaButtonId: ctaButtonIds.serviceArea
          }
        });

        // Create the main landing page record
        const landingPage = await tx.landingPage.create({
          data: {
            id: uuidv4(),
            templateId: data.templateId,
            businessName: data.businessName,
            githubUrl: data.githubUrl || '',
            businessContactId: businessContactId!,
            seoSettingsId: seoSettingsId!,
            themeId: themeId!,
            socialLinkId: socialLink.id,
            imagePoolId: imagePool.id,
            heroSectionId: heroSection.id,
            aboutSectionId: aboutSection.id,
            servicesSectionId: servicesSection.id,
            gallerySectionId: gallerySection.id,
            testimonialsSectionId: testimonialsSection.id,
            faqSectionId: faqSection.id,
            serviceAreaSectionId: serviceAreaSection.id,
            businessDetailsSectionId: businessDetailsSection.id,
            companyOverviewSectionId: companyOverviewSection.id,
            serviceHighlightsSectionId: serviceHighlightsSection.id,
            preFooterSectionId: preFooterSection.id,
            footerSectionId: footerSection.id,
            updatedAt: new Date()
          },
          include: FULL_LANDING_PAGE_INCLUDES
        });

        // Update service area to link to landing page
        await tx.serviceArea.update({
          where: { id: serviceArea.id },
          data: { landingPageId: landingPage.id }
        });

        // Trigger webhooks
        await webhookService.triggerWebhooks('created', {
          templateId: landingPage.templateId,
          githubUrl: landingPage.githubUrl
        });

        return landingPage;
      });
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
