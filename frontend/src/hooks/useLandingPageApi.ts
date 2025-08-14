import { useState } from 'react';
import type { LandingPage } from '../types/landingPageDataTypes';

interface UseLandingPageApiReturn {
  saveLoading: boolean;
  deleteLoading: boolean;
  savePage: (pageId: string, data: Partial<LandingPage>) => Promise<void>;
  deletePage: (pageId: string) => Promise<void>;
}

const API_BASE_URL = 'http://localhost:3000/api';

export const useLandingPageApi = (): UseLandingPageApiReturn => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const savePage = async (pageId: string, data: Partial<LandingPage>) => {
    setSaveLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/landing-pages/${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error('Error saving:', err);
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
      console.error('Error deleting landing page:', err);
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
