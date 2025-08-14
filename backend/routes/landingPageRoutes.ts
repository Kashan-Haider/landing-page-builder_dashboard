import express from 'express';
import { landingPageService } from '../services/landingPageService';
import { CreateLandingPageData } from '../types';
import { 
  asyncHandler, 
  sendSuccess, 
  handleServiceError 
} from '../middleware/errorHandler';
import { validateBody } from '../middleware/validation';
import { 
  createLandingPageSchema, 
  updateLandingPageSchema 
} from '../validation/schemas';
import { z } from 'zod';

const router = express.Router();

// Parameter validation schema
const idParamsSchema = z.object({
  id: z.string().min(1, 'ID is required')
});

// Get all landing pages
router.get('/', asyncHandler(async (req, res) => {
  const landingPages = await landingPageService.getAllLandingPages();
  sendSuccess(res, landingPages, 'Landing pages fetched successfully');
}));

// Get landing page by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const landingPage = await landingPageService.getLandingPageById(req.params.id);
  
  if (!landingPage) {
    return handleServiceError(new Error('Landing page not found'), res, 'Failed to fetch landing page');
  }
  
  sendSuccess(res, landingPage, 'Landing page fetched successfully');
}));

// Create new landing page
router.post('/', 
  validateBody(createLandingPageSchema),
  asyncHandler(async (req, res) => {
    const landingPage = await landingPageService.createLandingPage(req.body);
    sendSuccess(res, landingPage, 'Landing page created successfully', 201);
  })
);

// Update landing page
router.put('/:id',
  validateBody(updateLandingPageSchema),
  asyncHandler(async (req, res) => {
    const landingPage = await landingPageService.updateLandingPage(req.params.id, req.body);
    sendSuccess(res, landingPage, 'Landing page updated successfully');
  })
);

// Delete landing page
router.delete('/:id', asyncHandler(async (req, res) => {
  await landingPageService.deleteLandingPage(req.params.id);
  sendSuccess(res, null, 'Landing page deleted successfully');
}));

export default router;