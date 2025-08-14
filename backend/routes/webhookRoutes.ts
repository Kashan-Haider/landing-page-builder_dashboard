import express from 'express';
import { webhookService } from '../services/webhookService';
import { ApiResponse, WebhookConfig } from '../types';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const webhook = await webhookService.createWebhook(req.body);
    
    res.status(201).json({
      success: true,
      data: webhook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create webhook',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const webhooks = await webhookService.getWebhooks();
    
    res.json({
      success: true,
      data: webhooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch webhooks',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.patch('/:id/toggle', async (req, res) => {
  try {
    const webhook = await webhookService.toggleWebhook(req.params.id);
    
    res.json({
      success: true,
      data: webhook
    });
  } catch (error) {
    const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      error: 'Failed to toggle webhook',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/logs', async (req, res) => {
  try {
    const webhookId = req.query.webhookId as string;
    const logs = await webhookService.getWebhookLogs(webhookId);
    
    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch webhook logs',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;