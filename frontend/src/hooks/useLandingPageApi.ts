import { useState } from 'react';
import type { LandingPage } from '../types/landingPageDataTypes';

interface UseLandingPageApiReturn {
  saveLoading: boolean;
  deleteLoading: boolean;
  savePage: (pageId: string, data: Partial<LandingPage>) => Promise<LandingPage>;
  deletePage: (pageId: string) => Promise<void>;
}

const API_BASE_URL = 'http://localhost:3000/api';

const transformServerDataForForm = (serverData: LandingPage): LandingPage => {
  const formData = { ...serverData };
  
  const fieldMappings = {
    'BusinessContact': 'businessContact',
    'SEOSettings': 'seoSettings',
    'Theme': 'theme',
    'ServiceArea': 'serviceAreas',
    'SocialLink': 'socialLink',
    'ImagesPool': 'imagePool',
    'HeroSection': 'heroSection',
    'AboutSection': 'aboutSection',
    'ServicesSection': 'servicesSection',
    'GallerySection': 'gallerySection',
    'TestimonialsSection': 'testimonialsSection',
    'FAQSection': 'faqSection',
    'ServiceAreaSection': 'serviceAreaSection',
    'BusinessDetailsSection': 'businessDetailsSection',
    'CompanyOverviewSection': 'companyOverviewSection',
    'ServiceHighlightsSection': 'serviceHighlightsSection',
    'PreFooterSection': 'preFooterSection',
    'FooterSection': 'footerSection'
  };
  
  Object.entries(fieldMappings).forEach(([serverKey, formKey]) => {
    if (serverData[serverKey as keyof LandingPage]) {
      (formData as any)[formKey] = serverData[serverKey as keyof LandingPage];
    }
  });
  
  return formData;
};

const transformFormDataForBackend = (formData: Partial<LandingPage>) => {
  const sectionFields = [
    'businessContact', 'seoSettings', 'theme', 'serviceAreas', 'socialLink', 'imagePool',
    'heroSection', 'aboutSection', 'servicesSection', 'gallerySection', 'testimonialsSection',
    'faqSection', 'serviceAreaSection', 'businessDetailsSection', 'companyOverviewSection',
    'serviceHighlightsSection', 'preFooterSection', 'footerSection'
  ];
  
  const allowedFields = ['businessName', 'templateId', 'githubUrl', ...sectionFields];
  const filteredData: any = {};
  
  allowedFields.forEach(field => {
    if (formData[field as keyof LandingPage] !== undefined) {
      filteredData[field] = formData[field as keyof LandingPage];
    }
  });
  
  return filteredData;
};

export const useLandingPageApi = (): UseLandingPageApiReturn => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const savePage = async (pageId: string, data: Partial<LandingPage>): Promise<LandingPage> => {
    setSaveLoading(true);
    try {
      const transformedData = transformFormDataForBackend(data);
      
      const response = await fetch(`${API_BASE_URL}/landing-pages/${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Save operation failed');
      }
      
      return result.data;
    } catch (err) {
      throw err;
    } finally {
      setSaveLoading(false);
    }
  };

  const deletePage = async (pageId: string) => {
    setDeleteLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/landing-pages/${pageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      throw err;
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    saveLoading,
    deleteLoading,
    savePage,
    deletePage,
  };
};
