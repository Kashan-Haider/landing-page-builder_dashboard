/*
  Migration to restructure ImagesPool to support multiple images
  - Preserve existing image data by moving it to new Image table
  - Update ImagesPool to be a container for multiple images
*/

-- First, create the new Image table
CREATE TABLE "public"."Image" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "imagePoolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- Create the unique index on imageId
CREATE UNIQUE INDEX "Image_imageId_key" ON "public"."Image"("imageId");

-- Migrate existing data from ImagesPool to Image table
INSERT INTO "public"."Image" ("id", "imageId", "title", "altText", "imageUrl", "category", "description", "imagePoolId", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid() as "id",
    "imageId",
    "title",
    "altText",
    "imageUrl",
    "category",
    "description",
    "id" as "imagePoolId",
    "createdAt",
    "updatedAt"
FROM "public"."ImagesPool";

-- Add name column with default value based on existing data
ALTER TABLE "public"."ImagesPool" ADD COLUMN "name" TEXT;
UPDATE "public"."ImagesPool" SET "name" = COALESCE("title", 'Image Pool') || ' - Pool';
ALTER TABLE "public"."ImagesPool" ALTER COLUMN "name" SET NOT NULL;

-- Drop the unique index first
DROP INDEX "public"."ImagesPool_imageId_key";

-- Now drop the old columns from ImagesPool
ALTER TABLE "public"."ImagesPool" 
DROP COLUMN "altText",
DROP COLUMN "category",
DROP COLUMN "imageId",
DROP COLUMN "imageUrl",
DROP COLUMN "title";

-- Add the foreign key constraint
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_imagePoolId_fkey" FOREIGN KEY ("imagePoolId") REFERENCES "public"."ImagesPool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
