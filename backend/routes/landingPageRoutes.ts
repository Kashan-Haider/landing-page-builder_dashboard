// routes/landingPageRoutes.ts
import express from 'express';
import { landingPageService } from '../services/landingPageService';

const router = express.Router();

// Get all landing pages
router.get('/', async (req, res) => {
  try {
    // Fix: Use correct method name
    const landingPages = await landingPageService.getAllLandingPages();
    res.json(landingPages);
  } catch (error) {
    console.error('Get landing pages error:', error);
    res.status(500).json({ error: 'Failed to fetch landing pages' });
  }
});

// Get landing page by ID
router.get('/:id', async (req, res) => {
  try {
    // Fix: Use correct method name
    const landingPage = await landingPageService.getLandingPageById(req.params.id);
    if (!landingPage) {
      return res.status(404).json({ error: 'Landing page not found' });
    }
    res.json(landingPage);
  } catch (error) {
    console.error('Get landing page error:', error);
    res.status(500).json({ error: 'Failed to fetch landing page' });
  }
});

// Create landing page
router.post('/', async (req, res) => {
  try {
    const landingPage = await landingPageService.createLandingPage(req.body);
    res.status(201).json(landingPage);
  } catch (error) {
    console.error('Create landing page error:', error);
    res.status(500).json({ error: 'Failed to create landing page' });
  }
});

// Update landing page
router.put('/:id', async (req, res) => {
  try {
    const landingPage = await landingPageService.updateLandingPage(req.params.id, req.body);
    res.json(landingPage);
  } catch (error) {
    console.error('Update landing page error:', error);
    res.status(500).json({ error: 'Failed to update landing page' });
  }
});

// Delete landing page
router.delete('/:id', async (req, res) => {
  try {
    await landingPageService.deleteLandingPage(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Delete landing page error:', error);
    res.status(500).json({ error: 'Failed to delete landing page' });
  }
});

export default router;