// Template Data Service - Handles JSON template operations
import fs from 'fs/promises';
import path from 'path';

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

class TemplateDataService {
  private sampleDataPath = path.join(process.cwd(), '..', 'sample-page.json');

  // Load sample template from JSON file
  async loadSampleTemplate(): Promise<any> {
    try {
      const data = await fs.readFile(this.sampleDataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading sample template:', error);
      throw new Error('Failed to load sample template');
    }
  }

  // Replace placeholders with actual business name
  replacePlaceholders(data: any, businessName: string): any {
    const dataString = JSON.stringify(data);
    
    // Replace various forms of the placeholder business name
    const replacedString = dataString
      .replace(/Acme Professional Business Solutions/g, businessName)
      .replace(/Acme Professional Solutions/g, businessName)
      .replace(/Acme/g, businessName.split(' ')[0] || businessName)
      .replace(/acmeprofessional/g, businessName.toLowerCase().replace(/\s+/g, ''))
      .replace(/acme-professional/g, businessName.toLowerCase().replace(/\s+/g, '-'))
      .replace(/acme_professional/g, businessName.toLowerCase().replace(/\s+/g, '_'));
    
    return JSON.parse(replacedString);
  }

  // Generate unique page ID from business name
  generatePageId(businessName: string): string {
    const cleanName = businessName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    
    const timestamp = Date.now().toString(36);
    return `${cleanName}-${timestamp}`;
  }

  // Prepare template data with business name and metadata
  prepareTemplateData(sampleData: any, input: { businessName: string; templateId: string; githubUrl: string }): LandingPageTemplate {
    const pageId = this.generatePageId(input.businessName);
    const customizedData = this.replacePlaceholders(sampleData, input.businessName);
    
    // Update template-specific fields
    customizedData.id = pageId;
    customizedData.templateId = input.templateId;
    customizedData.businessName = input.businessName;
    customizedData.githubUrl = input.githubUrl;
    customizedData.status = 'draft';
    
    // Update timestamps
    const now = new Date().toISOString();
    customizedData.createdAt = now;
    customizedData.updatedAt = now;
    customizedData.publishedAt = null;

    // Ensure all images have required fields including category
    if (customizedData.images && Array.isArray(customizedData.images)) {
      customizedData.images = customizedData.images.map((image: any) => ({
        ...image,
        category: image.category || 'general',
        slotName: image.slotName || 'default-slot',
        title: image.title || '',
        altText: image.altText || '',
        imageUrl: image.imageUrl || ''
      }));
    }

    return customizedData;
  }
}

export const templateDataService = new TemplateDataService();
