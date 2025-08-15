import { PrismaClient } from '@prisma/client';
import { CreateLandingPageInput, UpdateLandingPageInput, CreateImageInput } from '../validation/schemas';
import { webhookService } from './webhookService';

const prisma = new PrismaClient();

class LandingPageService {

  async getAllLandingPages() {
    try {
      return await prisma.landingPage.findMany({
        include: {
          images: true
        },
        orderBy: {
          updatedAt: 'desc'
        }
      });
    } catch (error) {
      console.error('Error fetching landing pages:', error);
      throw new Error(`Failed to fetch landing pages: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getLandingPageById(id: string) {
    try {
      const page = await prisma.landingPage.findUnique({
        where: { id },
        include: {
          images: true
        }
      });

      if (!page) {
        throw new Error('Landing page not found');
      }

      return page;
    } catch (error) {
      if (error instanceof Error && error.message === 'Landing page not found') {
        throw error;
      }
      console.error('Error fetching landing page:', error);
      throw new Error('Failed to fetch landing page');
    }
  }

  async createLandingPage(data: CreateLandingPageInput) {
    try {
      const landingPage = await prisma.landingPage.create({
        data: {
          templateId: data.templateId,
          businessName: data.businessName,
          githubUrl: data.githubUrl,
          status: 'draft',
          content: data.content,
          seoData: data.seoData,
          themeData: data.themeData,
          businessData: data.businessData
        },
        include: {
          images: true
        }
      });

      try {
        await webhookService.triggerWebhooks('created', {
          templateId: landingPage.templateId,
          githubUrl: landingPage.githubUrl || undefined
        });
      } catch (webhookError) {
        console.warn('Webhook trigger failed:', webhookError);
      }

      return landingPage;
    } catch (error) {
      console.error('Error creating landing page:', error);
      throw new Error(`Failed to create landing page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async updateLandingPage(id: string, data: UpdateLandingPageInput) {
    try {
      const existingPage = await prisma.landingPage.findUnique({
        where: { id }
      });

      if (!existingPage) {
        throw new Error('Landing page not found');
      }

      const updateData: any = {
        updatedAt: new Date()
      };

      if (data.templateId !== undefined) updateData.templateId = data.templateId;
      if (data.businessName !== undefined) updateData.businessName = data.businessName;
      if (data.githubUrl !== undefined) updateData.githubUrl = data.githubUrl;
      if (data.status !== undefined) {
        updateData.status = data.status;
        if (data.status === 'published') {
          updateData.publishedAt = new Date();
        }
      }

      if (data.content) {
        updateData.content = {
          ...existingPage.content as any,
          ...data.content
        };
      }

      if (data.seoData) {
        updateData.seoData = {
          ...existingPage.seoData as any,
          ...data.seoData
        };
      }

      if (data.themeData) {
        updateData.themeData = {
          ...existingPage.themeData as any,
          ...data.themeData
        };
      }

      if (data.businessData) {
        updateData.businessData = {
          ...existingPage.businessData as any,
          ...data.businessData
        };
      }

      const updatedPage = await prisma.landingPage.update({
        where: { id },
        data: updateData,
        include: {
          images: true
        }
      });

      try {
        await webhookService.triggerWebhooks('updated', {
          templateId: updatedPage.templateId,
          githubUrl: updatedPage.githubUrl || undefined
        });
      } catch (webhookError) {
        console.warn('Webhook trigger failed:', webhookError);
      }

      return updatedPage;
    } catch (error) {
      if (error instanceof Error && error.message === 'Landing page not found') {
        throw error;
      }
      console.error('Error updating landing page:', error);
      throw new Error(`Failed to update landing page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async deleteLandingPage(id: string) {
    try {
      const existingPage = await prisma.landingPage.findUnique({
        where: { id },
        include: {
          images: true
        }
      });

      if (!existingPage) {
        throw new Error('Landing page not found');
      }

      await prisma.landingPage.delete({
        where: { id }
      });

      try {
        await webhookService.triggerWebhooks('updated', {
          templateId: existingPage.templateId,
          githubUrl: existingPage.githubUrl || undefined
        });
      } catch (webhookError) {
        console.warn('Webhook trigger failed:', webhookError);
      }

      return { success: true, message: 'Landing page deleted successfully' };
    } catch (error) {
      if (error instanceof Error && error.message === 'Landing page not found') {
        throw error;
      }
      console.error('Error deleting landing page:', error);
      throw new Error(`Failed to delete landing page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async addImage(landingPageId: string, data: CreateImageInput) {
    try {
      const page = await prisma.landingPage.findUnique({
        where: { id: landingPageId }
      });

      if (!page) {
        throw new Error('Landing page not found');
      }

      const image = await prisma.image.create({
        data: {
          ...data,
          landingPageId
        }
      });

      return image;
    } catch (error) {
      if (error instanceof Error && error.message === 'Landing page not found') {
        throw error;
      }
      console.error('Error adding image:', error);
      throw new Error(`Failed to add image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async deleteImage(imageId: string) {
    try {
      const image = await prisma.image.findUnique({
        where: { id: imageId }
      });

      if (!image) {
        throw new Error('Image not found');
      }

      await prisma.image.delete({
        where: { id: imageId }
      });

      return { success: true, message: 'Image deleted successfully' };
    } catch (error) {
      if (error instanceof Error && error.message === 'Image not found') {
        throw error;
      }
      console.error('Error deleting image:', error);
      throw new Error(`Failed to delete image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getImages(landingPageId: string) {
    try {
      const images = await prisma.image.findMany({
        where: { landingPageId },
        orderBy: { createdAt: 'desc' }
      });

      return images;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw new Error(`Failed to fetch images: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async publishLandingPage(id: string) {
    return this.updateLandingPage(id, { 
      status: 'published' 
    });
  }

  async unpublishLandingPage(id: string) {
    return this.updateLandingPage(id, { 
      status: 'draft' 
    });
  }

  async archiveLandingPage(id: string) {
    return this.updateLandingPage(id, { 
      status: 'archived' 
    });
  }
}

export const landingPageService = new LandingPageService();
