// hooks/useEditableLandingPage.ts
import { useState, useCallback } from 'react';

// Define LandingPage interface locally since we can't import from the dashboard component
interface LandingPage {
  id: string;
  templateId: string;
  businessName: string;
  githubUrl?: string;
  createdAt: string;
  updatedAt: string;
  seoSettingsId?: string;
  businessContactId?: string;
  businessContact?: any;
  seoSettings?: any;
  theme?: any;
  // One-to-one section relationships
  serviceArea?: any;
  socialLink?: any;
  image?: any;
  heroSection?: any;
  aboutSection?: any;
  servicesSection?: any;
  gallerySection?: any;
  testimonialsSection?: any;
  faqSection?: any;
  serviceAreaSection?: any;
  businessDetailsSection?: any;
  companyOverviewSection?: any;
  serviceHighlightsSection?: any;
  preFooterSection?: any;
  footerSection?: any;
}

interface UseEditableLandingPageProps {
  initialLandingPage: LandingPage;
}

interface UseEditableLandingPageReturn {
  landingPage: LandingPage;
  updateField: (field: string, value: any) => void;
  updateNestedField: (parent: string, index: number, field: string, value: any) => void;
  addNewItem: (section: string, item: any) => void;
  removeItem: (section: string, index: number) => void;
  saveChanges: () => Promise<void>;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
}

export const useEditableLandingPage = ({ 
  initialLandingPage 
}: UseEditableLandingPageProps): UseEditableLandingPageReturn => {
  const [landingPage, setLandingPage] = useState<LandingPage>(initialLandingPage);
  const [originalLandingPage] = useState<LandingPage>(initialLandingPage);
  const [isSaving, setIsSaving] = useState(false);
  
  const hasUnsavedChanges = JSON.stringify(landingPage) !== JSON.stringify(originalLandingPage);

  const updateField = useCallback((field: string, value: any) => {
    setLandingPage((prev: LandingPage) => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateNestedField = useCallback((parent: string, index: number, field: string, value: any) => {
    setLandingPage((prev: LandingPage) => {
      const updatedParent = [...(prev as any)[parent]];
      updatedParent[index] = {
        ...updatedParent[index],
        [field]: value
      };
      
      return {
        ...prev,
        [parent]: updatedParent
      };
    });
  }, []);

  const addNewItem = useCallback((section: string, item: any) => {
    setLandingPage((prev: LandingPage) => ({
      ...prev,
      [section]: [...(prev as any)[section], item]
    }));
  }, []);

  const removeItem = useCallback((section: string, index: number) => {
    setLandingPage((prev: LandingPage) => {
      const updatedSection = [...(prev as any)[section]];
      updatedSection.splice(index, 1);
      return {
        ...prev,
        [section]: updatedSection
      };
    });
  }, []);

  const saveChanges = useCallback(async () => {
    try {
      setIsSaving(true);
      const response = await fetch(`http://localhost:3000/api/landing-pages/${landingPage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(landingPage),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // Update original state after successful save
      // In a real app, you might want to refetch the data
    } catch (error) {
      console.error('Failed to save changes:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [landingPage]);

  return {
    landingPage,
    updateField,
    updateNestedField,
    addNewItem,
    removeItem,
    saveChanges,
    isSaving,
    hasUnsavedChanges
  };
};