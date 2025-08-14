import { useState, useEffect } from 'react';
import type { LandingPage } from '../types/landingPageDataTypes';

interface UseLandingPagesReturn {
  landingPages: LandingPage[];
  filteredPages: LandingPage[];
  selectedPage: LandingPage | null;
  searchTerm: string;
  loading: boolean;
  error: string | null;
  setSelectedPage: (page: LandingPage | null) => void;
  setSearchTerm: (term: string) => void;
  updatePage: (updatedPage: LandingPage) => void;
  deletePage: (pageId: string) => void;
  refreshPages: () => Promise<void>;
}

const API_BASE_URL = 'http://localhost:3000/api';

export const useLandingPages = (): UseLandingPagesReturn => {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [filteredPages, setFilteredPages] = useState<LandingPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLandingPages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/landing-pages`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiResponse = await response.json();

      const data = apiResponse.success && apiResponse.data ? apiResponse.data : apiResponse;
      const pagesArray = Array.isArray(data) ? data : [];
      setLandingPages(pagesArray);
      setFilteredPages(pagesArray);
    } catch (err) {
      setError('Failed to fetch landing pages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLandingPages();
  }, []);

  useEffect(() => {
    if (!Array.isArray(landingPages)) {
      return;
    }

    if (!searchTerm) {
      setFilteredPages(landingPages);
    } else {
      const filtered = landingPages.filter(
        (page) =>
          page.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          page.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          page.templateId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPages(filtered);
    }
  }, [searchTerm, landingPages]);

  const updatePage = (updatedPage: LandingPage) => {
    const updatedPages = landingPages.map((page) =>
      page.id === updatedPage.id ? updatedPage : page
    );
    setLandingPages(updatedPages);
    
    if (selectedPage?.id === updatedPage.id) {
      setSelectedPage(updatedPage);
    }
  };

  const deletePage = (pageId: string) => {
    const updatedPages = landingPages.filter((page) => page.id !== pageId);
    setLandingPages(updatedPages);
    setFilteredPages(updatedPages);
    
    if (selectedPage?.id === pageId) {
      setSelectedPage(null);
    }
  };

  return {
    landingPages,
    filteredPages,
    selectedPage,
    searchTerm,
    loading,
    error,
    setSelectedPage,
    setSearchTerm,
    updatePage,
    deletePage,
    refreshPages: fetchLandingPages,
  };
};
