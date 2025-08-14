import express from 'express';
import { webhookService } from '../services/webhookService';
import { WebhookConfig } from '../types';
import { 
  asyncHandler, 
  sendSuccess, 
  handleServiceError 
} from '../middleware/errorHandler';

const router = express.Router();

// Create new webhook
router.post('/', asyncHandler(async (req, res) => {
  const webhook = await webhookService.createWebhook(req.body);
  sendSuccess(res, webhook, 'Webhook created successfully', 201);
}));

// Get all webhooks
router.get('/', asyncHandler(async (req, res) => {
  const webhooks = await webhookService.getWebhooks();
  sendSuccess(res, webhooks, 'Webhooks fetched successfully');
}));

// Toggle webhook active status
router.patch('/:id/toggle', asyncHandler(async (req, res) => {
  const webhook = await webhookService.toggleWebhook(req.params.id);
  sendSuccess(res, webhook, 'Webhook status updated successfully');
}));

// Get webhook logs
router.get('/logs', asyncHandler(async (req, res) => {
  const webhookId = req.query.webhookId as string;
  const logs = await webhookService.getWebhookLogs(webhookId);
  sendSuccess(res, logs, 'Webhook logs fetched successfully');
}));

export default router;