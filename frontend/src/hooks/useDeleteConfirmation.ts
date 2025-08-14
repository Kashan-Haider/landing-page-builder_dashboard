import { useState } from 'react';
import type { LandingPage } from '../types/landingPageDataTypes';
import { useLandingPageApi } from './useLandingPageApi';

interface UseDeleteConfirmationReturn {
  showDeleteConfirm: boolean;
  pageToDelete: LandingPage | null;
  deleteLoading: boolean;
  handleDeletePage: (page: LandingPage) => void;
  confirmDelete: () => Promise<void>;
  cancelDelete: () => void;
}

export const useDeleteConfirmation = (
  onPageDeleted: (pageId: string) => void,
  onError: (error: string) => void
): UseDeleteConfirmationReturn => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<LandingPage | null>(null);
  const { deleteLoading, deletePage } = useLandingPageApi();

  const handleDeletePage = (page: LandingPage) => {
    setPageToDelete(page);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!pageToDelete) return;

    try {
      await deletePage(pageToDelete.id);
      onPageDeleted(pageToDelete.id);
      setShowDeleteConfirm(false);
      setPageToDelete(null);
    } catch (err) {
      onError('Failed to delete landing page');
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setPageToDelete(null);
  };

  return {
    showDeleteConfirm,
    pageToDelete,
    deleteLoading,
    handleDeletePage,
    confirmDelete,
    cancelDelete,
  };
};
