import { useState } from 'react';
import type { LandingPage, Image, ApiResponse } from '../types/landingPageDataTypes';

interface UseLandingPageApiReturn {
  loading: boolean;
  error: string | null;
  
  // Landing Page operations
  getLandingPage: (id: string) => Promise<LandingPage>;
  getAllLandingPages: () => Promise<LandingPage[]>;
  createLandingPage: (data: Partial<LandingPage>) => Promise<LandingPage>;
  updateLandingPage: (id: string, data: Partial<LandingPage>) => Promise<LandingPage>;
  deleteLandingPage: (id: string) => Promise<void>;
  
  // Status operations
  publishLandingPage: (id: string) => Promise<LandingPage>;
  unpublishLandingPage: (id: string) => Promise<LandingPage>;
  archiveLandingPage: (id: string) => Promise<LandingPage>;
  
  // Image operations
  uploadImage: (landingPageId: string, formData: FormData) => Promise<Image>;
  updateImage: (imageId: string, data: Partial<Image>) => Promise<Image>;
  deleteImage: (imageId: string) => Promise<void>;
  
  // Legacy compatibility
  savePage: (pageId: string, data: Partial<LandingPage>) => Promise<LandingPage>;
  deletePage: (pageId: string) => Promise<void>;
}

const API_BASE_URL = 'http://localhost:3000/api';

const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error occurred' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  const result: ApiResponse<T> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || result.message || 'Operation failed');
  }
  
  return result.data as T;
};

export const useLandingPageApi = (): UseLandingPageApiReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = async <T>(requestFn: () => Promise<T>): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      return await requestFn();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Landing Page operations
  const getLandingPage = async (id: string): Promise<LandingPage> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/landing-pages/${id}`);
      return handleApiResponse<LandingPage>(response);
    });
  };

  const getAllLandingPages = async (): Promise<LandingPage[]> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/landing-pages`);
      return handleApiResponse<LandingPage[]>(response);
    });
  };

  const createLandingPage = async (data: Partial<LandingPage>): Promise<LandingPage> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/landing-pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleApiResponse<LandingPage>(response);
    });
  };

  const updateLandingPage = async (id: string, data: Partial<LandingPage>): Promise<LandingPage> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/landing-pages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleApiResponse<LandingPage>(response);
    });
  };

  const deleteLandingPage = async (id: string): Promise<void> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/landing-pages/${id}`, {
        method: 'DELETE',
      });
      await handleApiResponse<void>(response);
    });
  };

  // Status operations
  const publishLandingPage = async (id: string): Promise<LandingPage> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/landing-pages/${id}/publish`, {
        method: 'POST',
      });
      return handleApiResponse<LandingPage>(response);
    });
  };

  const unpublishLandingPage = async (id: string): Promise<LandingPage> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/landing-pages/${id}/unpublish`, {
        method: 'POST',
      });
      return handleApiResponse<LandingPage>(response);
    });
  };

  const archiveLandingPage = async (id: string): Promise<LandingPage> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/landing-pages/${id}/archive`, {
        method: 'POST',
      });
      return handleApiResponse<LandingPage>(response);
    });
  };

  // Image operations
  const uploadImage = async (landingPageId: string, formData: FormData): Promise<Image> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/landing-pages/${landingPageId}/images`, {
        method: 'POST',
        body: formData,
      });
      return handleApiResponse<Image>(response);
    });
  };

  const updateImage = async (imageId: string, data: Partial<Image>): Promise<Image> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/images/${imageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleApiResponse<Image>(response);
    });
  };

  const deleteImage = async (imageId: string): Promise<void> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/images/${imageId}`, {
        method: 'DELETE',
      });
      await handleApiResponse<void>(response);
    });
  };

  // Legacy compatibility methods
  const savePage = async (pageId: string, data: Partial<LandingPage>): Promise<LandingPage> => {
    return updateLandingPage(pageId, data);
  };

  const deletePage = async (pageId: string): Promise<void> => {
    return deleteLandingPage(pageId);
  };

  return {
    loading,
    error,
    
    // Landing Page operations
    getLandingPage,
    getAllLandingPages,
    createLandingPage,
    updateLandingPage,
    deleteLandingPage,
    
    // Status operations
    publishLandingPage,
    unpublishLandingPage,
    archiveLandingPage,
    
    // Image operations
    uploadImage,
    updateImage,
    deleteImage,
    
    // Legacy compatibility
    savePage,
    deletePage,
    
    // Legacy loading states (for backward compatibility)
    saveLoading: loading,
    deleteLoading: loading,
  };
};
