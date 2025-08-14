import express from 'express';
import { landingPageService } from '../services/landingPageService';
import { CreateLandingPageData } from '../types';
import { 
  asyncHandler, 
  sendSuccess, 
  handleServiceError 
} from '../middleware/errorHandler';

const router = express.Router();

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
router.post('/', asyncHandler(async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return handleServiceError(new Error('Request body is empty'), res, 'Failed to create landing page');
  }
  
  const landingPage = await landingPageService.createLandingPage(req.body);
  sendSuccess(res, landingPage, 'Landing page created successfully', 201);
}));

// Update landing page
router.put('/:id', asyncHandler(async (req, res) => {
  const landingPage = await landingPageService.updateLandingPage(req.params.id, req.body);
  sendSuccess(res, landingPage, 'Landing page updated successfully');
}));

// Delete landing page
router.delete('/:id', asyncHandler(async (req, res) => {
  await landingPageService.deleteLandingPage(req.params.id);
  sendSuccess(res, null, 'Landing page deleted successfully');
}));

export default router;