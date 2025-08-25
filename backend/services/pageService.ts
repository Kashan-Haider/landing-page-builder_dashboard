// Page Service - Handles all database operations for landing pages
// This service provides simple methods for CRUD operations on pages
import { PrismaClient } from "@prisma/client";
import {
  CreateLandingPageInput,
  UpdateLandingPageInput,
  CreateImageInput,
} from "../validation/pageSchemas";
import { webhookService } from "./webhookService";
import { imageService } from "./imageService";
import { merge } from "lodash";

const prisma = new PrismaClient();

class PageService {
  // Get all pages from database
  async getAllPages() {
    try {
      return await prisma.landingPage.findMany({
        include: {
          images: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    } catch (error) {
      console.error("Error fetching pages:", error);
      throw new Error(
        `Failed to fetch pages: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Get single page by ID
  async getPageById(id: string) {
    try {
      const page = await prisma.landingPage.findUnique({
        where: { id },
        include: {
          images: true,
        },
      });

      if (!page) {
        throw new Error("Page not found");
      }

      return page;
    } catch (error) {
      if (error instanceof Error && error.message === "Page not found") {
        throw error;
      }
      console.error("Error fetching page:", error);
      throw new Error("Failed to fetch page");
    }
  }

  // Create new page
  async createPage(data: CreateLandingPageInput) {
    try {
      const page = await prisma.landingPage.create({
        data: {
          templateId: data.templateId,
          businessName: data.businessName,
          githubUrl: data.githubUrl,
          status: "draft",
          content: data.content,
          seoData: data.seoData,
          themeData: data.themeData,
          businessData: data.businessData,
          images: {
            create: data.images.map((img) => ({
              slotName: img.slotName,
              title: img.title,
              altText: img.altText,
              imageUrl: img.imageUrl,
              category: img.category
            })),
          },
        },
        include: {
          images: true,
        },
      });

      // Trigger webhook notification
      try {
        await webhookService.triggerWebhooks("created", {
          templateId: page.templateId,
          githubUrl: page.githubUrl || undefined,
        });
      } catch (webhookError) {
        console.warn("Webhook trigger failed:", webhookError);
      }

      return page;
    } catch (error) {
      console.error("Error creating page:", error);
      throw new Error(
        `Failed to create page: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Update existing page
  async updatePage(id: string, data: UpdateLandingPageInput) {
    try {
      const existingPage = await prisma.landingPage.findUnique({
        where: { id },
      });

      if (!existingPage) {
        throw new Error("Page not found");
      }

      // Build update data object
      const updateData: any = {
        updatedAt: new Date(),
      };

      // Update basic fields if provided
      if (data.templateId !== undefined) updateData.templateId = data.templateId;
      if (data.businessName !== undefined) updateData.businessName = data.businessName;
      if (data.githubUrl !== undefined) updateData.githubUrl = data.githubUrl;
      
      // Handle status changes
      if (data.status !== undefined) {
        updateData.status = data.status;
        if (data.status === "published") {
          updateData.publishedAt = new Date();
        }
      }

      // Merge complex data objects
      if (data.content) {
        updateData.content = merge({}, existingPage.content, data.content);
      }
      if (data.seoData) {
        updateData.seoData = merge({}, existingPage.seoData, data.seoData);
      }
      if (data.themeData) {
        updateData.themeData = merge({}, existingPage.themeData, data.themeData);
      }
      if (data.businessData) {
        updateData.businessData = merge({}, existingPage.businessData, data.businessData);
      }

      // Handle images update - replace all images
      if (data.images) {
        // First delete existing images
        await prisma.image.deleteMany({
          where: { landingPageId: id },
        });
        
        // Then create new images
        updateData.images = {
          create: data.images.map((img: any) => ({
            slotName: img.slotName,
            title: img.title,
            altText: img.altText,
            imageUrl: img.imageUrl,
            category: img.category,
          })),
        };
      }

      const updatedPage = await prisma.landingPage.update({
        where: { id },
        data: updateData,
        include: {
          images: true,
        },
      });

      // Trigger webhook notification
      try {
        await webhookService.triggerWebhooks("updated", {
          templateId: updatedPage.templateId,
          githubUrl: updatedPage.githubUrl || undefined,
        });
      } catch (webhookError) {
        console.warn("Webhook trigger failed:", webhookError);
      }

      return updatedPage;
    } catch (error) {
      if (error instanceof Error && error.message === "Page not found") {
        throw error;
      }
      console.error("Error updating page:", error);
      throw new Error(
        `Failed to update page: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Delete page
  async deletePage(id: string) {
    try {
      const existingPage = await prisma.landingPage.findUnique({
        where: { id },
        include: {
          images: true,
        },
      });

      if (!existingPage) {
        throw new Error("Page not found");
      }

      await prisma.landingPage.delete({
        where: { id },
      });

      // Trigger webhook notification
      try {
        await webhookService.triggerWebhooks("updated", {
          templateId: existingPage.templateId,
          githubUrl: existingPage.githubUrl || undefined,
        });
      } catch (webhookError) {
        console.warn("Webhook trigger failed:", webhookError);
      }

      return { success: true, message: "Page deleted successfully" };
    } catch (error) {
      if (error instanceof Error && error.message === "Page not found") {
        throw error;
      }
      console.error("Error deleting page:", error);
      throw new Error(
        `Failed to delete page: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Publish page (shortcut method)
  async publishPage(id: string) {
    return this.updatePage(id, { status: "published" });
  }

  // Unpublish page (shortcut method)
  async unpublishPage(id: string) {
    return this.updatePage(id, { status: "draft" });
  }

  // Archive page (shortcut method)
  async archivePage(id: string) {
    return this.updatePage(id, { status: "archived" });
  }

  // Image management methods (delegated to imageService)
  async getImages(pageId: string) {
    return imageService.getImages(pageId);
  }

  async addImage(pageId: string, data: CreateImageInput) {
    return imageService.addImage(pageId, data);
  }

  async deleteImage(imageId: string) {
    return imageService.deleteImage(imageId);
  }
}

export const pageService = new PageService();
