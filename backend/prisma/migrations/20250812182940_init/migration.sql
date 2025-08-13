-- CreateTable
CREATE TABLE "public"."LandingPage" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "githubUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "seoSettingsId" TEXT,
    "businessContactId" TEXT,

    CONSTRAINT "LandingPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SEOSettings" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT[],
    "favicon" TEXT,

    CONSTRAINT "SEOSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Images" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "title" TEXT,
    "altText" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessContact" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "emergencyPhone" TEXT,
    "email" TEXT NOT NULL,
    "emergencyEmail" TEXT,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "BusinessContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessHour" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "hours" TEXT,
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
    "description" TEXT,
    "features" TEXT[],
    "ctaButtonId" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GalleryItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "ctaButtonId" TEXT,
    "category" TEXT,

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Testimonial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "company" TEXT,
    "industry" TEXT,
    "text" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FAQItem" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT,

    CONSTRAINT "FAQItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceArea" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT,
    "description" TEXT,
    "ctaButtonId" TEXT,

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
    "subtitle" TEXT,
    "description" TEXT,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "HeroSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AboutSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT[],
    "ctaButtonId" TEXT,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "AboutSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServicesSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "ctaButtonId" TEXT,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "ServicesSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GallerySection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "GallerySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TestimonialsSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "TestimonialsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FAQSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "FAQSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceAreaSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "ctaButtonId" TEXT,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "ServiceAreaSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessDetailsSection" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "BusinessDetailsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessDetailSubSection" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "ctaTitle" TEXT NOT NULL,
    "businessDetailsSectionId" TEXT NOT NULL,

    CONSTRAINT "BusinessDetailSubSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessContactForm" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "businessDetailsSectionId" TEXT NOT NULL,

    CONSTRAINT "BusinessContactForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MapSettings" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "locationName" TEXT,
    "businessDetailsSectionId" TEXT NOT NULL,

    CONSTRAINT "MapSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyOverviewSection" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "ctaButtonId" TEXT,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "CompanyOverviewSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyOverviewSubSection" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "companyOverviewSectionId" TEXT NOT NULL,

    CONSTRAINT "CompanyOverviewSubSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceHighlightsSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "ServiceHighlightsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PreFooterSection" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "PreFooterSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FooterSection" (
    "id" TEXT NOT NULL,
    "copyright" TEXT,
    "templateId" TEXT NOT NULL,

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
    "githubUrl" TEXT,
    "payload" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "statusCode" INTEGER,
    "errorMessage" TEXT,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "retryCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WebhookLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Theme" (
    "id" TEXT NOT NULL,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "landingPageId" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_LandingPageToServiceArea" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LandingPageToServiceArea_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_LandingPageToSocialLink" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LandingPageToSocialLink_AB_pkey" PRIMARY KEY ("A","B")
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
CREATE TABLE "public"."_ServiceAreaSectionServiceAreas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ServiceAreaSectionServiceAreas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_FooterServiceAreaServiceAreas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FooterServiceAreaServiceAreas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_ServiceHighlightsSectionStatistics" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ServiceHighlightsSectionStatistics_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_PreFooterSectionToSocialLink" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PreFooterSectionToSocialLink_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_FooterSectionServiceAreas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FooterSectionServiceAreas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "SEOSettings_title_key" ON "public"."SEOSettings"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Images_imageId_key" ON "public"."Images"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessContactForm_businessDetailsSectionId_key" ON "public"."BusinessContactForm"("businessDetailsSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "MapSettings_businessDetailsSectionId_key" ON "public"."MapSettings"("businessDetailsSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_landingPageId_key" ON "public"."Theme"("landingPageId");

-- CreateIndex
CREATE INDEX "_LandingPageToServiceArea_B_index" ON "public"."_LandingPageToServiceArea"("B");

-- CreateIndex
CREATE INDEX "_LandingPageToSocialLink_B_index" ON "public"."_LandingPageToSocialLink"("B");

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
CREATE INDEX "_ServiceAreaSectionServiceAreas_B_index" ON "public"."_ServiceAreaSectionServiceAreas"("B");

-- CreateIndex
CREATE INDEX "_FooterServiceAreaServiceAreas_B_index" ON "public"."_FooterServiceAreaServiceAreas"("B");

-- CreateIndex
CREATE INDEX "_ServiceHighlightsSectionStatistics_B_index" ON "public"."_ServiceHighlightsSectionStatistics"("B");

-- CreateIndex
CREATE INDEX "_PreFooterSectionToSocialLink_B_index" ON "public"."_PreFooterSectionToSocialLink"("B");

-- CreateIndex
CREATE INDEX "_FooterSectionServiceAreas_B_index" ON "public"."_FooterSectionServiceAreas"("B");

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_businessContactId_fkey" FOREIGN KEY ("businessContactId") REFERENCES "public"."BusinessContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandingPage" ADD CONSTRAINT "LandingPage_seoSettingsId_fkey" FOREIGN KEY ("seoSettingsId") REFERENCES "public"."SEOSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Images" ADD CONSTRAINT "Images_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BusinessHour" ADD CONSTRAINT "BusinessHour_businessContactId_fkey" FOREIGN KEY ("businessContactId") REFERENCES "public"."BusinessContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GalleryItem" ADD CONSTRAINT "GalleryItem_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceArea" ADD CONSTRAINT "ServiceArea_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HeroSection" ADD CONSTRAINT "HeroSection_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AboutSection" ADD CONSTRAINT "AboutSection_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AboutSection" ADD CONSTRAINT "AboutSection_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServicesSection" ADD CONSTRAINT "ServicesSection_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServicesSection" ADD CONSTRAINT "ServicesSection_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GallerySection" ADD CONSTRAINT "GallerySection_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TestimonialsSection" ADD CONSTRAINT "TestimonialsSection_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FAQSection" ADD CONSTRAINT "FAQSection_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceAreaSection" ADD CONSTRAINT "ServiceAreaSection_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceAreaSection" ADD CONSTRAINT "ServiceAreaSection_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BusinessDetailsSection" ADD CONSTRAINT "BusinessDetailsSection_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BusinessDetailSubSection" ADD CONSTRAINT "BusinessDetailSubSection_businessDetailsSectionId_fkey" FOREIGN KEY ("businessDetailsSectionId") REFERENCES "public"."BusinessDetailsSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BusinessContactForm" ADD CONSTRAINT "BusinessContactForm_businessDetailsSectionId_fkey" FOREIGN KEY ("businessDetailsSectionId") REFERENCES "public"."BusinessDetailsSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MapSettings" ADD CONSTRAINT "MapSettings_businessDetailsSectionId_fkey" FOREIGN KEY ("businessDetailsSectionId") REFERENCES "public"."BusinessDetailsSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyOverviewSection" ADD CONSTRAINT "CompanyOverviewSection_ctaButtonId_fkey" FOREIGN KEY ("ctaButtonId") REFERENCES "public"."CtaButton"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyOverviewSection" ADD CONSTRAINT "CompanyOverviewSection_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyOverviewSubSection" ADD CONSTRAINT "CompanyOverviewSubSection_companyOverviewSectionId_fkey" FOREIGN KEY ("companyOverviewSectionId") REFERENCES "public"."CompanyOverviewSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceHighlightsSection" ADD CONSTRAINT "ServiceHighlightsSection_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PreFooterSection" ADD CONSTRAINT "PreFooterSection_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FooterSection" ADD CONSTRAINT "FooterSection_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Theme" ADD CONSTRAINT "Theme_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "public"."LandingPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_LandingPageToServiceArea" ADD CONSTRAINT "_LandingPageToServiceArea_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_LandingPageToServiceArea" ADD CONSTRAINT "_LandingPageToServiceArea_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."ServiceArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_LandingPageToSocialLink" ADD CONSTRAINT "_LandingPageToSocialLink_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_LandingPageToSocialLink" ADD CONSTRAINT "_LandingPageToSocialLink_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."SocialLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "public"."_ServiceAreaSectionServiceAreas" ADD CONSTRAINT "_ServiceAreaSectionServiceAreas_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."ServiceArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ServiceAreaSectionServiceAreas" ADD CONSTRAINT "_ServiceAreaSectionServiceAreas_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."ServiceAreaSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FooterServiceAreaServiceAreas" ADD CONSTRAINT "_FooterServiceAreaServiceAreas_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FooterServiceArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FooterServiceAreaServiceAreas" ADD CONSTRAINT "_FooterServiceAreaServiceAreas_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."ServiceArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ServiceHighlightsSectionStatistics" ADD CONSTRAINT "_ServiceHighlightsSectionStatistics_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."ServiceHighlightsSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ServiceHighlightsSectionStatistics" ADD CONSTRAINT "_ServiceHighlightsSectionStatistics_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Statistic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PreFooterSectionToSocialLink" ADD CONSTRAINT "_PreFooterSectionToSocialLink_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."PreFooterSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PreFooterSectionToSocialLink" ADD CONSTRAINT "_PreFooterSectionToSocialLink_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."SocialLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FooterSectionServiceAreas" ADD CONSTRAINT "_FooterSectionServiceAreas_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FooterSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FooterSectionServiceAreas" ADD CONSTRAINT "_FooterSectionServiceAreas_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."FooterServiceArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
