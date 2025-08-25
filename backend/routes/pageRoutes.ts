// Page Routes - API endpoints for managing landing pages
// This file defines all HTTP routes for page CRUD operations
import express from 'express';
import { pageService } from '../services/pageService';
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
} from '../validation/pageSchemas';

const router = express.Router();

// Get all pages
router.get('/', asyncHandler(async (req, res) => {
  const pages = await pageService.getAllPages();
  sendSuccess(res, pages, 'Pages fetched successfully');
}));

// Get page by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const page = await pageService.getPageById(req.params.id);
  
  if (!page) {
    return handleServiceError(new Error('Page not found'), res, 'Failed to fetch page');
  }
  
  sendSuccess(res, page, 'Page fetched successfully');
}));

// Create new page
router.post('/', 
  validateBody(createLandingPageSchema),
  asyncHandler(async (req, res) => {
    const page = await pageService.createPage(req.body);
    sendSuccess(res, page, 'Page created successfully', 201);
  })
);

// Update page
router.put('/:id',
  validateBody(updateLandingPageSchema),
  asyncHandler(async (req, res) => {
    const page = await pageService.updatePage(req.params.id, req.body);
    sendSuccess(res, page, 'Page updated successfully');
  })
);

// Delete page
router.delete('/:id', asyncHandler(async (req, res) => {
  const result = await pageService.deletePage(req.params.id);
  sendSuccess(res, result, 'Page deleted successfully');
}));

// Publish page
router.post('/:id/publish', asyncHandler(async (req, res) => {
  const page = await pageService.publishPage(req.params.id);
  sendSuccess(res, page, 'Page published successfully');
}));

// Unpublish page
router.post('/:id/unpublish', asyncHandler(async (req, res) => {
  const page = await pageService.unpublishPage(req.params.id);
  sendSuccess(res, page, 'Page unpublished successfully');
}));

// Archive page
router.post('/:id/archive', asyncHandler(async (req, res) => {
  const page = await pageService.archivePage(req.params.id);
  sendSuccess(res, page, 'Page archived successfully');
}));

// Get images for page
router.get('/:id/images', asyncHandler(async (req, res) => {
  const images = await pageService.getImages(req.params.id);
  sendSuccess(res, images, 'Images fetched successfully');
}));

// Add image to page
router.post('/:id/images',
  validateBody(createImageSchema),
  asyncHandler(async (req, res) => {
    const image = await pageService.addImage(req.params.id, req.body);
    sendSuccess(res, image, 'Image added successfully', 201);
  })
);

// Delete image from page
router.delete('/images/:imageId', asyncHandler(async (req, res) => {
  const result = await pageService.deleteImage(req.params.imageId);
  sendSuccess(res, result, 'Image deleted successfully');
}));

export default router;
