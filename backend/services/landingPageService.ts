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
        heroSections: true,
        aboutSections: true,
        servicesSections: true,
        testimonialsSections: true,
        faqSections: true,
        serviceAreaSections: true,
        companyOverviewSections: true,
        serviceHighlightsSections: true,
        preFooterSections: true,
        footerSections: true,
        theme: true,
        images: true,
        socialLinks: true,
        serviceAreas: true
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
        heroSections: true,
        aboutSections: true,
        servicesSections: true,
        testimonialsSections: true,
        faqSections: true,
        serviceAreaSections: true,
        companyOverviewSections: true,
        serviceHighlightsSections: true,
        preFooterSections: true,
        footerSections: true,
        theme: true,
        images: true,
        socialLinks: true,
        serviceAreas: true
      }
    });
  }

  async createLandingPage(data: any) {
    try {
      // Extract all valid fields for LandingPage model
      const {
        templateId,
        businessName,
        githubUrl,
        businessContact,
        seoSettings,
        theme,
        serviceAreas,
        socialLinks,
        images,
        heroSections,
        aboutSections,
        servicesSections,
        gallerySections,
        testimonialsSections,
        faqSections,
        serviceAreaSections,
        businessDetailsSections,
        companyOverviewSections,
        serviceHighlightsSections,
        preFooterSections,
        footerSections,
        ...otherData
      } = data;

      // Validate required fields
      if (!templateId || !businessName) {
        throw new Error('templateId and businessName are required');
      }

      // Handle related entities creation with proper error handling
      let businessContactId: string | undefined;
      let seoSettingsId: string | undefined;

      // Create BusinessContact if provided
      if (businessContact) {
        try {
          // Handle nested BusinessHour creation
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
          businessContactId = contact.id;
        } catch (error) {
          console.error('Error creating business contact:', error);
          throw new Error(`Failed to create business contact: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      // Create SEOSettings if provided
      if (seoSettings) {
        try {
          const seo = await prisma.sEOSettings.create({
            data: seoSettings
          });
          seoSettingsId = seo.id;
        } catch (error) {
          console.error('Error creating SEO settings:', error);
          throw new Error(`Failed to create SEO settings: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      // Create the landing page first
      const landingPageData = {
        templateId,
        businessName,
        ...(githubUrl && { githubUrl }),
        ...(businessContactId && { businessContactId }),
        ...(seoSettingsId && { seoSettingsId })
      };

      const landingPage = await prisma.landingPage.create({
        data: landingPageData
      });

      // Create related sections and entities
      try {
        // Create Theme if provided
        if (theme) {
          await prisma.theme.create({
            data: {
              ...theme,
              landingPage: {
                connect: { id: landingPage.id }
              }
            }
          });
        }

        // Create Images if provided
        if (images && Array.isArray(images)) {
          await prisma.images.createMany({
            data: images.map((image: any) => ({
              ...image,
              templateId: landingPage.id
            }))
          });
        }

        // Create SocialLinks if provided
        if (socialLinks && Array.isArray(socialLinks)) {
          await prisma.socialLink.createMany({
            data: socialLinks.map((link: any) => ({
              ...link
            }))
          }).catch(() => {
            // If createMany fails due to relation, try individual creates
            return Promise.all(
              socialLinks.map((link: any) => 
                prisma.socialLink.create({
                  data: {
                    ...link,
                    templates: {
                      connect: { id: landingPage.id }
                    }
                  }
                })
              )
            );
          });
        }

        // Create ServiceAreas if provided
        if (serviceAreas && Array.isArray(serviceAreas)) {
          await Promise.all(
            serviceAreas.map((area: any) => 
              prisma.serviceArea.create({
                data: {
                  ...area,
                  landingPages: {
                    connect: { id: landingPage.id }
                  }
                }
              })
            )
          );
        }

        // Create HeroSections if provided
        if (heroSections && Array.isArray(heroSections)) {
          await Promise.all(
            heroSections.map((section: any) => 
              prisma.heroSection.create({
                data: {
                  ...section,
                  template: {
                    connect: { id: landingPage.id }
                  }
                }
              })
            )
          );
        }

        // Create AboutSections if provided
        if (aboutSections && Array.isArray(aboutSections)) {
          await Promise.all(
            aboutSections.map((section: any) => 
              prisma.aboutSection.create({
                data: {
                  ...section,
                  template: {
                    connect: { id: landingPage.id }
                  }
                }
              })
            )
          );
        }

        // Create ServicesSections if provided
        if (servicesSections && Array.isArray(servicesSections)) {
          await Promise.all(
            servicesSections.map((section: any) => 
              prisma.servicesSection.create({
                data: {
                  ...section,
                  template: {
                    connect: { id: landingPage.id }
                  }
                }
              })
            )
          );
        }

        // Create TestimonialsSections if provided
        if (testimonialsSections && Array.isArray(testimonialsSections)) {
          await Promise.all(
            testimonialsSections.map((section: any) => 
              prisma.testimonialsSection.create({
                data: {
                  ...section,
                  template: {
                    connect: { id: landingPage.id }
                  }
                }
              })
            )
          );
        }

        // Create FAQSections if provided
        if (faqSections && Array.isArray(faqSections)) {
          await Promise.all(
            faqSections.map((section: any) => 
              prisma.fAQSection.create({
                data: {
                  ...section,
                  template: {
                    connect: { id: landingPage.id }
                  }
                }
              })
            )
          );
        }

        // Create ServiceAreaSections if provided
        if (serviceAreaSections && Array.isArray(serviceAreaSections)) {
          await Promise.all(
            serviceAreaSections.map((section: any) => 
              prisma.serviceAreaSection.create({
                data: {
                  ...section,
                  template: {
                    connect: { id: landingPage.id }
                  }
                }
              })
            )
          );
        }

        // Create CompanyOverviewSections if provided
        if (companyOverviewSections && Array.isArray(companyOverviewSections)) {
          await Promise.all(
            companyOverviewSections.map((section: any) => 
              prisma.companyOverviewSection.create({
                data: {
                  ...section,
                  template: {
                    connect: { id: landingPage.id }
                  }
                }
              })
            )
          );
        }

        // Create ServiceHighlightsSections if provided
        if (serviceHighlightsSections && Array.isArray(serviceHighlightsSections)) {
          await Promise.all(
            serviceHighlightsSections.map((section: any) => 
              prisma.serviceHighlightsSection.create({
                data: {
                  ...section,
                  template: {
                    connect: { id: landingPage.id }
                  }
                }
              })
            )
          );
        }

        // Create PreFooterSections if provided
        if (preFooterSections && Array.isArray(preFooterSections)) {
          await Promise.all(
            preFooterSections.map((section: any) => 
              prisma.preFooterSection.create({
                data: {
                  ...section,
                  template: {
                    connect: { id: landingPage.id }
                  }
                }
              })
            )
          );
        }

        // Create FooterSections if provided
        if (footerSections && Array.isArray(footerSections)) {
          await Promise.all(
            footerSections.map((section: any) => 
              prisma.footerSection.create({
                data: {
                  ...section,
                  template: {
                    connect: { id: landingPage.id }
                  }
                }
              })
            )
          );
        }

      } catch (sectionError) {
        console.error('Error creating sections:', sectionError);
        // Don't throw here to avoid losing the main landing page creation
      }

      // Return the complete landing page with all relations
      return this.getLandingPageById(landingPage.id);

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
          heroSections: true,
          aboutSections: true,
          servicesSections: true,
          testimonialsSections: true,
          faqSections: true,
          serviceAreaSections: true,
          companyOverviewSections: true,
          serviceHighlightsSections: true,
          preFooterSections: true,
          footerSections: true
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
        heroSections,
        aboutSections,
        servicesSections,
        testimonialsSections,
        faqSections,
        serviceAreaSections,
        companyOverviewSections,
        serviceHighlightsSections,
        preFooterSections,
        footerSections,
        images,
        socialLinks,
        serviceAreas,
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
        } else if (existingLandingPage.theme) {
          // Update existing theme if no ID provided
          await prisma.theme.update({
            where: { id: existingLandingPage.theme.id },
            data: {
              primaryColor: theme.primaryColor,
              secondaryColor: theme.secondaryColor
            }
          });
        } else {
          // Create new theme
          await prisma.theme.create({
            data: {
              primaryColor: theme.primaryColor,
              secondaryColor: theme.secondaryColor,
              landingPageId: id
            }
          });
        }
      }

      // Handle heroSections - update existing ones
      if (heroSections && Array.isArray(heroSections)) {
        for (const section of heroSections) {
          if (section.id) {
            await prisma.heroSection.update({
              where: { id: section.id },
              data: {
                title: section.title,
                subtitle: section.subtitle,
                description: section.description
              }
            });
          }
        }
      }

      // Handle aboutSections - update existing ones
      if (aboutSections && Array.isArray(aboutSections)) {
        for (const section of aboutSections) {
          if (section.id) {
            await prisma.aboutSection.update({
              where: { id: section.id },
              data: {
                title: section.title,
                description: section.description,
                features: section.features || []
              }
            });
          }
        }
      }

      // Handle servicesSections - update existing ones
      if (servicesSections && Array.isArray(servicesSections)) {
        for (const section of servicesSections) {
          if (section.id) {
            await prisma.servicesSection.update({
              where: { id: section.id },
              data: {
                title: section.title,
                description: section.description
              }
            });
          }
        }
      }

      // Handle testimonialsSections - update existing ones
      if (testimonialsSections && Array.isArray(testimonialsSections)) {
        for (const section of testimonialsSections) {
          if (section.id) {
            await prisma.testimonialsSection.update({
              where: { id: section.id },
              data: {
                title: section.title,
                description: section.description
              }
            });
          }
        }
      }

      // Handle faqSections - update existing ones
      if (faqSections && Array.isArray(faqSections)) {
        for (const section of faqSections) {
          if (section.id) {
            await prisma.fAQSection.update({
              where: { id: section.id },
              data: {
                title: section.title,
                description: section.description
              }
            });
          }
        }
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