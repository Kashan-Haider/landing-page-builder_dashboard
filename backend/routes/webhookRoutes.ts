// webhookRoutes.ts
import express from 'express';
import { webhookService } from '../services/webhookService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const webhook = await webhookService.createWebhook(req.body);
    res.status(201).json(webhook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create webhook'+ error });
  }
});

router.get('/', async (req, res) => {
  try {
    const webhooks = await webhookService.getWebhooks();
    res.json(webhooks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch webhooks' });
  }
});

router.patch('/:id/toggle', async (req, res) => {
  try {
    const webhook = await webhookService.toggleWebhook(req.params.id);
    res.json(webhook);
  } catch (error) {
    res.status(404).json({ error: 'Webhook not found' });
  }
});

router.get('/logs', async (req, res) => {
  try {
    const webhookId = req.query.webhookId as string;
    const logs = await webhookService.getWebhookLogs(webhookId);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

export default router;