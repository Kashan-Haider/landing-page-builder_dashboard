// webhookService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface WebhookPayload {
  templateId: string;
  githubUrl?: string;
  event: 'created' | 'updated';
  timestamp: string;
}

class WebhookService {
  async triggerWebhooks(event: 'created' | 'updated', landingPage: {
    templateId: string;
    githubUrl?: string;
  }) {
    try {
      // Get active webhooks that listen to this specific event
      const webhooks = await prisma.webhookConfig.findMany({
        where: {
          isActive: true,
          events: {
            has: event
          }
        }
      });

      if (webhooks.length === 0) return;

      const payload: WebhookPayload = {
        templateId: landingPage.templateId,
        githubUrl: landingPage.githubUrl,
        event,
        timestamp: new Date().toISOString()
      };

      // Send all webhooks concurrently
      await Promise.allSettled(
        webhooks.map(webhook => this.sendWebhook(webhook, payload))
      );
    } catch (error) {
      console.error('Error triggering webhooks:', error);
    }
  }

  private async sendWebhook(webhook: any, payload: WebhookPayload) {
    try {
      const response = await fetch(webhook.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      await prisma.webhookLog.create({
        data: {
          webhookId: webhook.id,
          event: payload.event,
          templateId: payload.templateId,
          githubUrl: payload.githubUrl || '',
          payload: payload as any,
          status: response.ok ? 'success' : 'failed',
          statusCode: response.status,
          errorMessage: response.ok ? '' : await response.text(),
          retryCount: 0
        }
      });

    } catch (error) {
      await prisma.webhookLog.create({
        data: {
          webhookId: webhook.id,
          event: payload.event,
          templateId: payload.templateId,
          githubUrl: payload.githubUrl || '',
          payload: payload as any,
          status: 'failed',
          statusCode: 0,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          retryCount: 0
        }
      });
    }
  }

  // Simplified CRUD operations
  async createWebhook(data: { name: string; url: string; events: ('created' | 'updated')[] }) {
    return prisma.webhookConfig.create({
      data: { ...data, isActive: true }
    });
  }

  async getWebhooks() {
    return prisma.webhookConfig.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async toggleWebhook(id: string) {
    const webhook = await prisma.webhookConfig.findUniqueOrThrow({ where: { id } });
    return prisma.webhookConfig.update({
      where: { id },
      data: { isActive: !webhook.isActive }
    });
  }

  async getWebhookLogs(webhookId?: string) {
    return prisma.webhookLog.findMany({
      where: webhookId ? { webhookId } : {},
      orderBy: { sentAt: 'desc' },
      take: 100
    });
  }
}

export const webhookService = new WebhookService();