/*
  Warnings:

  - You are about to drop the column `description` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `imagePoolId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `aboutSectionId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `businessContactId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `businessDetailsSectionId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `companyOverviewSectionId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `faqSectionId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `footerSectionId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `gallerySectionId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `heroSectionId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `imagePoolId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `preFooterSectionId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `seoSettingsId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `serviceAreaSectionId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `serviceHighlightsSectionId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `servicesSectionId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `socialLinkId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `testimonialsSectionId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `themeId` on the `LandingPage` table. All the data in the column will be lost.
  - You are about to drop the column `errorMessage` on the `WebhookLog` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrl` on the `WebhookLog` table. All the data in the column will be lost.
  - You are about to drop the column `retryCount` on the `WebhookLog` table. All the data in the column will be lost.
  - You are about to drop the column `templateId` on the `WebhookLog` table. All the data in the column will be lost.
  - You are about to drop the `AboutSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusinessContact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusinessContactForm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusinessDetailSubSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusinessDetailsSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusinessHour` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyOverviewSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyOverviewSubSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CtaButton` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FAQItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FAQSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FooterSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FooterServiceArea` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GalleryItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GallerySection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HeroSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImagesPool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MapSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PreFooterSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SEOSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceArea` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceAreaSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceHighlightsSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServicesSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialPlatform` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Statistic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Testimonial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestimonialsSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Theme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WebhookConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CtaButtonToHeroSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FAQSectionFAQItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FooterSectionServiceAreas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ServiceHighlightsSectionStatistics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ServicesSectionServices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TestimonialsSectionGalleryItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TestimonialsSectionTestimonials` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `landingPageId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Made the column `category` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `businessData` to the `LandingPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `LandingPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seoData` to the `LandingPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themeData` to the `LandingPage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."AboutSection" DROP CONSTRAINT "AboutSection_ctaButtonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BusinessContactForm" DROP CONSTRAINT "BusinessContactForm_businessDetailsSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BusinessDetailSubSection" DROP CONSTRAINT "BusinessDetailSubSection_businessDetailsSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BusinessHour" DROP CONSTRAINT "BusinessHour_businessContactId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CompanyOverviewSection" DROP CONSTRAINT "CompanyOverviewSection_ctaButtonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CompanyOverviewSubSection" DROP CONSTRAINT "CompanyOverviewSubSection_companyOverviewSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GalleryItem" DROP CONSTRAINT "GalleryItem_ctaButtonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_imagePoolId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_aboutSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_businessContactId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_businessDetailsSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_companyOverviewSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_faqSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_footerSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_gallerySectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_heroSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_imagePoolId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_preFooterSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_seoSettingsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_serviceAreaSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_serviceHighlightsSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_servicesSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_socialLinkId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_testimonialsSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LandingPage" DROP CONSTRAINT "LandingPage_themeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MapSettings" DROP CONSTRAINT "MapSettings_businessDetailsSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Service" DROP CONSTRAINT "Service_ctaButtonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ServiceArea" DROP CONSTRAINT "ServiceArea_ctaButtonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ServiceArea" DROP CONSTRAINT "ServiceArea_landingPageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ServiceAreaSection" DROP CONSTRAINT "ServiceAreaSection_ctaButtonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ServicesSection" DROP CONSTRAINT "ServicesSection_ctaButtonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SocialPlatform" DROP CONSTRAINT "SocialPlatform_socialLinkId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CtaButtonToHeroSection" DROP CONSTRAINT "_CtaButtonToHeroSection_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CtaButtonToHeroSection" DROP CONSTRAINT "_CtaButtonToHeroSection_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_FAQSectionFAQItems" DROP CONSTRAINT "_FAQSectionFAQItems_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_FAQSectionFAQItems" DROP CONSTRAINT "_FAQSectionFAQItems_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_FooterSectionServiceAreas" DROP CONSTRAINT "_FooterSectionServiceAreas_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_FooterSectionServiceAreas" DROP CONSTRAINT "_FooterSectionServiceAreas_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ServiceHighlightsSectionStatistics" DROP CONSTRAINT "_ServiceHighlightsSectionStatistics_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ServiceHighlightsSectionStatistics" DROP CONSTRAINT "_ServiceHighlightsSectionStatistics_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ServicesSectionServices" DROP CONSTRAINT "_ServicesSectionServices_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ServicesSectionServices" DROP CONSTRAINT "_ServicesSectionServices_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_TestimonialsSectionGalleryItems" DROP CONSTRAINT "_TestimonialsSectionGalleryItems_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_TestimonialsSectionGalleryItems" DROP CONSTRAINT "_TestimonialsSectionGalleryItems_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_TestimonialsSectionTestimonials" DROP CONSTRAINT "_TestimonialsSectionTestimonials_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_TestimonialsSectionTestimonials" DROP CONSTRAINT "_TestimonialsSectionTestimonials_B_fkey";

-- DropIndex
DROP INDEX "public"."Image_imageId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_aboutSectionId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_businessDetailsSectionId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_companyOverviewSectionId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_faqSectionId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_footerSectionId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_gallerySectionId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_heroSectionId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_imagePoolId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_preFooterSectionId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_serviceAreaSectionId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_serviceHighlightsSectionId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_servicesSectionId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_socialLinkId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_testimonialsSectionId_key";

-- DropIndex
DROP INDEX "public"."LandingPage_themeId_key";

-- AlterTable
ALTER TABLE "public"."Image" DROP COLUMN "description",
DROP COLUMN "imageId",
DROP COLUMN "imagePoolId",
DROP COLUMN "updatedAt",
ADD COLUMN     "landingPageId" TEXT NOT NULL,
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" SET DEFAULT 'general';

-- AlterTable
ALTER TABLE "public"."LandingPage" DROP COLUMN "aboutSectionId",
DROP COLUMN "businessContactId",
DROP COLUMN "businessDetailsSectionId",
DROP COLUMN "companyOverviewSectionId",
DROP COLUMN "faqSectionId",
DROP COLUMN "footerSectionId",
DROP COLUMN "gallerySectionId",
DROP COLUMN "heroSectionId",
DROP COLUMN "imagePoolId",
DROP COLUMN "preFooterSectionId",
DROP COLUMN "seoSettingsId",
DROP COLUMN "serviceAreaSectionId",
DROP COLUMN "serviceHighlightsSectionId",
DROP COLUMN "servicesSectionId",
DROP COLUMN "socialLinkId",
DROP COLUMN "testimonialsSectionId",
DROP COLUMN "themeId",
ADD COLUMN     "businessData" JSONB NOT NULL,
ADD COLUMN     "content" JSONB NOT NULL,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "seoData" JSONB NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft',
ADD COLUMN     "themeData" JSONB NOT NULL,
ALTER COLUMN "githubUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."WebhookLog" DROP COLUMN "errorMessage",
DROP COLUMN "githubUrl",
DROP COLUMN "retryCount",
DROP COLUMN "templateId",
ADD COLUMN     "error" TEXT,
ALTER COLUMN "statusCode" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."AboutSection";

-- DropTable
DROP TABLE "public"."BusinessContact";

-- DropTable
DROP TABLE "public"."BusinessContactForm";

-- DropTable
DROP TABLE "public"."BusinessDetailSubSection";

-- DropTable
DROP TABLE "public"."BusinessDetailsSection";

-- DropTable
DROP TABLE "public"."BusinessHour";

-- DropTable
DROP TABLE "public"."CompanyOverviewSection";

-- DropTable
DROP TABLE "public"."CompanyOverviewSubSection";

-- DropTable
DROP TABLE "public"."CtaButton";

-- DropTable
DROP TABLE "public"."FAQItem";

-- DropTable
DROP TABLE "public"."FAQSection";

-- DropTable
DROP TABLE "public"."FooterSection";

-- DropTable
DROP TABLE "public"."FooterServiceArea";

-- DropTable
DROP TABLE "public"."GalleryItem";

-- DropTable
DROP TABLE "public"."GallerySection";

-- DropTable
DROP TABLE "public"."HeroSection";

-- DropTable
DROP TABLE "public"."ImagesPool";

-- DropTable
DROP TABLE "public"."MapSettings";

-- DropTable
DROP TABLE "public"."PreFooterSection";

-- DropTable
DROP TABLE "public"."SEOSettings";

-- DropTable
DROP TABLE "public"."Service";

-- DropTable
DROP TABLE "public"."ServiceArea";

-- DropTable
DROP TABLE "public"."ServiceAreaSection";

-- DropTable
DROP TABLE "public"."ServiceHighlightsSection";

-- DropTable
DROP TABLE "public"."ServicesSection";

-- DropTable
DROP TABLE "public"."SocialLink";

-- DropTable
DROP TABLE "public"."SocialPlatform";

-- DropTable
DROP TABLE "public"."Statistic";

-- DropTable
DROP TABLE "public"."Testimonial";

-- DropTable
DROP TABLE "public"."TestimonialsSection";

-- DropTable
DROP TABLE "public"."Theme";

-- DropTable
DROP TABLE "public"."WebhookConfig";

-- DropTable
DROP TABLE "public"."_CtaButtonToHeroSection";

-- DropTable
DROP TABLE "public"."_FAQSectionFAQItems";

-- DropTable
DROP TABLE "public"."_FooterSectionServiceAreas";

-- DropTable
DROP TABLE "public"."_ServiceHighlightsSectionStatistics";

-- DropTable
DROP TABLE "public"."_ServicesSectionServices";

-- DropTable
DROP TABLE "public"."_TestimonialsSectionGalleryItems";

-- DropTable
DROP TABLE "public"."_TestimonialsSectionTestimonials";

-- CreateTable
CREATE TABLE "public"."Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "structure" JSONB NOT NULL,
    "defaultData" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Webhook" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "events" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "public"."LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
