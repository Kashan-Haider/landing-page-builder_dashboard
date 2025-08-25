import express from "express";
import { webhookService } from "../services/webhookService";
import { WebhookConfig } from "../types";
import {
  asyncHandler,
  sendSuccess,
  handleServiceError,
} from "../middleware/errorHandler";
import { validateBody, validateQuery } from "../middleware/validation";
import { createWebhookSchema } from "../validation/pageSchemas";
import { z } from "zod";

const router = express.Router();

// Query validation for webhook logs
const webhookLogsQuerySchema = z.object({
  webhookId: z.string().optional(),
});

// Create new webhook
router.post(
  "/",
  validateBody(createWebhookSchema),
  asyncHandler(async (req, res) => {
    const webhook = await webhookService.createWebhook(req.body);
    sendSuccess(res, webhook, "Webhook created successfully", 201);
  })
);

// Get all webhooks
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const webhooks = await webhookService.getWebhooks();
    sendSuccess(res, webhooks, "Webhooks fetched successfully");
  })
);

// Toggle webhook active status
// router.patch('/:id/toggle', asyncHandler(async (req, res) => {
//   const webhook = await webhookService.toggleWebhook(req.params.id);
//   sendSuccess(res, webhook, 'Webhook status updated successfully');
// }));

// Get webhook logs
router.get(
  "/logs",
  validateQuery(webhookLogsQuerySchema),
  asyncHandler(async (req, res) => {
    const { webhookId } = req.query;
    const logs = await webhookService.getWebhookLogs(webhookId as string);
    sendSuccess(res, logs, "Webhook logs fetched successfully");
  })
);

export default router;
