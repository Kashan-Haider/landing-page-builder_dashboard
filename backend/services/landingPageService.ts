import { PrismaClient } from '@prisma/client';
import { CreateLandingPageData } from '../types';
import { webhookService } from './webhookService';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const includes = {
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

async function createRelatedEntities(data: any) {
  let businessContactId = data.businessContactId;
  let seoSettingsId = data.seoSettingsId;
  let themeId = data.themeId;

  if (!businessContactId && data.businessContact) {
    const businessHoursData = data.businessContact.businessHours || [];
    delete data.businessContact.businessHours;

    const contact = await prisma.businessContact.create({
      data: {
        id: uuidv4(),
        ...data.businessContact,
        BusinessHour: {
          create: businessHoursData.map((hour: any) => ({
            id: uuidv4(),
            ...hour
          }))
        }
      }
    });
    businessContactId = contact.id;
  }

  if (!seoSettingsId && data.seoSettings) {
    const seo = await prisma.sEOSettings.create({
      data: { id: uuidv4(), ...data.seoSettings }
    });
    seoSettingsId = seo.id;
  }

  if (!themeId && data.theme) {
    const themeData = data.theme.create || data.theme;
    const createdTheme = await prisma.theme.create({
      data: { id: uuidv4(), ...themeData }
    });
    themeId = createdTheme.id;
  }

  return { businessContactId, seoSettingsId, themeId };
}

async function createCtaButtons() {
  const buttons = await Promise.all([
    prisma.ctaButton.create({
      data: { id: uuidv4(), label: "View Service Area", href: "/service-areas" }
    }),
    prisma.ctaButton.create({
      data: { id: uuidv4(), label: "Learn More About Us", href: "/about" }
    }),
    prisma.ctaButton.create({
      data: { id: uuidv4(), label: "View All Services", href: "/services" }
    }),
    prisma.ctaButton.create({
      data: { id: uuidv4(), label: "Contact Local Office", href: "/contact" }
    }),
    prisma.ctaButton.create({
      data: { id: uuidv4(), label: "Get Started", href: "/get-started" }
    })
  ]);

  return {
    serviceArea: buttons[0].id,
    about: buttons[1].id,
    services: buttons[2].id,
    serviceAreaSection: buttons[3].id,
    companyOverview: buttons[4].id
  };
}

async function createSections(data: any, ctaIds: any) {
  const {
    serviceArea, socialLink, image, heroSection, aboutSection, servicesSection,
    gallerySection, testimonialsSection, faqSection, serviceAreaSection,
    businessDetailsSection, companyOverviewSection, serviceHighlightsSection,
    preFooterSection, footerSection
  } = data;

  const serviceAreaData = await prisma.serviceArea.create({
    data: {
      id: uuidv4(),
      city: serviceArea.city,
      region: serviceArea.region,
      description: serviceArea.description,
      ctaButtonId: ctaIds.serviceArea
    }
  });

  const socialLinkData = await prisma.socialLink.create({
    data: {
      id: uuidv4(),
      name: socialLink.name || 'Social Links',
      socialPlatforms: socialLink.socialPlatforms ? {
        create: socialLink.socialPlatforms.map((platform: any) => ({
          id: uuidv4(),
          platform: platform.platform,
          url: platform.url
        }))
      } : undefined
    }
  });

  const imagePoolData = await prisma.imagesPool.create({
    data: {
      id: uuidv4(),
      name: image.name || 'Landing Page Images',
      description: image.description || 'Images for this landing page',
      updatedAt: new Date(),
      Image: {
        create: (image.images || [image]).map((img: any) => ({
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

  const sections = await Promise.all([
    prisma.heroSection.create({
      data: {
        id: uuidv4(),
        title: heroSection.title,
        subtitle: heroSection.subtitle,
        description: heroSection.description
      }
    }),
    prisma.aboutSection.create({
      data: {
        id: uuidv4(),
        title: aboutSection.title,
        description: aboutSection.description,
        features: aboutSection.features || [],
        ctaButtonId: ctaIds.about
      }
    }),
    prisma.servicesSection.create({
      data: {
        id: uuidv4(),
        title: servicesSection.title,
        description: servicesSection.description,
        ctaButtonId: ctaIds.services
      }
    }),
    prisma.gallerySection.create({
      data: { id: uuidv4(), ...gallerySection }
    }),
    prisma.testimonialsSection.create({
      data: { id: uuidv4(), ...testimonialsSection }
    }),
    prisma.fAQSection.create({
      data: { id: uuidv4(), ...faqSection }
    }),
    prisma.serviceAreaSection.create({
      data: {
        id: uuidv4(),
        title: serviceAreaSection.title,
        description: serviceAreaSection.description,
        ctaButtonId: ctaIds.serviceAreaSection
      }
    }),
    prisma.businessDetailsSection.create({
      data: {
        id: uuidv4(),
        title: businessDetailsSection.title,
        BusinessDetailSubSection: businessDetailsSection.sections ? {
          create: businessDetailsSection.sections.map((section: any) => ({
            id: uuidv4(),
            ...section
          }))
        } : undefined
      }
    }),
    prisma.companyOverviewSection.create({
      data: {
        id: uuidv4(),
        title: companyOverviewSection.title,
        CompanyOverviewSubSection: companyOverviewSection.sections ? {
          create: companyOverviewSection.sections.map((section: any) => ({
            id: uuidv4(),
            ...section
          }))
        } : undefined,
        ctaButtonId: ctaIds.companyOverview
      }
    }),
    prisma.serviceHighlightsSection.create({
      data: { id: uuidv4(), ...serviceHighlightsSection }
    }),
    prisma.preFooterSection.create({
      data: { id: uuidv4(), ...preFooterSection }
    }),
    prisma.footerSection.create({
      data: { id: uuidv4(), ...footerSection }
    })
  ]);

  return {
    serviceArea: serviceAreaData,
    socialLink: socialLinkData,
    imagePool: imagePoolData,
    hero: sections[0],
    about: sections[1],
    services: sections[2],
    gallery: sections[3],
    testimonials: sections[4],
    faq: sections[5],
    serviceAreaSection: sections[6],
    businessDetails: sections[7],
    companyOverview: sections[8],
    serviceHighlights: sections[9],
    preFooter: sections[10],
    footer: sections[11]
  };
}

class LandingPageService {
  async getAllLandingPages() {
    try {
      return await prisma.landingPage.findMany({ include: includes });
    } catch (error) {
      throw new Error('Failed to fetch landing pages');
    }
  }

  async getLandingPageById(id: string) {
    try {
      return await prisma.landingPage.findUnique({
        where: { id },
        include: includes
      });
    } catch (error) {
      throw new Error('Failed to fetch landing page');
    }
  }

  async createLandingPage(data: any) {
    try {
      if (!data.templateId || !data.businessName) {
        throw new Error('templateId and businessName are required');
      }

      const requiredSections = [
        'serviceArea', 'socialLink', 'image', 'heroSection', 'aboutSection',
        'servicesSection', 'gallerySection', 'testimonialsSection', 'faqSection',
        'serviceAreaSection', 'businessDetailsSection', 'companyOverviewSection',
        'serviceHighlightsSection', 'preFooterSection', 'footerSection'
      ];

      const missing = requiredSections.filter(section => !data[section]);
      if (missing.length > 0) {
        throw new Error(`Missing required sections: ${missing.join(', ')}`);
      }

      const { businessContactId, seoSettingsId, themeId } = await createRelatedEntities(data);

      if (!businessContactId || !seoSettingsId || !themeId) {
        throw new Error('businessContact, seoSettings, and theme are required');
      }

      const ctaIds = await createCtaButtons();
      const sections = await createSections(data, ctaIds);

      const landingPage = await prisma.landingPage.create({
        data: {
          id: uuidv4(),
          templateId: data.templateId,
          businessName: data.businessName,
          businessContactId,
          seoSettingsId,
          themeId,
          socialLinkId: sections.socialLink.id,
          imagePoolId: sections.imagePool.id,
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

      await webhookService.triggerWebhooks('created', {
        templateId: landingPage.templateId,
        githubUrl: landingPage.githubUrl
      });

      return this.getLandingPageById(landingPage.id);
    } catch (error) {
      throw error;
    }
  }

  async updateLandingPage(id: string, data: any) {
    try {
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

      const updateData: any = { updatedAt: new Date() };

      ['templateId', 'businessName', 'githubUrl'].forEach(field => {
        if (data[field] !== undefined) {
          updateData[field] = data[field];
        }
      });

      if (data.businessContact && data.businessContact.id) {
        const { businessHours, BusinessHour, ...contactData } = data.businessContact;
        delete contactData.BusinessHour;
        delete contactData.businessHours;

        await prisma.businessContact.update({
          where: { id: data.businessContact.id },
          data: contactData
        });
      }

      if (data.seoSettings && data.seoSettings.id) {
        await prisma.sEOSettings.update({
          where: { id: data.seoSettings.id },
          data: {
            title: data.seoSettings.title,
            description: data.seoSettings.description,
            keywords: data.seoSettings.keywords || []
          }
        });
      }

      if (data.heroSection && existing.HeroSection) {
        if (data.heroSection.title && data.heroSection.title.trim().length >= 3) {
          await prisma.heroSection.update({
            where: { id: existing.HeroSection.id },
            data: {
              title: data.heroSection.title.trim(),
              subtitle: data.heroSection.subtitle,
              description: data.heroSection.description
            }
          });
        }
      }

      const updatedPage = await prisma.landingPage.update({
        where: { id },
        data: updateData
      });

      await webhookService.triggerWebhooks('updated', {
        templateId: updatedPage.templateId,
        githubUrl: updatedPage.githubUrl
      });

      return this.getLandingPageById(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteLandingPage(id: string) {
    try {
      const existing = await prisma.landingPage.findUnique({
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

      if (!existing) {
        throw new Error('Landing page not found');
      }

      if (existing.ServiceArea.length > 0) {
        await prisma.serviceArea.deleteMany({ where: { landingPageId: id } });
      }

      if (existing.BusinessContact.BusinessHour.length > 0) {
        await prisma.businessHour.deleteMany({
          where: { businessContactId: existing.BusinessContact.id }
        });
      }

      const result = await prisma.landingPage.delete({ where: { id } });

      await Promise.all([
        prisma.heroSection.delete({ where: { id: existing.heroSectionId } }),
        prisma.aboutSection.delete({ where: { id: existing.aboutSectionId } }),
        prisma.servicesSection.delete({ where: { id: existing.servicesSectionId } }),
        prisma.gallerySection.delete({ where: { id: existing.gallerySectionId } }),
        prisma.testimonialsSection.delete({ where: { id: existing.testimonialsSectionId } }),
        prisma.fAQSection.delete({ where: { id: existing.faqSectionId } }),
        prisma.serviceAreaSection.delete({ where: { id: existing.serviceAreaSectionId } }),
        prisma.businessDetailsSection.delete({ where: { id: existing.businessDetailsSectionId } }),
        prisma.companyOverviewSection.delete({ where: { id: existing.companyOverviewSectionId } }),
        prisma.serviceHighlightsSection.delete({ where: { id: existing.serviceHighlightsSectionId } }),
        prisma.preFooterSection.delete({ where: { id: existing.preFooterSectionId } }),
        prisma.footerSection.delete({ where: { id: existing.footerSectionId } })
      ]);

      await Promise.all([
        prisma.businessContact.delete({ where: { id: existing.businessContactId } }),
        prisma.sEOSettings.delete({ where: { id: existing.seoSettingsId } }),
        prisma.theme.delete({ where: { id: existing.themeId } }),
        prisma.socialLink.delete({ where: { id: existing.socialLinkId } }),
        prisma.imagesPool.delete({ where: { id: existing.imagePoolId } })
      ]);

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export const landingPageService = new LandingPageService();
