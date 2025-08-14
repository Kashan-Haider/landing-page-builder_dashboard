import { PrismaClient } from '@prisma/client';
import { WebhookPayload, WebhookConfig } from '../types';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

class WebhookService {
  async triggerWebhooks(event: 'created' | 'updated', landingPage: {
    templateId: string;
    githubUrl?: string;
  }) {
    try {
      const webhooks = await prisma.webhookConfig.findMany({
        where: {
          isActive: true,
          events: { has: event }
        }
      });

      if (webhooks.length === 0) return;

      const payload: WebhookPayload = {
        templateId: landingPage.templateId,
        githubUrl: landingPage.githubUrl,
        event,
        timestamp: new Date().toISOString()
      };

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
          id: uuidv4(),
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
          id: uuidv4(),
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

  async createWebhook(data: Omit<WebhookConfig, 'id' | 'isActive'>) {
    try {
      return await prisma.webhookConfig.create({
        data: { 
          id: uuidv4(),
          ...data, 
          isActive: true,
          updatedAt: new Date()
        }
      });
    } catch (error) {
      throw new Error(`Failed to create webhook: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getWebhooks() {
    try {
      return await prisma.webhookConfig.findMany({ 
        orderBy: { createdAt: 'desc' } 
      });
    } catch (error) {
      throw new Error('Failed to fetch webhooks');
    }
  }

  async toggleWebhook(id: string) {
    try {
      const webhook = await prisma.webhookConfig.findUnique({ where: { id } });
      if (!webhook) {
        throw new Error('Webhook not found');
      }
      
      return await prisma.webhookConfig.update({
        where: { id },
        data: { isActive: !webhook.isActive }
      });
    } catch (error) {
      throw new Error(`Failed to toggle webhook: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getWebhookLogs(webhookId?: string) {
    try {
      return await prisma.webhookLog.findMany({
        where: webhookId ? { webhookId } : {},
        orderBy: { sentAt: 'desc' },
        take: 100
      });
    } catch (error) {
      throw new Error('Failed to fetch webhook logs');
    }
  }
}

export const webhookService = new WebhookService();