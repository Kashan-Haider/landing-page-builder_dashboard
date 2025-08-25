import React, { useState } from "react";
import { CmsForm } from "../forms/CmsForm";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { ErrorDisplay } from "../shared/ErrorDisplay";
import { SearchBar } from "./SearchBar";
import { DashboardHeader } from "./DashboardHeader";
import { LandingPageList } from "./LandingPageList";
import { LandingPageDetails } from "./LandingPageDetails";
import { EmptyPageState } from "./EmptyPageState";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { usePages } from "../../hooks/usePages";
import { usePageApi } from "../../hooks/usePageApi";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import type { LandingPage } from "../../types/landingPageDataTypes";

const Dashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "edit">("list");

  const {
    filteredPages,
    selectedPage,
    searchTerm,
    loading,
    error,
    setSelectedPage,
    setSearchTerm,
    updatePageInList,
    removePageFromList,
    refreshPages,
  } = usePages();

  const { updatePage } = usePageApi();

  const {
    showDeleteConfirm,
    pageToDelete,
    deleteLoading,
    handleDeletePage,
    confirmDelete,
    cancelDelete,
  } = useDeleteConfirmation(removePageFromList, () => {});

  const handleSaveFromForm = async (data: Partial<LandingPage>) => {
    if (!selectedPage) return;

    try {
      const updatedPageFromServer = await updatePage(selectedPage.id, data);
      updatePageInList(updatedPageFromServer);
    } catch (err) {
      throw err;
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading landing pages..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refreshPages} />;
  }

  if (viewMode === "edit" && selectedPage) {
    return (
      <CmsForm
        page={selectedPage}
        onSave={handleSaveFromForm}
        onCancel={() => setViewMode("list")}
      />
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--gradient-dark)" }}
    >
      <DashboardHeader
        selectedPage={selectedPage}
        onEdit={() => setViewMode("edit")}
        onDelete={handleDeletePage}
      />

      <div className="px-4 md:px-20 lg:px-40 py-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search by ID, business name, or template ID..."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <LandingPageList
              pages={filteredPages}
              selectedPage={selectedPage}
              onPageSelect={setSelectedPage}
            />
          </div>

          <div className="lg:col-span-2">
            {selectedPage ? (
              <LandingPageDetails page={selectedPage} />
            ) : (
              <EmptyPageState />
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        page={pageToDelete}
        isDeleting={deleteLoading}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default Dashboard;
