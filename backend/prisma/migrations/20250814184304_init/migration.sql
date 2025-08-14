/*
  Warnings:

  - You are about to drop the column `image` on the `GalleryItem` table. All the data in the column will be lost.
  - You are about to drop the column `favicon` on the `SEOSettings` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `SocialLink` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `SocialLink` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Testimonial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."GalleryItem" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "public"."SEOSettings" DROP COLUMN "favicon";

-- AlterTable
ALTER TABLE "public"."SocialLink" DROP COLUMN "platform",
DROP COLUMN "url",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Social Links Group',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Testimonial" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "public"."SocialPlatform" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "socialLinkId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialPlatform_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SocialPlatform" ADD CONSTRAINT "SocialPlatform_socialLinkId_fkey" FOREIGN KEY ("socialLinkId") REFERENCES "public"."SocialLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
