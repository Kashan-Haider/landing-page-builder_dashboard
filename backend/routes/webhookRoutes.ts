import express from 'express';
import { webhookService } from '../services/webhookService';
import { ApiResponse, WebhookConfig } from '../types';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const webhookData: Omit<WebhookConfig, 'id' | 'isActive'> = req.body;
    const webhook = await webhookService.createWebhook(webhookData);
    
    const response: ApiResponse = {
      success: true,
      data: webhook,
      message: 'Webhook created successfully'
    };
    res.status(201).json(response);
  } catch (error) {
    console.error('Create webhook error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to create webhook',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(response);
  }
});

router.get('/', async (req, res) => {
  try {
    const webhooks = await webhookService.getWebhooks();
    
    const response: ApiResponse = {
      success: true,
      data: webhooks,
      message: 'Webhooks fetched successfully'
    };
    res.json(response);
  } catch (error) {
    console.error('Get webhooks error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch webhooks',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(response);
  }
});

router.patch('/:id/toggle', async (req, res) => {
  try {
    const webhook = await webhookService.toggleWebhook(req.params.id);
    
    const response: ApiResponse = {
      success: true,
      data: webhook,
      message: 'Webhook toggled successfully'
    };
    res.json(response);
  } catch (error) {
    console.error('Toggle webhook error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to toggle webhook',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    
    const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json(response);
  }
});

router.get('/logs', async (req, res) => {
  try {
    const webhookId = req.query.webhookId as string;
    const logs = await webhookService.getWebhookLogs(webhookId);
    
    const response: ApiResponse = {
      success: true,
      data: logs,
      message: 'Webhook logs fetched successfully'
    };
    res.json(response);
  } catch (error) {
    console.error('Get webhook logs error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch webhook logs',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(response);
  }
});

export default router;