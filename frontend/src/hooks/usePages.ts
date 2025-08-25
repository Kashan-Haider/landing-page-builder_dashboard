// Simple Pages Hook - Easy state management for pages
// This replaces the complex useLandingPages with cleaner, beginner-friendly code
import { useState, useEffect } from 'react';
import type { LandingPage } from '../types/landingPageDataTypes';
import { usePageApi } from './usePageApi';

export const usePages = () => {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [filteredPages, setFilteredPages] = useState<LandingPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { getAllPages, loading, error } = usePageApi();

  // Load all pages when component mounts
  const loadPages = async () => {
    try {
      const allPages = await getAllPages();
      setPages(allPages);
      setFilteredPages(allPages);
    } catch (err) {
      console.error('Failed to load pages:', err);
    }
  };

  // Load pages on component mount
  useEffect(() => {
    loadPages();
  }, []);

  // Filter pages when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setFilteredPages(pages);
    } else {
      const filtered = pages.filter(
        (page) =>
          page.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          page.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          page.templateId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPages(filtered);
    }
  }, [searchTerm, pages]);

  // Update a page in the list
  const updatePageInList = (updatedPage: LandingPage) => {
    const updatedPages = pages.map((page) =>
      page.id === updatedPage.id ? updatedPage : page
    );
    setPages(updatedPages);
    
    // Update selected page if it's the same one
    if (selectedPage?.id === updatedPage.id) {
      setSelectedPage(updatedPage);
    }
  };

  // Remove a page from the list
  const removePageFromList = (pageId: string) => {
    const updatedPages = pages.filter((page) => page.id !== pageId);
    setPages(updatedPages);
    setFilteredPages(updatedPages);
    
    // Clear selection if deleted page was selected
    if (selectedPage?.id === pageId) {
      setSelectedPage(null);
    }
  };

  return {
    pages,
    filteredPages,
    selectedPage,
    searchTerm,
    loading,
    error,
    setSelectedPage,
    setSearchTerm,
    updatePageInList,
    removePageFromList,
    refreshPages: loadPages,
  };
};
