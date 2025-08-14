import express from 'express';
import { landingPageService } from '../services/landingPageService';
import { ApiResponse, CreateLandingPageData } from '../types';

const router = express.Router();

// Get all landing pages
router.get('/', async (req, res) => {
  try {
    const landingPages = await landingPageService.getAllLandingPages();
    const response: ApiResponse = {
      success: true,
      data: landingPages,
      message: 'Landing pages fetched successfully'
    };
    res.json(response);
  } catch (error) {
    console.error('Get landing pages error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch landing pages',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(response);
  }
});

// Get landing page by ID
router.get('/:id', async (req, res) => {
  try {
    const landingPage = await landingPageService.getLandingPageById(req.params.id);
    if (!landingPage) {
      const response: ApiResponse = {
        success: false,
        error: 'Landing page not found',
        message: `Landing page with ID ${req.params.id} does not exist`
      };
      return res.status(404).json(response);
    }
    
    const response: ApiResponse = {
      success: true,
      data: landingPage,
      message: 'Landing page fetched successfully'
    };
    res.json(response);
  } catch (error) {
    console.error('Get landing page error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch landing page',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(response);
  }
});

// Create landing page
router.post('/', async (req, res) => {
  try {
    // Debug logging
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Request headers content-type:', req.headers['content-type']);
    console.log('Body keys:', Object.keys(req.body || {}));
    
    // Validate request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      const response: ApiResponse = {
        success: false,
        error: 'Request body is empty',
        message: 'Please provide landing page data in the request body'
      };
      return res.status(400).json(response);
    }
    
    const landingPageData: CreateLandingPageData = req.body;
    const landingPage = await landingPageService.createLandingPage(landingPageData);
    
    const response: ApiResponse = {
      success: true,
      data: landingPage,
      message: 'Landing page created successfully'
    };
    res.status(201).json(response);
  } catch (error) {
    console.error('Create landing page error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to create landing page',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    
    // Return 400 for validation errors, 500 for server errors
    const statusCode = error instanceof Error && error.message.includes('required') ? 400 : 500;
    res.status(statusCode).json(response);
  }
});

// Update landing page
router.put('/:id', async (req, res) => {
  try {
    const landingPage = await landingPageService.updateLandingPage(req.params.id, req.body);
    
    const response: ApiResponse = {
      success: true,
      data: landingPage,
      message: 'Landing page updated successfully'
    };
    res.json(response);
  } catch (error) {
    console.error('Update landing page error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to update landing page',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    
    // Return 404 for not found, 500 for server errors
    const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json(response);
  }
});

// Delete landing page
router.delete('/:id', async (req, res) => {
  try {
    await landingPageService.deleteLandingPage(req.params.id);
    
    const response: ApiResponse = {
      success: true,
      message: 'Landing page deleted successfully'
    };
    res.json(response);
  } catch (error) {
    console.error('Delete landing page error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to delete landing page',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    
    // Return 404 for not found, 500 for server errors
    const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json(response);
  }
});

export default router;