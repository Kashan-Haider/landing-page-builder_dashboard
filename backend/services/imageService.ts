import { PrismaClient } from "@prisma/client";
import { CreateImageInput } from "../validation/pageSchemas";

const prisma = new PrismaClient();

class ImageService {
  // Get all images for a specific page
  async getImages(pageId: string) {
    try {
      const images = await prisma.image.findMany({
        where: { landingPageId: pageId },
        orderBy: { createdAt: "desc" },
      });

      return images;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw new Error(
        `Failed to fetch images: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Add new image to a page
  async addImage(pageId: string, data: CreateImageInput) {
    try {
      // Check if page exists
      const page = await prisma.landingPage.findUnique({
        where: { id: pageId },
      });

      if (!page) {
        throw new Error("Page not found");
      }

      // Create the image
      const image = await prisma.image.create({
        data: {
          ...data,
          landingPageId: pageId,
        },
      });

      return image;
    } catch (error) {
      if (error instanceof Error && error.message === "Page not found") {
        throw error;
      }
      console.error("Error adding image:", error);
      throw new Error(
        `Failed to add image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Delete an image
  async deleteImage(imageId: string) {
    try {
      const image = await prisma.image.findUnique({
        where: { id: imageId },
      });

      if (!image) {
        throw new Error("Image not found");
      }

      await prisma.image.delete({
        where: { id: imageId },
      });

      return { success: true, message: "Image deleted successfully" };
    } catch (error) {
      if (error instanceof Error && error.message === "Image not found") {
        throw error;
      }
      console.error("Error deleting image:", error);
      throw new Error(
        `Failed to delete image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

export const imageService = new ImageService();
