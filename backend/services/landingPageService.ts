// services/landingPageService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class LandingPageService {
  async getAllLandingPages() {
    return prisma.landingPage.findMany({
      include: {
        businessContact: {
          include: {
            businessHours: true
          }
        },
        seoSettings: true,
        theme: true,
        // One-to-one section includes
        serviceArea: true,
        socialLink: true,
        image: true,
        heroSection: true,
        aboutSection: true,
        servicesSection: true,
        gallerySection: true,
        testimonialsSection: true,
        faqSection: true,
        serviceAreaSection: true,
        businessDetailsSection: {
          include: {
            sections: true,
            contactForm: true,
            map: true
          }
        },
        companyOverviewSection: {
          include: {
            sections: true
          }
        },
        serviceHighlightsSection: true,
        preFooterSection: true,
        footerSection: true
      }
    });
  }

  async getLandingPageById(id: string) {
    return prisma.landingPage.findUnique({
      where: { id },
      include: {
        businessContact: {
          include: {
            businessHours: true
          }
        },
        seoSettings: true,
        theme: true,
        // One-to-one section includes
        serviceArea: true,
        socialLink: true,
        image: true,
        heroSection: true,
        aboutSection: true,
        servicesSection: true,
        gallerySection: true,
        testimonialsSection: true,
        faqSection: true,
        serviceAreaSection: true,
        businessDetailsSection: {
          include: {
            sections: true,
            contactForm: true,
            map: true
          }
        },
        companyOverviewSection: {
          include: {
            sections: true
          }
        },
        serviceHighlightsSection: true,
        preFooterSection: true,
        footerSection: true
      }
    });
  }

  async createLandingPage(data: any) {
    try {
      // Extract all required fields for LandingPage model
      const {
        templateId,
        businessName,
        githubUrl,
        businessContact,
        businessContactId,
        seoSettings,
        seoSettingsId,
        theme,
        themeId,
        // Single section objects (required)
        serviceArea,
        socialLink,
        image,
        heroSection,
        aboutSection,
        servicesSection,
        gallerySection,
        testimonialsSection,
        faqSection,
        serviceAreaSection,
        businessDetailsSection,
        companyOverviewSection,
        serviceHighlightsSection,
        preFooterSection,
        footerSection,
        ...otherData
      } = data;

      // Validate required fields
      if (!templateId || !businessName) {
        throw new Error('templateId and businessName are required');
      }

      // Validate all required sections are provided
      const requiredSections = {
        serviceArea,
        socialLink,
        image,
        heroSection,
        aboutSection,
        servicesSection,
        gallerySection,
        testimonialsSection,
        faqSection,
        serviceAreaSection,
        businessDetailsSection,
        companyOverviewSection,
        serviceHighlightsSection,
        preFooterSection,
        footerSection
      };

      const missingSections = Object.entries(requiredSections)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

      if (missingSections.length > 0) {
        throw new Error(`Missing required sections: ${missingSections.join(', ')}`);
      }

      // Handle related entities creation with proper error handling
      let finalBusinessContactId: string | undefined;
      let finalSeoSettingsId: string | undefined;
      let finalThemeId: string | undefined;

      // Handle BusinessContact - either use provided ID or create new
      if (businessContactId) {
        finalBusinessContactId = businessContactId;
      } else if (businessContact) {
        try {
          const businessHoursData = businessContact.businessHours || [];
          delete businessContact.businessHours;

          const contact = await prisma.businessContact.create({
            data: {
              ...businessContact,
              businessHours: {
                create: businessHoursData
              }
            }
          });
          finalBusinessContactId = contact.id;
        } catch (error) {
          console.error('Error creating business contact:', error);
          throw new Error(`Failed to create business contact: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      // Handle SEOSettings - either use provided ID or create new
      if (seoSettingsId) {
        finalSeoSettingsId = seoSettingsId;
      } else if (seoSettings) {
        try {
          const seo = await prisma.sEOSettings.create({
            data: seoSettings
          });
          finalSeoSettingsId = seo.id;
        } catch (error) {
          console.error('Error creating SEO settings:', error);
          throw new Error(`Failed to create SEO settings: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      // Handle Theme - either use provided ID or create new
      if (themeId) {
        finalThemeId = themeId;
      } else if (theme) {
        try {
          const themeData = theme.create || theme;
          const createdTheme = await prisma.theme.create({
            data: themeData
          });
          finalThemeId = createdTheme.id;
        } catch (error) {
          console.error('Error creating theme:', error);
          throw new Error(`Failed to create theme: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      // Validate that all required relations are provided
      if (!finalBusinessContactId || !finalSeoSettingsId || !finalThemeId) {
        throw new Error('businessContact/businessContactId, seoSettings/seoSettingsId, and theme/themeId are required');
      }

      // Create all sections first
      try {
        // Create default CTA buttons for sections that require them
        const serviceAreaCtaButton = await prisma.ctaButton.create({
          data: {
            label: "View Service Area",
            href: "/service-areas"
          }
        });

        const aboutCtaButton = await prisma.ctaButton.create({
          data: {
            label: "Learn More About Us",
            href: "/about"
          }
        });

        const servicesCtaButton = await prisma.ctaButton.create({
          data: {
            label: "View All Services",
            href: "/services"
          }
        });

        const serviceAreaSectionCtaButton = await prisma.ctaButton.create({
          data: {
            label: "Contact Local Office",
            href: "/contact"
          }
        });

        const companyOverviewCtaButton = await prisma.ctaButton.create({
          data: {
            label: "Get Started",
            href: "/get-started"
          }
        });

        // Create ServiceArea
        const createdServiceArea = await prisma.serviceArea.create({
          data: {
            city: serviceArea.city,
            region: serviceArea.region,
            description: serviceArea.description,
            ctaButtonId: serviceAreaCtaButton.id
          }
        });

        // Create SocialLink
        const createdSocialLink = await prisma.socialLink.create({
          data: socialLink
        });

        // Create Image
        const createdImage = await prisma.images.create({
          data: image
        });

        // Create HeroSection
        const createdHeroSection = await prisma.heroSection.create({
          data: {
            title: heroSection.title,
            subtitle: heroSection.subtitle,
            description: heroSection.description
          }
        });

        // Create AboutSection
        const createdAboutSection = await prisma.aboutSection.create({
          data: {
            title: aboutSection.title,
            description: aboutSection.description,
            features: aboutSection.features || [],
            ctaButtonId: aboutCtaButton.id
          }
        });

        // Create ServicesSection
        const createdServicesSection = await prisma.servicesSection.create({
          data: {
            title: servicesSection.title,
            description: servicesSection.description,
            ctaButtonId: servicesCtaButton.id
          }
        });

        // Create GallerySection
        const createdGallerySection = await prisma.gallerySection.create({
          data: gallerySection
        });

        // Create TestimonialsSection
        const createdTestimonialsSection = await prisma.testimonialsSection.create({
          data: testimonialsSection
        });

        // Create FAQSection
        const createdFAQSection = await prisma.fAQSection.create({
          data: faqSection
        });

        // Create ServiceAreaSection
        const createdServiceAreaSection = await prisma.serviceAreaSection.create({
          data: {
            title: serviceAreaSection.title,
            description: serviceAreaSection.description,
            ctaButtonId: serviceAreaSectionCtaButton.id
          }
        });

        // Create BusinessDetailsSection
        const createdBusinessDetailsSection = await prisma.businessDetailsSection.create({
          data: {
            title: businessDetailsSection.title,
            sections: businessDetailsSection.sections ? {
              create: businessDetailsSection.sections
            } : undefined,
            contactForm: businessDetailsSection.contactForm ? {
              create: businessDetailsSection.contactForm
            } : undefined,
            map: businessDetailsSection.map ? {
              create: businessDetailsSection.map
            } : undefined
          }
        });

        // Create CompanyOverviewSection
        const createdCompanyOverviewSection = await prisma.companyOverviewSection.create({
          data: {
            title: companyOverviewSection.title,
            sections: companyOverviewSection.sections ? {
              create: companyOverviewSection.sections
            } : undefined,
            ctaButtonId: companyOverviewCtaButton.id
          }
        });

        // Create ServiceHighlightsSection
        const createdServiceHighlightsSection = await prisma.serviceHighlightsSection.create({
          data: serviceHighlightsSection
        });

        // Create PreFooterSection
        const createdPreFooterSection = await prisma.preFooterSection.create({
          data: preFooterSection
        });

        // Create FooterSection
        const createdFooterSection = await prisma.footerSection.create({
          data: footerSection
        });

        // Now create the landing page with all section IDs
        const landingPage = await prisma.landingPage.create({
          data: {
            templateId,
            businessName,
            businessContactId: finalBusinessContactId,
            seoSettingsId: finalSeoSettingsId,
            themeId: finalThemeId,
            serviceAreaId: createdServiceArea.id,
            socialLinkId: createdSocialLink.id,
            imageId: createdImage.id,
            heroSectionId: createdHeroSection.id,
            aboutSectionId: createdAboutSection.id,
            servicesSectionId: createdServicesSection.id,
            gallerySectionId: createdGallerySection.id,
            testimonialsSectionId: createdTestimonialsSection.id,
            faqSectionId: createdFAQSection.id,
            serviceAreaSectionId: createdServiceAreaSection.id,
            businessDetailsSectionId: createdBusinessDetailsSection.id,
            companyOverviewSectionId: createdCompanyOverviewSection.id,
            serviceHighlightsSectionId: createdServiceHighlightsSection.id,
            preFooterSectionId: createdPreFooterSection.id,
            footerSectionId: createdFooterSection.id,
            ...(githubUrl && { githubUrl })
          }
        });

        // Return the complete landing page with all relations
        return this.getLandingPageById(landingPage.id);

      } catch (sectionError) {
        console.error('Error creating sections:', sectionError);
        throw new Error(`Failed to create sections: ${sectionError instanceof Error ? sectionError.message : 'Unknown error'}`);
      }

    } catch (error) {
      console.error('Error creating landing page:', error);
      throw error;
    }
  }

  async updateLandingPage(id: string, data: any) {
    try {
      // Validate if landing page exists
      const existingLandingPage = await prisma.landingPage.findUnique({
        where: { id },
        include: {
          businessContact: true,
          seoSettings: true,
          theme: true,
          // One-to-one sections
          serviceArea: true,
          socialLink: true,
          image: true,
          heroSection: true,
          aboutSection: true,
          servicesSection: true,
          gallerySection: true,
          testimonialsSection: true,
          faqSection: true,
          serviceAreaSection: true,
          businessDetailsSection: true,
          companyOverviewSection: true,
          serviceHighlightsSection: true,
          preFooterSection: true,
          footerSection: true
        }
      });

      if (!existingLandingPage) {
        throw new Error('Landing page not found');
      }

      // Extract relation data and direct fields
      const {
        businessContact,
        seoSettings,
        theme,
        // One-to-one section updates
        serviceArea,
        socialLink,
        image,
        heroSection,
        aboutSection,
        servicesSection,
        gallerySection,
        testimonialsSection,
        faqSection,
        serviceAreaSection,
        businessDetailsSection,
        companyOverviewSection,
        serviceHighlightsSection,
        preFooterSection,
        footerSection,
        businessContactId,
        seoSettingsId,
        createdAt,
        updatedAt,
        ...directFields
      } = data;

      // Start with basic field updates
      const updatePayload: any = {
        ...directFields
      };

      // Handle businessContact relation
      if (businessContact && businessContact.id) {
        // Update existing business contact
        const { businessHours, ...contactData } = businessContact;
        await prisma.businessContact.update({
          where: { id: businessContact.id },
          data: contactData
        });
        
        // Handle business hours if provided
        if (businessHours && Array.isArray(businessHours)) {
          // Delete existing business hours and create new ones
          await prisma.businessHour.deleteMany({
            where: { businessContactId: businessContact.id }
          });
          
          if (businessHours.length > 0) {
            await prisma.businessHour.createMany({
              data: businessHours.map(hour => ({
                ...hour,
                businessContactId: businessContact.id
              }))
            });
          }
        }
      }

      // Handle seoSettings relation
      if (seoSettings && seoSettings.id) {
        await prisma.sEOSettings.update({
          where: { id: seoSettings.id },
          data: {
            title: seoSettings.title,
            description: seoSettings.description,
            keywords: seoSettings.keywords || [],
            favicon: seoSettings.favicon
          }
        });
      }

      // Handle theme relation
      if (theme) {
        if (theme.id) {
          // Update existing theme
          await prisma.theme.update({
            where: { id: theme.id },
            data: {
              primaryColor: theme.primaryColor,
              secondaryColor: theme.secondaryColor
            }
          });
        } else {
          // Update existing theme using themeId from landing page
          await prisma.theme.update({
            where: { id: existingLandingPage.themeId },
            data: {
              primaryColor: theme.primaryColor,
              secondaryColor: theme.secondaryColor
            }
          });
        }
      }

      // Handle individual section updates
      if (heroSection && existingLandingPage.heroSection) {
        await prisma.heroSection.update({
          where: { id: existingLandingPage.heroSection.id },
          data: {
            title: heroSection.title,
            subtitle: heroSection.subtitle,
            description: heroSection.description
          }
        });
      }

      if (aboutSection && existingLandingPage.aboutSection) {
        await prisma.aboutSection.update({
          where: { id: existingLandingPage.aboutSection.id },
          data: {
            title: aboutSection.title,
            description: aboutSection.description,
            features: aboutSection.features || []
          }
        });
      }

      if (servicesSection && existingLandingPage.servicesSection) {
        await prisma.servicesSection.update({
          where: { id: existingLandingPage.servicesSection.id },
          data: {
            title: servicesSection.title,
            description: servicesSection.description
          }
        });
      }

      if (testimonialsSection && existingLandingPage.testimonialsSection) {
        await prisma.testimonialsSection.update({
          where: { id: existingLandingPage.testimonialsSection.id },
          data: {
            title: testimonialsSection.title,
            description: testimonialsSection.description
          }
        });
      }

      if (faqSection && existingLandingPage.faqSection) {
        await prisma.fAQSection.update({
          where: { id: existingLandingPage.faqSection.id },
          data: {
            title: faqSection.title,
            description: faqSection.description
          }
        });
      }

      // Update the landing page with direct fields only
      const updatedLandingPage = await prisma.landingPage.update({
        where: { id },
        data: updatePayload
      });

      // Return the complete updated landing page
      return this.getLandingPageById(id);

    } catch (error) {
      console.error('Update landing page error:', error);
      throw error;
    }
  }

  async deleteLandingPage(id: string) {
    try {
      // Check if landing page exists
      const existingLandingPage = await prisma.landingPage.findUnique({
        where: { id }
      });

      if (!existingLandingPage) {
        throw new Error('Landing page not found');
      }

      return prisma.landingPage.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting landing page:', error);
      throw error;
    }
  }
}

export const landingPageService = new LandingPageService();