// Landing Page Generator Service - Orchestrates landing page creation using modular services
import { templateDataService } from './templateDataService';
import { repoService } from './repoService';
import { envService } from './envService';

interface GenerateLandingPageInput {
  businessName: string;
  templateId: string;
  githubUrl: string;
}

interface LandingPageTemplate {
  id: string;
  templateId: string;
  businessName: string;
  githubUrl: string;
  status: string;
  content: any;
  seoData: any;
  themeData: any;
  businessData: any;
  images: any[];
}

class LandingPageGeneratorService {
  // Generate landing page data from sample template
  async generateLandingPageData(input: GenerateLandingPageInput): Promise<LandingPageTemplate> {
    try {
      console.log(`🚀 Generating landing page for: ${input.businessName}`);
      
      // Load sample template
      const sampleData = await templateDataService.loadSampleTemplate();
      
      // Prepare customized template data
      const customizedData = templateDataService.prepareTemplateData(sampleData, input);
      
      console.log(`✅ Landing page data generated with ID: ${customizedData.id}`);
      return customizedData;
    } catch (error) {
      console.error('Error generating landing page data:', error);
      throw new Error(`Failed to generate landing page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Fetch, customize, and setup GitHub repository
  async fetchAndSetupRepo(input: GenerateLandingPageInput, pageId: string): Promise<string> {
    try {
      console.log(`🔧 Setting up repository for page: ${pageId}`);
      
      // Clone repository to root/templates directory
      const repoDir = await repoService.cloneRepository(input, pageId);
      
      // Create .env file
      await envService.writeEnvFile(repoDir, input.templateId, pageId);
      
      // Install dependencies
      await repoService.installDependencies(repoDir);
      
      // Build the template
      await repoService.buildTemplate(repoDir);
      
      console.log(`✅ Repository setup complete at: ${repoDir}`);
      return repoDir;
    } catch (error) {
      console.error('Error setting up repository:', error);
      throw new Error(`Failed to setup repository: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get repository information
  async getRepoInfo(pageId: string) {
    const repoDir = `/home/zephyr/Data/Projects/TLD/landing-page-builder/v3/templates/${pageId}`;
    return await repoService.getRepoInfo(repoDir);
  }

  // Clean up repository files
  async cleanupRepo(pageId: string): Promise<void> {
    const repoDir = `/home/zephyr/Data/Projects/TLD/landing-page-builder/v3/templates/${pageId}`;
    await repoService.cleanupRepo(repoDir);
  }
}

export const landingPageGeneratorService = new LandingPageGeneratorService();
