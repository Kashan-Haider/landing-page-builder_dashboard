-- CreateTable
CREATE TABLE "public"."LandingPage" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "serviceAreaId" TEXT NOT NULL,
    "socialLinkId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "heroSectionId" TEXT NOT NULL,
    "aboutSectionId" TEXT NOT NULL,
    "servicesSectionId" TEXT NOT NULL,
    "gallerySectionId" TEXT NOT NULL,
    "testimonialsSectionId" TEXT NOT NULL,
    "faqSectionId" TEXT NOT NULL,
    "serviceAreaSectionId" TEXT NOT NULL,
    "businessDetailsSectionId" TEXT NOT NULL,
    "companyOverviewSectionId" TEXT NOT NULL,
    "serviceHighlightsSectionId" TEXT NOT NULL,
    "preFooterSectionId" TEXT NOT NULL,
    "footerSectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "seoSettingsId" TEXT NOT NULL,
    "businessContactId" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,

    CONSTRAINT "LandingPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SEOSettings" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT[],
    "favicon" TEXT NOT NULL,

    CONSTRAINT "SEOSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Images" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessContact" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "emergencyPhone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emergencyEmail" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BusinessContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessHour" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "isClosed" BOOLEAN NOT NULL,
    "businessContactId" TEXT NOT NULL,

    CONSTRAINT "BusinessHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SocialLink" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CtaButton" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,

    CONSTRAINT "CtaButton_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT[],
    "ctaButtonId" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GalleryItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "ctaButtonId" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Testimonial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FAQItem" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "FAQItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceArea" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ctaButtonId" TEXT NOT NULL,

    CONSTRAINT "ServiceArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Statistic" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Statistic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FooterServiceArea" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "services" TEXT[],

    CONSTRAINT "FooterServiceArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HeroSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "HeroSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AboutSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT[],
    "ctaButtonId" TEXT NOT NULL,

    CONSTRAINT "AboutSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServicesSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ctaButtonId" TEXT NOT NULL,

    CONSTRAINT "ServicesSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GallerySection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "GallerySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TestimonialsSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "TestimonialsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FAQSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "FAQSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceAreaSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ctaButtonId" TEXT NOT NULL,

    CONSTRAINT "ServiceAreaSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessDetailsSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "BusinessDetailsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessDetailSubSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ctaTitle" TEXT NOT NULL,
    "businessDetailsSectionId" TEXT NOT NULL,

    CONSTRAINT "BusinessDetailSubSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessContactForm" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "businessDetailsSectionId" TEXT NOT NULL,

    CONSTRAINT "BusinessContactForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MapSettings" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "locationName" TEXT NOT NULL,
    "businessDetailsSectionId" TEXT NOT NULL,

    CONSTRAINT "MapSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyOverviewSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ctaButtonId" TEXT NOT NULL,

    CONSTRAINT "CompanyOverviewSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyOverviewSubSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "companyOverviewSectionId" TEXT NOT NULL,

    CONSTRAINT "CompanyOverviewSubSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceHighlightsSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ServiceHighlightsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PreFooterSection" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PreFooterSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FooterSection" (
    "id" TEXT NOT NULL,
    "copyright" TEXT NOT NULL,

    CONSTRAINT "FooterSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WebhookConfig" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "events" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebhookConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WebhookLog" (
    "id" TEXT NOT NULL,
    "webhookId" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "retryCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WebhookLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Theme" (
    "id" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "secondaryColor" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_CtaButtonToHeroSection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CtaButtonToHeroSection_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_ServicesSectionServices" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ServicesSectionServices_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_TestimonialsSectionGalleryItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TestimonialsSectionGalleryItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_TestimonialsSectionTestimonials" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TestimonialsSectionTestimonials_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_FAQSectionFAQItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FAQSectionFAQItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_ServiceHighlightsSectionStatistics" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ServiceHighlightsSectionStatistics_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_FooterSectionServiceAreas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FooterSectionServiceAreas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_serviceAreaId_key" ON "public"."LandingPage"("serviceAreaId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_socialLinkId_key" ON "public"."LandingPage"("socialLinkId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_imageId_key" ON "public"."LandingPage"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_heroSectionId_key" ON "public"."LandingPage"("heroSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_aboutSectionId_key" ON "public"."LandingPage"("aboutSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_servicesSectionId_key" ON "public"."LandingPage"("servicesSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_gallerySectionId_key" ON "public"."LandingPage"("gallerySectionId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_testimonialsSectionId_key" ON "public"."LandingPage"("testimonialsSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_faqSectionId_key" ON "public"."LandingPage"("faqSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_serviceAreaSectionId_key" ON "public"."LandingPage"("serviceAreaSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_businessDetailsSectionId_key" ON "public"."LandingPage"("businessDetailsSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_companyOverviewSectionId_key" ON "public"."LandingPage"("companyOverviewSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_serviceHighlightsSectionId_key" ON "public"."LandingPage"("serviceHighlightsSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_preFooterSectionId_key" ON "public"."LandingPage"("preFooterSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_footerSectionId_key" ON "public"."LandingPage"("footerSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_themeId_key" ON "public"."LandingPage"("themeId");

-- CreateIndex
CREATE UNIQUE INDEX "Images_imageId_key" ON "public"."Images"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessContactForm_businessDetailsSectionId_key" ON "public"."BusinessContactForm"("businessDetailsSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "MapSettings_businessDetailsSectionId_key" ON "public"."MapSettings"("businessDetailsSectionId");

-- CreateIndex
CREATE INDEX "_CtaButtonToHeroSection_B_index" ON "public"."_CtaButtonToHeroSection"("B");

-- CreateIndex
CREATE INDEX "_ServicesSectionServices_B_index" ON "public"."_ServicesSectionServices"("B");

-- CreateIndex
CREATE INDEX "_TestimonialsSectionGalleryItems_B_index" ON "public"."_TestimonialsSectionGalleryItems"("B");

-- CreateIndex
CREATE INDEX "_TestimonialsSectionTestimonials_B_index" ON "public"."_TestimonialsSectionTestimonials"("B");

-- CreateIndex
CREATE INDEX "_FAQSectionFAQItems_B_index" ON "public"."_FAQSectionFAQItems"("B");

-- CreateIndex
CREATE INDEX "_ServiceHighlightsSectionStatistics_B_index" ON "public"."_ServiceHighlightsSectionStatistics"("B");

-- CreateIndex
CREATE INDEX "_FooterSectionServiceAreas_B_index" ON "public"."_FooterSectionServiceAreas"("B");

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_serviceAreaId_fkey" FOREIGN KEY ("serviceAreaId") REFERENCES "public"."ServiceArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_socialLinkId_fkey" FOREIGN KEY ("socialLinkId") REFERENCES "public"."SocialLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."Images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_heroSectionId_fkey" FOREIGN KEY ("heroSectionId") REFERENCES "public"."HeroSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_aboutSectionId_fkey" FOREIGN KEY ("aboutSectionId") REFERENCES "public"."AboutSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_servicesSectionId_fkey" FOREIGN KEY ("servicesSectionId") REFERENCES "public"."ServicesSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_gallerySectionId_fkey" FOREIGN KEY ("gallerySectionId") REFERENCES "public"."GallerySection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_testimonialsSectionId_fkey" FOREIGN KEY ("testimonialsSectionId") REFERENCES "public"."TestimonialsSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_faqSectionId_fkey" FOREIGN KEY ("faqSectionId") REFERENCES "public"."FAQSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_serviceAreaSectionId_fkey" FOREIGN KEY ("serviceAreaSectionId") REFERENCES "public"."ServiceAreaSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_businessDetailsSectionId_fkey" FOREIGN KEY ("businessDetailsSectionId") REFERENCES "public"."BusinessDetailsSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_companyOverviewSectionId_fkey" FOREIGN KEY ("companyOverviewSectionId") REFERENCES "public"."CompanyOverviewSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_serviceHighlightsSectionId_fkey" FOREIGN KEY ("serviceHighlightsSectionId") REFERENCES "public"."ServiceHighlightsSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_preFooterSectionId_fkey" FOREIGN KEY ("preFooterSectionId") REFERENCES "public"."PreFooterSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_footerSectionId_fkey" FOREIGN KEY ("footerSectionId") REFERENCES "public"."FooterSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "public"."Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_businessContactId_fkey" FOREIGN KEY ("businessContactId") REFERENCES "public"."BusinessContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_seoSettingsId_fkey" FOREIGN KEY ("seoSettingsId") REFERENCES "public"."SEOSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BusinessHour" ADD CONSTRAINT "BusinessHour_businessContactId_fkey" FOREIGN KEY ("businessContactId") REFERENCES "public"."BusinessContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GalleryItem" ADD CONSTRAINT "GalleryItem_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceArea" ADD CONSTRAINT "ServiceArea_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AboutSection" ADD CONSTRAINT "AboutSection_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServicesSection" ADD CONSTRAINT "ServicesSection_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceAreaSection" ADD CONSTRAINT "ServiceAreaSection_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BusinessDetailSubSection" ADD CONSTRAINT "BusinessDetailSubSection_businessDetailsSectionId_fkey" FOREIGN KEY ("businessDetailsSectionId") REFERENCES "public"."BusinessDetailsSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BusinessContactForm" ADD CONSTRAINT "BusinessContactForm_businessDetailsSectionId_fkey" FOREIGN KEY ("businessDetailsSectionId") REFERENCES "public"."BusinessDetailsSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MapSettings" ADD CONSTRAINT "MapSettings_businessDetailsSectionId_fkey" FOREIGN KEY ("businessDetailsSectionId") REFERENCES "public"."BusinessDetailsSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyOverviewSection" ADD CONSTRAINT "CompanyOverviewSection_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyOverviewSubSection" ADD CONSTRAINT "CompanyOverviewSubSection_companyOverviewSectionId_fkey" FOREIGN KEY ("companyOverviewSectionId") REFERENCES "public"."CompanyOverviewSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CtaButtonToHeroSection" ADD CONSTRAINT "_CtaButtonToHeroSection_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."CtaButton"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CtaButtonToHeroSection" ADD CONSTRAINT "_CtaButtonToHeroSection_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."HeroSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ServicesSectionServices" ADD CONSTRAINT "_ServicesSectionServices_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ServicesSectionServices" ADD CONSTRAINT "_ServicesSectionServices_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."ServicesSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TestimonialsSectionGalleryItems" ADD CONSTRAINT "_TestimonialsSectionGalleryItems_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."GalleryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TestimonialsSectionGalleryItems" ADD CONSTRAINT "_TestimonialsSectionGalleryItems_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."TestimonialsSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TestimonialsSectionTestimonials" ADD CONSTRAINT "_TestimonialsSectionTestimonials_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Testimonial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TestimonialsSectionTestimonials" ADD CONSTRAINT "_TestimonialsSectionTestimonials_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."TestimonialsSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FAQSectionFAQItems" ADD CONSTRAINT "_FAQSectionFAQItems_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FAQItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FAQSectionFAQItems" ADD CONSTRAINT "_FAQSectionFAQItems_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."FAQSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ServiceHighlightsSectionStatistics" ADD CONSTRAINT "_ServiceHighlightsSectionStatistics_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."ServiceHighlightsSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ServiceHighlightsSectionStatistics" ADD CONSTRAINT "_ServiceHighlightsSectionStatistics_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Statistic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FooterSectionServiceAreas" ADD CONSTRAINT "_FooterSectionServiceAreas_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FooterSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FooterSectionServiceAreas" ADD CONSTRAINT "_FooterSectionServiceAreas_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."FooterServiceArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
