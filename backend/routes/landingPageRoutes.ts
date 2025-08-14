import express from 'express';
import { landingPageService } from '../services/landingPageService';
import { ApiResponse, CreateLandingPageData } from '../types';

const router = express.Router();

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
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch landing pages',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(response);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const landingPage = await landingPageService.getLandingPageById(req.params.id);
    if (!landingPage) {
      return res.status(404).json({
        success: false,
        error: 'Landing page not found'
      });
    }
    
    res.json({
      success: true,
      data: landingPage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch landing page',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Request body is empty'
      });
    }
    
    const landingPage = await landingPageService.createLandingPage(req.body);
    
    res.status(201).json({
      success: true,
      data: landingPage
    });
  } catch (error) {
    const statusCode = error instanceof Error && error.message.includes('required') ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      error: 'Failed to create landing page',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const landingPage = await landingPageService.updateLandingPage(req.params.id, req.body);
    
    res.json({
      success: true,
      data: landingPage
    });
  } catch (error) {
    const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      error: 'Failed to update landing page',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await landingPageService.deleteLandingPage(req.params.id);
    
    res.json({
      success: true,
      message: 'Landing page deleted successfully'
    });
  } catch (error) {
    const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      error: 'Failed to delete landing page',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;