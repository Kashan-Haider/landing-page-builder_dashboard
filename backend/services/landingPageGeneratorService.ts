// Landing Page Generator Service - Orchestrates landing page creation using modular services
import { templateDataService } from './templateDataService';
import { repoService } from './repoService';
import { envService } from './envService';

interface GenerateLandingPageInput {
  businessName: string;
  templateId: string;
  githubUrl: string;
}

interface SimpleLandingPageInput {
  businessName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
}

interface EnhancedLandingPageInput {
  businessName: string;
  templateId: string;
  githubUrl: string;
  email?: string;
  phone?: string;
  city?: string;
  country?: string;
}

interface ComprehensiveLandingPageInput {
  businessName: string;
  templateId: string;
  githubUrl: string;
  email: string;
  phone: string;
  emergencyPhone?: string;
  emergencyEmail?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  services: {
    name: string;
    description?: string;
    price?: string;
    features: string[];
  }[];
  serviceAreas: {
    city: string;
    region: string;
    description?: string;
  }[];
  themeData: {
    primaryColor: string;
    secondaryColor: string;
  };
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
  companyDetails: any;
  images: any[];
}

class LandingPageGeneratorService {
  // Generate comprehensive landing page data from enhanced business information
  async generateComprehensiveLandingPageData(input: ComprehensiveLandingPageInput): Promise<LandingPageTemplate> {
    try {
      // Load the sample template data
      const sampleData = await templateDataService.loadSampleTemplate();
      
      // Prepare template data with business name and template info
      const customizedData = templateDataService.prepareTemplateData(sampleData, {
        businessName: input.businessName,
        templateId: input.templateId,
        githubUrl: input.githubUrl
      });
      
      // Enhance business data with comprehensive contact information
      if (customizedData.businessData) {
        customizedData.businessData = {
          ...customizedData.businessData,
          email: input.email,
          phone: input.phone,
          ...(input.emergencyPhone && { emergencyPhone: input.emergencyPhone }),
          ...(input.emergencyEmail && { emergencyEmail: input.emergencyEmail }),
          address: {
            street: input.address.street,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode,
            country: input.address.country
          },
          serviceAreas: input.serviceAreas.map(area => ({
            city: area.city,
            region: area.region,
            description: area.description || `Professional services available in ${area.city}, ${area.region}`
          }))
        };
      }
      
      // Update services content with user-provided services
      if (customizedData.content && customizedData.content.services && input.services.length > 0) {
        customizedData.content.services = {
          ...customizedData.content.services,
          services: input.services.map(service => ({
            name: service.name,
            description: service.description || `Professional ${service.name.toLowerCase()} services tailored to your business needs.`,
            price: service.price || 'Contact for pricing',
            features: service.features.filter(feature => feature.trim() !== '') || [
              'Professional service delivery',
              'Expert consultation',
              'Quality assurance',
              'Ongoing support'
            ]
          }))
        };
      }
      
      // Update theme data with user-provided colors
      if (customizedData.themeData && input.themeData) {
        customizedData.themeData = {
          ...customizedData.themeData,
          primaryColor: input.themeData.primaryColor,
          secondaryColor: input.themeData.secondaryColor
        };
      }
      
      return customizedData;
    } catch (error) {
      console.error('Error generating comprehensive landing page data:', error);
      throw new Error('Failed to generate comprehensive landing page data');
    }
  }

  // Generate simplified landing page data from basic business information
  async generateSimpleLandingPageData(input: SimpleLandingPageInput): Promise<LandingPageTemplate> {
    try {
      // Load the sample template data
      const sampleData = await templateDataService.loadSampleTemplate();
      
      // Create enhanced input with default template settings
      const enhancedInput = {
        businessName: input.businessName,
        templateId: 'default-template',
        githubUrl: 'https://github.com/default/template',
        email: input.email,
        phone: input.phone,
        city: input.city,
        country: input.country
      };
      
      // Prepare template data with business name
      const customizedData = templateDataService.prepareTemplateData(sampleData, enhancedInput);
      
      // Enhance business data with contact information
      if (customizedData.businessData) {
        customizedData.businessData = {
          ...customizedData.businessData,
          email: input.email,
          phone: input.phone,
          location: {
            city: input.city,
            country: input.country
          }
        };
      }
      
      return customizedData;
    } catch (error) {
      console.error('Error generating simple landing page data:', error);
      throw new Error('Failed to generate simple landing page data');
    }
  }

  async generateEnhancedLandingPageData(input: EnhancedLandingPageInput): Promise<LandingPageTemplate> {
    try {
      // Load the sample template data (for now, we'll use the sample template regardless of templateId)
      const sampleData = await templateDataService.loadSampleTemplate();
      
      // Prepare template data with business name and template info
      const customizedData = templateDataService.prepareTemplateData(sampleData, input);
      
      // Enhance business data with contact information if provided
      if (customizedData.businessData && (input.email || input.phone || input.city || input.country)) {
        customizedData.businessData = {
          ...customizedData.businessData,
          ...(input.email && { email: input.email }),
          ...(input.phone && { phone: input.phone }),
          ...(input.city || input.country) && {
            location: {
              ...(input.city && { city: input.city }),
              ...(input.country && { country: input.country })
            }
          }
        };
      }
      
      return customizedData;
    } catch (error) {
      console.error('Error generating enhanced landing page data:', error);
      throw new Error('Failed to generate enhanced landing page data');
    }
  }

  // Generate landing page data from sample template (original method)
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
