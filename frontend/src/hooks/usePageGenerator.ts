import { useState } from 'react';
import axios from 'axios';

interface GeneratePageInput {
  businessName: string;
  templateId: string;
  githubUrl: string;
}

interface GeneratedPage {
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
  createdAt: string;
  updatedAt: string;
}

interface UsePageGeneratorReturn {
  generatePage: (data: GeneratePageInput) => Promise<GeneratedPage>;
  isLoading: boolean;
  error: string | null;
}

const API_BASE_URL = 'http://localhost:3000/api';

export const usePageGenerator = (): UsePageGeneratorReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePage = async (data: GeneratePageInput): Promise<GeneratedPage> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/pages/generate`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to generate page');
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) 
        ? err.response?.data?.message || err.message || 'Network error occurred'
        : 'An unexpected error occurred';
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generatePage,
    isLoading,
    error,
  };
};
