import express from 'express';
import { landingPageService } from '../services/landingPageService';
import { 
  asyncHandler, 
  sendSuccess, 
  handleServiceError 
} from '../middleware/errorHandler';
import { validateBody } from '../middleware/validation';
import { 
  createLandingPageSchema, 
  updateLandingPageSchema,
  createImageSchema
} from '../validation/schemas';

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
  const result = await landingPageService.deleteLandingPage(req.params.id);
  sendSuccess(res, result, 'Landing page deleted successfully');
}));

// Publish landing page
router.post('/:id/publish', asyncHandler(async (req, res) => {
  const landingPage = await landingPageService.publishLandingPage(req.params.id);
  sendSuccess(res, landingPage, 'Landing page published successfully');
}));

// Unpublish landing page
router.post('/:id/unpublish', asyncHandler(async (req, res) => {
  const landingPage = await landingPageService.unpublishLandingPage(req.params.id);
  sendSuccess(res, landingPage, 'Landing page unpublished successfully');
}));

// Archive landing page
router.post('/:id/archive', asyncHandler(async (req, res) => {
  const landingPage = await landingPageService.archiveLandingPage(req.params.id);
  sendSuccess(res, landingPage, 'Landing page archived successfully');
}));

// Get images for landing page
router.get('/:id/images', asyncHandler(async (req, res) => {
  const images = await landingPageService.getImages(req.params.id);
  sendSuccess(res, images, 'Images fetched successfully');
}));

// Add image to landing page
router.post('/:id/images',
  validateBody(createImageSchema),
  asyncHandler(async (req, res) => {
    const image = await landingPageService.addImage(req.params.id, req.body);
    sendSuccess(res, image, 'Image added successfully', 201);
  })
);

// Delete image from landing page
router.delete('/images/:imageId', asyncHandler(async (req, res) => {
  const result = await landingPageService.deleteImage(req.params.imageId);
  sendSuccess(res, result, 'Image deleted successfully');
}));

export default router;
