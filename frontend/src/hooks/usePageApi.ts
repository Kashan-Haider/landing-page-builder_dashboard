// Simple Page API Hook - Easy-to-understand API calls for page management
// This replaces the complex useLandingPageApi with cleaner, beginner-friendly code
import { useState } from 'react';
import type { LandingPage, Image, ApiResponse } from '../types/landingPageDataTypes';

const API_BASE_URL = 'http://localhost:3000/api';

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(errorData.message || `Error: ${response.status}`);
  }
  
  const result: ApiResponse<T> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || result.message || 'Operation failed');
  }
  
  return result.data as T;
};

export const usePageApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple request wrapper
  const makeRequest = async <T>(requestFn: () => Promise<T>): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      return await requestFn();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get all pages
  const getAllPages = async (): Promise<LandingPage[]> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/pages`);
      return handleResponse<LandingPage[]>(response);
    });
  };

  // Get single page
  const getPage = async (id: string): Promise<LandingPage> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/pages/${id}`);
      return handleResponse<LandingPage>(response);
    });
  };

  // Create new page
  const createPage = async (data: Partial<LandingPage>): Promise<LandingPage> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse<LandingPage>(response);
    });
  };

  // Update existing page
  const updatePage = async (id: string, data: Partial<LandingPage>): Promise<LandingPage> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse<LandingPage>(response);
    });
  };

  // Delete page
  const deletePage = async (id: string): Promise<void> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
        method: 'DELETE',
      });
      await handleResponse<void>(response);
    });
  };

  // Publish page
  const publishPage = async (id: string): Promise<LandingPage> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/pages/${id}/publish`, {
        method: 'POST',
      });
      return handleResponse<LandingPage>(response);
    });
  };

  // Unpublish page
  const unpublishPage = async (id: string): Promise<LandingPage> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/pages/${id}/unpublish`, {
        method: 'POST',
      });
      return handleResponse<LandingPage>(response);
    });
  };

  // Archive page
  const archivePage = async (id: string): Promise<LandingPage> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/pages/${id}/archive`, {
        method: 'POST',
      });
      return handleResponse<LandingPage>(response);
    });
  };

  // Add image to page
  const addImage = async (pageId: string, imageData: any): Promise<Image> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/pages/${pageId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageData),
      });
      return handleResponse<Image>(response);
    });
  };

  // Delete image
  const deleteImage = async (imageId: string): Promise<void> => {
    return makeRequest(async () => {
      const response = await fetch(`${API_BASE_URL}/pages/images/${imageId}`, {
        method: 'DELETE',
      });
      await handleResponse<void>(response);
    });
  };

  return {
    loading,
    error,
    getAllPages,
    getPage,
    createPage,
    updatePage,
    deletePage,
    publishPage,
    unpublishPage,
    archivePage,
    addImage,
    deleteImage,
  };
};
