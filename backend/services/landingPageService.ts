import { PrismaClient } from '@prisma/client';
import { CreateLandingPageData } from '../types';
import { webhookService } from './webhookService';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Common includes for landing page queries
const landingPageIncludes = {
  BusinessContact: {
    include: {
      BusinessHour: true
    }
  },
  SEOSettings: true,
  Theme: true,
  ServiceArea: true,
  SocialLink: {
    include: {
      socialPlatforms: true
    }
  },
  ImagesPool: {
    include: {
      Image: true
    }
  },
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
    include: {
      CompanyOverviewSubSection: true
    }
  },
  ServiceHighlightsSection: true,
  PreFooterSection: true,
  FooterSection: true
};

class LandingPageService {
  async getAllLandingPages() {
    try {
      return await prisma.landingPage.findMany({
        include: landingPageIncludes
      });
    } catch (error) {
      console.error('Error fetching landing pages:', error);
      throw new Error('Failed to fetch landing pages');
    }
  }

  async getLandingPageById(id: string) {
    try {
      return await prisma.landingPage.findUnique({
        where: { id },
        include: landingPageIncludes
      });
    } catch (error) {
      console.error('Error fetching landing page by ID:', error);
      throw new Error('Failed to fetch landing page');
    }
  }

  async createLandingPage(data: any) {
    try {
      // Validate input data
      if (!data) {
        throw new Error('Landing page data is required');
      }
      
      console.log('Service received data:', JSON.stringify(data, null, 2));
      
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
              id: uuidv4(),
              ...businessContact,
              BusinessHour: {
                create: businessHoursData.map((hour: any) => ({
                  id: uuidv4(),
                  ...hour
                }))
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
            data: {
              id: uuidv4(),
              ...seoSettings
            }
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
            data: {
              id: uuidv4(),
              ...themeData
            }
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
            id: uuidv4(),
            label: "View Service Area",
            href: "/service-areas"
          }
        });

        const aboutCtaButton = await prisma.ctaButton.create({
          data: {
            id: uuidv4(),
            label: "Learn More About Us",
            href: "/about"
          }
        });

        const servicesCtaButton = await prisma.ctaButton.create({
          data: {
            id: uuidv4(),
            label: "View All Services",
            href: "/services"
          }
        });

        const serviceAreaSectionCtaButton = await prisma.ctaButton.create({
          data: {
            id: uuidv4(),
            label: "Contact Local Office",
            href: "/contact"
          }
        });

        const companyOverviewCtaButton = await prisma.ctaButton.create({
          data: {
            id: uuidv4(),
            label: "Get Started",
            href: "/get-started"
          }
        });

        // Create ServiceArea
        const createdServiceArea = await prisma.serviceArea.create({
          data: {
            id: uuidv4(),
            city: serviceArea.city,
            region: serviceArea.region,
            description: serviceArea.description,
            ctaButtonId: serviceAreaCtaButton.id
          }
        });

        // Create SocialLink with proper structure
        const createdSocialLink = await prisma.socialLink.create({
          data: {
            id: uuidv4(),
            name: socialLink.name || 'Social Links',
            socialPlatforms: socialLink.socialPlatforms ? {
              create: socialLink.socialPlatforms.map((platform: any) => ({
                id: uuidv4(),
                platform: platform.platform,
                url: platform.url
              }))
            } : socialLink.platform && socialLink.url ? {
              // Support legacy format with single platform/url
              create: [{
                id: uuidv4(),
                platform: socialLink.platform,
                url: socialLink.url
              }]
            } : undefined
          }
        });

        // Create ImagesPool with nested images
        const createdImagePool = await prisma.imagesPool.create({
          data: {
            id: uuidv4(),
            name: image.name || 'Landing Page Images',
            description: image.description || 'Images for this landing page',
            updatedAt: new Date(),
            Image: {
              create: image.images ? image.images.map((img: any) => ({
                id: uuidv4(),
                imageId: img.imageId,
                title: img.title,
                altText: img.altText,
                imageUrl: img.imageUrl || img.image, // Support both imageUrl and legacy image field
                category: img.category || 'hero',
                description: img.description,
                updatedAt: new Date()
              })) : [{
                id: uuidv4(),
                imageId: image.imageId,
                title: image.title,
                altText: image.altText,
                imageUrl: image.imageUrl || image.image,
                category: image.category || 'hero',
                description: image.description,
                updatedAt: new Date()
              }]
            }
          }
        });

        // Create HeroSection
        const createdHeroSection = await prisma.heroSection.create({
          data: {
            id: uuidv4(),
            title: heroSection.title,
            subtitle: heroSection.subtitle,
            description: heroSection.description
          }
        });

        // Create AboutSection
        const createdAboutSection = await prisma.aboutSection.create({
          data: {
            id: uuidv4(),
            title: aboutSection.title,
            description: aboutSection.description,
            features: aboutSection.features || [],
            ctaButtonId: aboutCtaButton.id
          }
        });

        // Create ServicesSection
        const createdServicesSection = await prisma.servicesSection.create({
          data: {
            id: uuidv4(),
            title: servicesSection.title,
            description: servicesSection.description,
            ctaButtonId: servicesCtaButton.id
          }
        });

        // Create GallerySection
        const createdGallerySection = await prisma.gallerySection.create({
          data: {
            id: uuidv4(),
            ...gallerySection
          }
        });

        // Create TestimonialsSection
        const createdTestimonialsSection = await prisma.testimonialsSection.create({
          data: {
            id: uuidv4(),
            ...testimonialsSection
          }
        });

        // Create FAQSection
        const createdFAQSection = await prisma.fAQSection.create({
          data: {
            id: uuidv4(),
            ...faqSection
          }
        });

        // Create ServiceAreaSection
        const createdServiceAreaSection = await prisma.serviceAreaSection.create({
          data: {
            id: uuidv4(),
            title: serviceAreaSection.title,
            description: serviceAreaSection.description,
            ctaButtonId: serviceAreaSectionCtaButton.id
          }
        });

        // Create BusinessDetailsSection
        const createdBusinessDetailsSection = await prisma.businessDetailsSection.create({
          data: {
            id: uuidv4(),
            title: businessDetailsSection.title,
            BusinessDetailSubSection: businessDetailsSection.sections ? {
              create: businessDetailsSection.sections.map((section: any) => ({
                id: uuidv4(),
                ...section
              }))
            } : undefined,
            BusinessContactForm: businessDetailsSection.contactForm ? {
              create: {
                id: uuidv4(),
                ...businessDetailsSection.contactForm
              }
            } : undefined,
            MapSettings: businessDetailsSection.map ? {
              create: {
                id: uuidv4(),
                ...businessDetailsSection.map
              }
            } : undefined
          }
        });

        // Create CompanyOverviewSection
        const createdCompanyOverviewSection = await prisma.companyOverviewSection.create({
          data: {
            id: uuidv4(),
            title: companyOverviewSection.title,
            CompanyOverviewSubSection: companyOverviewSection.sections ? {
              create: companyOverviewSection.sections.map((section: any) => ({
                id: uuidv4(),
                ...section
              }))
            } : undefined,
            ctaButtonId: companyOverviewCtaButton.id
          }
        });

        // Create ServiceHighlightsSection
        const createdServiceHighlightsSection = await prisma.serviceHighlightsSection.create({
          data: {
            id: uuidv4(),
            ...serviceHighlightsSection
          }
        });

        // Create PreFooterSection
        const createdPreFooterSection = await prisma.preFooterSection.create({
          data: {
            id: uuidv4(),
            ...preFooterSection
          }
        });

        // Create FooterSection
        const createdFooterSection = await prisma.footerSection.create({
          data: {
            id: uuidv4(),
            ...footerSection
          }
        });

        // Now create the landing page with nested creates and existing section IDs
        const landingPage = await prisma.landingPage.create({
          data: {
            id: uuidv4(),
            templateId,
            businessName,
            businessContactId: finalBusinessContactId,
            seoSettingsId: finalSeoSettingsId,
            themeId: finalThemeId,
            socialLinkId: createdSocialLink.id,
            imagePoolId: createdImagePool.id,
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
            updatedAt: new Date(),
            ...(githubUrl && { githubUrl })
          }
        });

        // Trigger webhooks for the created landing page
        await webhookService.triggerWebhooks('created', {
          templateId: landingPage.templateId,
          githubUrl: landingPage.githubUrl
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
          BusinessContact: true,
          SEOSettings: true,
          Theme: true,
          // Updated sections
          ServiceArea: true,
          SocialLink: {
            include: {
              socialPlatforms: true
            }
          },
          ImagesPool: {
            include: {
              Image: true
            }
          },
          HeroSection: true,
          AboutSection: true,
          ServicesSection: true,
          GallerySection: true,
          TestimonialsSection: true,
          FAQSection: true,
          ServiceAreaSection: true,
          BusinessDetailsSection: true,
          CompanyOverviewSection: true,
          ServiceHighlightsSection: true,
          PreFooterSection: true,
          FooterSection: true
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
        serviceAreas,
        socialLink,
        imagePool,
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
        themeId,
        socialLinkId,
        imagePoolId,
        heroSectionId,
        aboutSectionId,
        servicesSectionId,
        gallerySectionId,
        testimonialsSectionId,
        faqSectionId,
        serviceAreaSectionId,
        businessDetailsSectionId,
        companyOverviewSectionId,
        serviceHighlightsSectionId,
        preFooterSectionId,
        footerSectionId,
        createdAt,
        updatedAt,
        ...directFields
      } = data;

      // Start with basic field updates - only include direct LandingPage fields
      const updatePayload: any = {};
      
      // Only add basic LandingPage fields to updatePayload
      const allowedDirectFields = ['templateId', 'businessName', 'githubUrl'];
      allowedDirectFields.forEach(field => {
        if (directFields[field] !== undefined) {
          updatePayload[field] = directFields[field];
        }
      });
      
      // Always set updatedAt
      updatePayload.updatedAt = new Date();

      // Handle businessContact relation
      if (businessContact && businessContact.id) {
        console.log('Updating business contact:', businessContact);
        
        // Extract BusinessHour data (capitalized from server) and businessHours (camelCase from form)
        const { 
          businessHours, 
          BusinessHour, 
          ...contactData 
        } = businessContact;
        
        // Remove any nested relationship data that shouldn't be in the update
        const cleanContactData = { ...contactData };
        delete cleanContactData.BusinessHour;
        delete cleanContactData.businessHours;
        
        console.log('Clean contact data for update:', cleanContactData);
        
        await prisma.businessContact.update({
          where: { id: businessContact.id },
          data: cleanContactData
        });
        
        // Handle business hours if provided (check both possible field names)
        const hoursData = businessHours || BusinessHour;
        if (hoursData && Array.isArray(hoursData)) {
          console.log('Updating business hours:', hoursData);
          
          // Delete existing business hours and create new ones
          await prisma.businessHour.deleteMany({
            where: { businessContactId: businessContact.id }
          });
          
          if (hoursData.length > 0) {
            await prisma.businessHour.createMany({
              data: hoursData.map(hour => ({
                id: hour.id || uuidv4(),
                day: hour.day,
                hours: hour.hours,
                isClosed: hour.isClosed,
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
            keywords: seoSettings.keywords || []
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

      // Handle imagePool updates
      if (imagePool && existingLandingPage.ImagesPool) {
        // Update image pool basic info
        await prisma.imagesPool.update({
          where: { id: existingLandingPage.ImagesPool.id },
          data: {
            name: imagePool.name || existingLandingPage.ImagesPool.name,
            description: imagePool.description || existingLandingPage.ImagesPool.description
          }
        });
        
        // Handle images within the pool
        if (imagePool.images && Array.isArray(imagePool.images)) {
          // Delete existing images in this pool
          await prisma.image.deleteMany({
            where: { imagePoolId: existingLandingPage.ImagesPool.id }
          });
          
          // Create new images
          if (imagePool.images.length > 0) {
            await prisma.image.createMany({
              data: imagePool.images.map((img: any) => ({
                id: uuidv4(),
                imageId: img.imageId,
                title: img.title,
                altText: img.altText,
                imageUrl: img.imageUrl || img.image,
                category: img.category,
                description: img.description,
                updatedAt: new Date(),
                imagePoolId: existingLandingPage.ImagesPool.id
              }))
            });
          }
        }
      }
      
      // Handle socialLink updates
      if (socialLink && existingLandingPage.SocialLink) {
        // Update social link basic info
        await prisma.socialLink.update({
          where: { id: existingLandingPage.SocialLink.id },
          data: {
            name: socialLink.name || existingLandingPage.SocialLink.name
          }
        });
        
        // Handle social platforms
        if (socialLink.socialPlatforms && Array.isArray(socialLink.socialPlatforms)) {
          // Delete existing social platforms
          await prisma.socialPlatform.deleteMany({
            where: { socialLinkId: existingLandingPage.SocialLink.id }
          });
          
          // Create new social platforms
          if (socialLink.socialPlatforms.length > 0) {
            await prisma.socialPlatform.createMany({
              data: socialLink.socialPlatforms.map((platform: any) => ({
                id: uuidv4(),
                platform: platform.platform,
                url: platform.url,
                socialLinkId: existingLandingPage.SocialLink.id
              }))
            });
          }
        }
      }
      
      // Handle serviceAreas updates (one-to-many)
      if (serviceAreas && Array.isArray(serviceAreas)) {
        console.log('Processing service areas:', serviceAreas);
        
        // Validate and filter service areas
        const validServiceAreas = serviceAreas.filter(serviceArea => {
          // Validate required fields
          if (!serviceArea.city || !serviceArea.region || !serviceArea.description) {
            console.warn('Skipping invalid service area:', serviceArea);
            return false;
          }
          
          // Validate minimum content length (no single characters)
          if (serviceArea.city.trim().length < 2 || 
              serviceArea.region.trim().length < 2 || 
              serviceArea.description.trim().length < 5) {
            console.warn('Skipping service area with insufficient content:', serviceArea);
            return false;
          }
          
          return true;
        });
        
        console.log('Valid service areas after filtering:', validServiceAreas);
        
        // Delete existing service areas for this landing page
        await prisma.serviceArea.deleteMany({
          where: { landingPageId: existingLandingPage.id }
        });
        
        // Create new service areas only if we have valid ones
        if (validServiceAreas.length > 0) {
          for (const serviceArea of validServiceAreas) {
            // Always create a CTA button for each service area
            let ctaButtonId = serviceArea.ctaButtonId;
            
            if (!ctaButtonId) {
              // Create a default CTA button if none provided
              const ctaButton = await prisma.ctaButton.create({
                data: {
                  id: uuidv4(),
                  label: serviceArea.ctaButton?.label || `Learn More About ${serviceArea.city}`,
                  href: serviceArea.ctaButton?.href || `/service-areas/${serviceArea.city.toLowerCase().replace(/\s+/g, '-')}`
                }
              });
              ctaButtonId = ctaButton.id;
            }
            
            // Ensure ctaButtonId is not undefined
            if (!ctaButtonId) {
              throw new Error(`Failed to create or find CTA button for service area: ${serviceArea.city}`);
            }
            
            console.log('Creating service area with CTA button:', { city: serviceArea.city, ctaButtonId });
            
            await prisma.serviceArea.create({
              data: {
                id: uuidv4(),
                city: serviceArea.city.trim(),
                region: serviceArea.region.trim(),
                description: serviceArea.description.trim(),
                ctaButtonId: ctaButtonId,
                landingPageId: existingLandingPage.id
              }
            });
          }
        } else {
          console.log('No valid service areas to create');
        }
      }

      // Handle individual section updates with validation
      if (heroSection && existingLandingPage.HeroSection) {
        // Validate hero section data
        if (heroSection.title && heroSection.title.trim().length >= 3) {
          await prisma.heroSection.update({
            where: { id: existingLandingPage.HeroSection.id },
            data: {
              title: heroSection.title.trim(),
              subtitle: heroSection.subtitle ? heroSection.subtitle.trim() : heroSection.subtitle,
              description: heroSection.description ? heroSection.description.trim() : heroSection.description
            }
          });
        } else {
          console.warn('Skipping hero section update due to invalid title:', heroSection.title);
        }
      }

      if (aboutSection && existingLandingPage.AboutSection) {
        // Validate about section data
        if (aboutSection.title && aboutSection.title.trim().length >= 3) {
          await prisma.aboutSection.update({
            where: { id: existingLandingPage.AboutSection.id },
            data: {
              title: aboutSection.title.trim(),
              description: aboutSection.description ? aboutSection.description.trim() : aboutSection.description,
              features: Array.isArray(aboutSection.features) ? 
                aboutSection.features.filter((f: any) => f && f.trim().length >= 3).map((f: any) => f.trim()) : 
                aboutSection.features || []
            }
          });
        } else {
          console.warn('Skipping about section update due to invalid title:', aboutSection.title);
        }
      }

      if (servicesSection && existingLandingPage.ServicesSection) {
        // Validate services section data
        if (servicesSection.title && servicesSection.title.trim().length >= 3) {
          await prisma.servicesSection.update({
            where: { id: existingLandingPage.ServicesSection.id },
            data: {
              title: servicesSection.title.trim(),
              description: servicesSection.description ? servicesSection.description.trim() : servicesSection.description
            }
          });
        } else {
          console.warn('Skipping services section update due to invalid title:', servicesSection.title);
        }
      }

      if (testimonialsSection && existingLandingPage.TestimonialsSection) {
        // Validate testimonials section data
        if (testimonialsSection.title && testimonialsSection.title.trim().length >= 3) {
          await prisma.testimonialsSection.update({
            where: { id: existingLandingPage.TestimonialsSection.id },
            data: {
              title: testimonialsSection.title.trim(),
              description: testimonialsSection.description ? testimonialsSection.description.trim() : testimonialsSection.description
            }
          });
        } else {
          console.warn('Skipping testimonials section update due to invalid title:', testimonialsSection.title);
        }
      }

      if (faqSection && existingLandingPage.FAQSection) {
        // Validate FAQ section data
        if (faqSection.title && faqSection.title.trim().length >= 3) {
          await prisma.fAQSection.update({
            where: { id: existingLandingPage.FAQSection.id },
            data: {
              title: faqSection.title.trim(),
              description: faqSection.description ? faqSection.description.trim() : faqSection.description
            }
          });
        } else {
          console.warn('Skipping FAQ section update due to invalid title:', faqSection.title);
        }
      }

      // Update the landing page with direct fields only
      const updatedLandingPage = await prisma.landingPage.update({
        where: { id },
        data: updatePayload
      });

      // Trigger webhooks for the updated landing page
      await webhookService.triggerWebhooks('updated', {
        templateId: updatedLandingPage.templateId,
        githubUrl: updatedLandingPage.githubUrl
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
      // Check if landing page exists and fetch all related IDs
      const existingLandingPage = await prisma.landingPage.findUnique({
        where: { id },
        include: {
          ServiceArea: true,
          BusinessContact: {
            include: {
              BusinessHour: true
            }
          },
          SEOSettings: true,
          Theme: true,
          SocialLink: {
            include: {
              socialPlatforms: true
            }
          },
          ImagesPool: {
            include: {
              Image: true
            }
          },
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
            include: {
              CompanyOverviewSubSection: true
            }
          },
          ServiceHighlightsSection: true,
          PreFooterSection: true,
          FooterSection: true
        }
      });

      if (!existingLandingPage) {
        throw new Error('Landing page not found');
      }

      console.log('Deleting landing page and all related data:', id);

      // Delete all related data in proper order (child entities first)
      // This ensures referential integrity is maintained during deletion

      // 1. Delete ServiceArea records (one-to-many relationship)
      if (existingLandingPage.ServiceArea.length > 0) {
        console.log('Deleting service areas...');
        await prisma.serviceArea.deleteMany({
          where: { landingPageId: id }
        });
      }

      // 2. Delete BusinessHour records (related to BusinessContact)
      if (existingLandingPage.BusinessContact.BusinessHour.length > 0) {
        console.log('Deleting business hours...');
        await prisma.businessHour.deleteMany({
          where: { businessContactId: existingLandingPage.BusinessContact.id }
        });
      }

      // 3. Delete Image records (related to ImagesPool) - these have cascade delete
      // SocialPlatforms also have cascade delete, so they'll be handled automatically

      // 4. Delete business detail sub-sections
      if (existingLandingPage.BusinessDetailsSection.BusinessDetailSubSection.length > 0) {
        console.log('Deleting business detail sub-sections...');
        await prisma.businessDetailSubSection.deleteMany({
          where: { businessDetailsSectionId: existingLandingPage.BusinessDetailsSection.id }
        });
      }

      // 5. Delete business contact form
      if (existingLandingPage.BusinessDetailsSection.BusinessContactForm) {
        console.log('Deleting business contact form...');
        await prisma.businessContactForm.delete({
          where: { id: existingLandingPage.BusinessDetailsSection.BusinessContactForm.id }
        });
      }

      // 6. Delete map settings
      if (existingLandingPage.BusinessDetailsSection.MapSettings) {
        console.log('Deleting map settings...');
        await prisma.mapSettings.delete({
          where: { id: existingLandingPage.BusinessDetailsSection.MapSettings.id }
        });
      }

      // 7. Delete company overview sub-sections
      if (existingLandingPage.CompanyOverviewSection.CompanyOverviewSubSection.length > 0) {
        console.log('Deleting company overview sub-sections...');
        await prisma.companyOverviewSubSection.deleteMany({
          where: { companyOverviewSectionId: existingLandingPage.CompanyOverviewSection.id }
        });
      }

      // 8. Delete the landing page first to remove all foreign key references
      console.log('Deleting landing page...');
      const result = await prisma.landingPage.delete({
        where: { id }
      });

      // 9. Delete all section records (now safe since landing page is gone)
      console.log('Deleting sections...');
      await Promise.all([
        prisma.heroSection.delete({ where: { id: existingLandingPage.heroSectionId } }),
        prisma.aboutSection.delete({ where: { id: existingLandingPage.aboutSectionId } }),
        prisma.servicesSection.delete({ where: { id: existingLandingPage.servicesSectionId } }),
        prisma.gallerySection.delete({ where: { id: existingLandingPage.gallerySectionId } }),
        prisma.testimonialsSection.delete({ where: { id: existingLandingPage.testimonialsSectionId } }),
        prisma.fAQSection.delete({ where: { id: existingLandingPage.faqSectionId } }),
        prisma.serviceAreaSection.delete({ where: { id: existingLandingPage.serviceAreaSectionId } }),
        prisma.businessDetailsSection.delete({ where: { id: existingLandingPage.businessDetailsSectionId } }),
        prisma.companyOverviewSection.delete({ where: { id: existingLandingPage.companyOverviewSectionId } }),
        prisma.serviceHighlightsSection.delete({ where: { id: existingLandingPage.serviceHighlightsSectionId } }),
        prisma.preFooterSection.delete({ where: { id: existingLandingPage.preFooterSectionId } }),
        prisma.footerSection.delete({ where: { id: existingLandingPage.footerSectionId } })
      ]);

      // 10. Delete related entities that were referenced by the landing page
      console.log('Deleting related entities...');
      await Promise.all([
        prisma.businessContact.delete({ where: { id: existingLandingPage.businessContactId } }),
        prisma.sEOSettings.delete({ where: { id: existingLandingPage.seoSettingsId } }),
        prisma.theme.delete({ where: { id: existingLandingPage.themeId } }),
        prisma.socialLink.delete({ where: { id: existingLandingPage.socialLinkId } }), // This will cascade delete socialPlatforms
        prisma.imagesPool.delete({ where: { id: existingLandingPage.imagePoolId } }) // This will cascade delete images
      ]);

      // 11. Delete CTA buttons that were referenced by sections (optional cleanup)
      // Note: We could implement reference counting here in the future

      console.log('Successfully deleted landing page and all related data');
      return result;
      
    } catch (error) {
      console.error('Error deleting landing page:', error);
      throw error;
    }
  }
}

export const landingPageService = new LandingPageService();