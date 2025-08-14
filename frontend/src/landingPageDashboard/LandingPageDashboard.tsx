import React, { useState, useEffect } from "react";
import { DynamicLandingPageForm } from "../components/forms/DynamicLandingPageForm";
import type { LandingPage } from "../types/landingPageDataTypes";

const Dashboard: React.FC = () => {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [filteredPages, setFilteredPages] = useState<LandingPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "edit">("list");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<LandingPage | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch landing pages from API
  useEffect(() => {
    const fetchLandingPages = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/landing-pages");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiResponse = await response.json();
        console.log("API Response:", apiResponse); // Debug log

        // Handle the new API response structure {success, data, message}
        const data = apiResponse.success && apiResponse.data ? apiResponse.data : apiResponse;
        // Ensure data is an array
        const pagesArray = Array.isArray(data) ? data : [];
        setLandingPages(pagesArray);
        setFilteredPages(pagesArray);
      } catch (err) {
        setError("Failed to fetch landing pages");
        console.error("Error fetching landing pages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPages();
  }, []);

  // Filter pages based on search term
  useEffect(() => {
    // Ensure landingPages is an array before filtering
    if (!Array.isArray(landingPages)) {
      console.warn("landingPages is not an array:", landingPages);
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

  // Handle saving data from dynamic form
  const handleSaveFromDynamicForm = async (data: Partial<LandingPage>) => {
    if (!selectedPage) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/landing-pages/${selectedPage.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local state
      const updatedPage = { ...selectedPage, ...data };
      console.log(updatedPage);
      setSelectedPage(updatedPage);
      const updatedPages = landingPages.map((page) =>
        page.id === selectedPage.id ? updatedPage : page
      );
      setLandingPages(updatedPages);
    } catch (err) {
      console.error("Error saving:", err);
      throw err;
    }
  };

  // Handle delete landing page
  const handleDeletePage = async (page: LandingPage) => {
    setPageToDelete(page);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!pageToDelete) return;

    try {
      setDeleteLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/landing-pages/${pageToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local state - remove the deleted page
      const updatedPages = landingPages.filter(
        (page) => page.id !== pageToDelete.id
      );
      setLandingPages(updatedPages);
      setFilteredPages(updatedPages);
      
      // Clear selection if deleted page was selected
      if (selectedPage?.id === pageToDelete.id) {
        setSelectedPage(null);
      }

      // Close dialog
      setShowDeleteConfirm(false);
      setPageToDelete(null);
    } catch (err) {
      console.error("Error deleting landing page:", err);
      setError("Failed to delete landing page");
    } finally {
      setDeleteLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setPageToDelete(null);
  };

  // Render read-only field
  const renderField = (
    label: string,
    value: any,
    type: "text" | "email" | "number" | "textarea" | "array" = "text"
  ) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-200 mb-2">
          {label}
        </label>
        <div className="p-3 bg-slate-700 border border-slate-600 rounded-lg min-h-[40px] flex items-center">
          {type === "array" ? (
            Array.isArray(value) && value.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {value.map((item, index) => (
                  <span
                    key={index}
                    className="bg-blue-600/20 border border-blue-500/30 text-blue-300 px-2 py-1 rounded-md text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-slate-400">No items</span>
            )
          ) : (
            <span className={value ? "text-slate-100" : "text-slate-400"}>
              {value || "Not set"}
            </span>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading landing pages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-900/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If we're in edit mode and have a selected page, show the dynamic form
  if (viewMode === "edit" && selectedPage) {
    return (
      <DynamicLandingPageForm
        landingPage={selectedPage}
        onSave={handleSaveFromDynamicForm}
        onBack={() => setViewMode("list")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-100">
                Landing Page Dashboard
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Manage and edit your landing pages
              </p>
            </div>
            {selectedPage && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeletePage(selectedPage)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </span>
                </button>
                <button
                  onClick={() => setViewMode("edit")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Advanced Edit Mode
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID, business name, or template ID..."
              className="w-full px-4 py-3 pl-12 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <svg
                className="h-5 w-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Landing Pages List */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700">
              <div className="px-6 py-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-100">
                    Landing Pages
                  </h3>
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {filteredPages.length}
                  </span>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredPages.length > 0 ? (
                    filteredPages.map((page) => (
                      <div
                        key={page.id}
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-200 group ${
                          selectedPage?.id === page.id
                            ? "bg-blue-600 border border-blue-500 shadow-lg"
                            : "bg-slate-700 hover:bg-slate-600 border border-slate-600"
                        }`}
                        onClick={() => setSelectedPage(page)}
                      >
                        <div
                          className={`font-medium text-sm truncate mb-2 ${
                            selectedPage?.id === page.id
                              ? "text-white"
                              : "text-slate-100"
                          }`}
                        >
                          {page.businessName}
                        </div>
                        <div
                          className={`text-xs truncate mb-1 ${
                            selectedPage?.id === page.id
                              ? "text-blue-100"
                              : "text-slate-400"
                          }`}
                        >
                          ID: {page.id.substring(0, 8)}...
                        </div>
                        <div
                          className={`text-xs flex items-center gap-1 ${
                            selectedPage?.id === page.id
                              ? "text-blue-200"
                              : "text-slate-500"
                          }`}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          {page.templateId}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <svg
                        className="mx-auto h-12 w-12 text-slate-600 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-slate-400">No pages found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Landing Page Details */}
          <div className="lg:col-span-2">
            {selectedPage ? (
              <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700">
                <div className="px-6 py-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-100 mb-1">
                        {selectedPage.businessName}
                      </h3>
                      <div className="text-sm text-slate-400">
                        Template: {selectedPage.templateId}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 mb-1">
                        Last updated
                      </div>
                      <div className="text-sm text-slate-300">
                        {new Date(selectedPage.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 max-h-[500px] overflow-y-auto">
                    {/* Basic Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Basic Information
                      </h4>
                      {renderField("Business Name", selectedPage.businessName)}
                      {renderField("Template ID", selectedPage.templateId)}
                      {renderField("GitHub URL", selectedPage.githubUrl)}
                    </div>

                    {/* SEO Settings */}
                    {(selectedPage.seoSettings || selectedPage.SEOSettings) && (
                      <div>
                        <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                          SEO Settings
                        </h4>
                        {renderField(
                          "SEO Title",
                          (selectedPage.seoSettings || selectedPage.SEOSettings)?.title
                        )}
                        {renderField(
                          "SEO Description",
                          (selectedPage.seoSettings || selectedPage.SEOSettings)?.description
                        )}
                        {renderField(
                          "Keywords",
                          (selectedPage.seoSettings || selectedPage.SEOSettings)?.keywords,
                          "array"
                        )}
                        {renderField(
                          "Favicon URL",
                          (selectedPage.seoSettings || selectedPage.SEOSettings)?.favicon
                        )}
                      </div>
                    )}

                    {/* Theme */}
                    {(selectedPage.theme || selectedPage.Theme) && (
                      <div>
                        <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-pink-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                            />
                          </svg>
                          Theme
                        </h4>
                        {renderField(
                          "Primary Color",
                          (selectedPage.theme || selectedPage.Theme)?.primaryColor
                        )}
                        {renderField(
                          "Secondary Color",
                          (selectedPage.theme || selectedPage.Theme)?.secondaryColor
                        )}
                      </div>
                    )}

                    {/* Business Contact */}
                    {(selectedPage.businessContact || selectedPage.BusinessContact) && (
                      <div>
                        <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-emerald-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          Business Contact
                        </h4>
                        {(() => {
                          const contact = selectedPage.businessContact || selectedPage.BusinessContact;
                          return (
                            <>
                              {renderField("Phone", contact?.phone)}
                              {renderField("Emergency Phone", contact?.emergencyPhone)}
                              {renderField("Email", contact?.email)}
                              {renderField("Emergency Email", contact?.emergencyEmail)}
                              {renderField("Street", contact?.street)}
                              {renderField("City", contact?.city)}
                              {renderField("State", contact?.state)}
                              {renderField("Zip Code", contact?.zipCode)}
                              {renderField("Latitude", contact?.latitude, "number")}
                              {renderField("Longitude", contact?.longitude, "number")}
                            </>
                          );
                        })()}
                      </div>
                    )}

                    {/* Service Areas */}
                    {selectedPage.serviceAreas &&
                      selectedPage.serviceAreas.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-yellow-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            Service Areas ({selectedPage.serviceAreas.length})
                          </h4>
                          <div className="space-y-4">
                            {selectedPage.serviceAreas.map(
                              (serviceArea, index) => (
                                <div
                                  key={serviceArea.id}
                                  className="p-4 bg-slate-600 border border-slate-500 rounded-lg"
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <h5 className="font-medium text-slate-100">
                                      Service Area {index + 1}
                                    </h5>
                                    <span className="text-xs text-slate-400">
                                      ID: {serviceArea.id}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div>
                                      <span className="text-slate-300">
                                        City:
                                      </span>
                                      <div className="text-slate-100">
                                        {serviceArea.city}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="text-slate-300">
                                        Region:
                                      </span>
                                      <div className="text-slate-100">
                                        {serviceArea.region}
                                      </div>
                                    </div>
                                    <div className="md:col-span-2">
                                      <span className="text-slate-300">
                                        Description:
                                      </span>
                                      <div className="text-slate-100 mt-1">
                                        {serviceArea.description}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Social Links */}
                    {(selectedPage.socialLink || selectedPage.SocialLink) && (
                      <div>
                        <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-indigo-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                          Social Links
                        </h4>
                        {(() => {
                          const socialLink = selectedPage.socialLink || selectedPage.SocialLink;
                          return (
                            <>
                              {renderField("Group Name", socialLink?.name)}
                              {socialLink?.socialPlatforms && socialLink.socialPlatforms.length > 0 && (
                                <div className="mb-4">
                                  <label className="block text-sm font-medium text-slate-200 mb-3">
                                    Platforms ({socialLink.socialPlatforms.length})
                                  </label>
                                  <div className="space-y-3">
                                    {socialLink.socialPlatforms.map((platform: any) => (
                                      <div
                                        key={platform.id}
                                        className="p-3 bg-slate-600 border border-slate-500 rounded-lg"
                                      >
                                        <div className="flex items-center justify-between mb-2">
                                          <h5 className="font-medium text-slate-100">
                                            {platform.platform}
                                          </h5>
                                          <span className="text-xs text-slate-400">
                                            ID: {platform.id.substring(0, 8)}...
                                          </span>
                                        </div>
                                        <div className="text-sm">
                                          <span className="text-slate-300">URL:</span>
                                          <div className="text-slate-100 mt-1">
                                            <a 
                                              href={platform.url} 
                                              target="_blank" 
                                              rel="noopener noreferrer" 
                                              className="text-blue-400 hover:text-blue-300 underline"
                                            >
                                              {platform.url}
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {/* Legacy single platform/url support */}
                              {socialLink?.platform && socialLink?.url && (
                                <>
                                  {renderField("Platform", socialLink.platform)}
                                  {renderField("URL", socialLink.url)}
                                </>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    )}

                    {/* Image Pool */}
                    {(selectedPage.imagePool || selectedPage.ImagesPool) && (
                      <div>
                        <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Image Pool
                        </h4>
                        {(() => {
                          const imagePool = selectedPage.imagePool || selectedPage.ImagesPool;
                          const images = imagePool?.images || imagePool?.Image || [];
                          return (
                            <>
                              {renderField("Pool Name", imagePool?.name)}
                              {renderField("Description", imagePool?.description)}
                              {images && images.length > 0 && (
                                <div className="mb-4">
                                  <label className="block text-sm font-medium text-slate-200 mb-3">
                                    Images ({images.length})
                                  </label>
                                  <div className="space-y-3">
                                    {images.map((image: any, index: number) => (
                                      <div
                                        key={image.id}
                                        className="p-4 bg-slate-600 border border-slate-500 rounded-lg"
                                      >
                                        <div className="flex items-center justify-between mb-2">
                                          <h5 className="font-medium text-slate-100">
                                            {image.title || `Image ${index + 1}`}
                                          </h5>
                                          <span className="text-xs text-slate-400">
                                            ID: {image.imageId || image.id?.substring(0, 8) + '...'}
                                          </span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                          <div>
                                            <span className="text-slate-300">Title:</span>
                                            <div className="text-slate-100 truncate">
                                              {image.title || "Not set"}
                                            </div>
                                          </div>
                                          <div>
                                            <span className="text-slate-300">Alt Text:</span>
                                            <div className="text-slate-100 truncate">
                                              {image.altText || "Not set"}
                                            </div>
                                          </div>
                                          <div>
                                            <span className="text-slate-300">Category:</span>
                                            <div className="text-slate-100">
                                              {image.category || "Not set"}
                                            </div>
                                          </div>
                                          <div>
                                            <span className="text-slate-300">Description:</span>
                                            <div className="text-slate-100">
                                              {image.description || "Not set"}
                                            </div>
                                          </div>
                                        </div>
                                        {image.imageUrl && (
                                          <div className="mt-3">
                                            <span className="text-slate-300 text-sm">Preview:</span>
                                            <div className="mt-1">
                                              <img
                                                src={image.imageUrl}
                                                alt={image.altText || image.title}
                                                className="max-w-full h-20 object-cover rounded border border-slate-500"
                                                onError={(e) => {
                                                  (e.target as HTMLImageElement).style.display = "none";
                                                }}
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    )}

                    {/* Hero Section */}
                    {(selectedPage.heroSection || selectedPage.HeroSection) && (
                      <div>
                        <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-orange-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                          Hero Section
                        </h4>
                        {(() => {
                          const section = selectedPage.heroSection || selectedPage.HeroSection;
                          return (
                            <>
                              {renderField("Title", section?.title)}
                              {renderField("Subtitle", section?.subtitle)}
                              {renderField("Description", section?.description)}
                            </>
                          );
                        })()}
                      </div>
                    )}

                    {/* About Section */}
                    {selectedPage.aboutSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          About Section
                        </h4>
                        {renderField("Title", selectedPage.aboutSection.title)}
                        {renderField(
                          "Description",
                          selectedPage.aboutSection.description
                        )}
                        {renderField(
                          "Features",
                          selectedPage.aboutSection.features,
                          "array"
                        )}
                      </div>
                    )}

                    {/* Services Section */}
                    {selectedPage.servicesSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Services Section
                        </h4>
                        {renderField(
                          "Title",
                          selectedPage.servicesSection.title
                        )}
                        {renderField(
                          "Description",
                          selectedPage.servicesSection.description
                        )}
                      </div>
                    )}

                    {/* Gallery Section */}
                    {selectedPage.gallerySection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Gallery Section
                        </h4>
                        {renderField(
                          "Title",
                          selectedPage.gallerySection.title
                        )}
                        {renderField(
                          "Description",
                          selectedPage.gallerySection.description
                        )}
                      </div>
                    )}

                    {/* Testimonials Section */}
                    {selectedPage.testimonialsSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Testimonials Section
                        </h4>
                        {renderField(
                          "Title",
                          selectedPage.testimonialsSection.title
                        )}
                        {renderField(
                          "Description",
                          selectedPage.testimonialsSection.description
                        )}
                      </div>
                    )}

                    {/* FAQ Section */}
                    {selectedPage.faqSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          FAQ Section
                        </h4>
                        {renderField("Title", selectedPage.faqSection.title)}
                        {renderField(
                          "Description",
                          selectedPage.faqSection.description
                        )}
                      </div>
                    )}

                    {/* Service Area Section */}
                    {selectedPage.serviceAreaSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Service Area Section
                        </h4>
                        {renderField(
                          "Title",
                          selectedPage.serviceAreaSection.title
                        )}
                        {renderField(
                          "Description",
                          selectedPage.serviceAreaSection.description
                        )}
                      </div>
                    )}

                    {/* Business Details Section */}
                    {selectedPage.businessDetailsSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Business Details Section
                        </h4>
                        {renderField(
                          "Title",
                          selectedPage.businessDetailsSection.title
                        )}
                        {selectedPage.businessDetailsSection.sections && (
                          <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Sections
                            </label>
                            <div className="space-y-2">
                              {selectedPage.businessDetailsSection.sections.map(
                                (section: any, index: number) => (
                                  <div
                                    key={index}
                                    className="p-2 bg-gray-100 rounded"
                                  >
                                    <div className="font-medium text-sm">
                                      {section.title}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {section.description}
                                    </div>
                                    {section.ctaTitle && (
                                      <div className="text-sm text-blue-600">
                                        {section.ctaTitle}
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Company Overview Section */}
                    {selectedPage.companyOverviewSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Company Overview Section
                        </h4>
                        {renderField(
                          "Title",
                          selectedPage.companyOverviewSection.title
                        )}
                        {selectedPage.companyOverviewSection.sections && (
                          <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Sections
                            </label>
                            <div className="space-y-2">
                              {selectedPage.companyOverviewSection.sections.map(
                                (section: any, index: number) => (
                                  <div
                                    key={index}
                                    className="p-2 bg-gray-100 rounded"
                                  >
                                    <div className="font-medium text-sm">
                                      {section.title}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {section.description}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Service Highlights Section */}
                    {selectedPage.serviceHighlightsSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Service Highlights Section
                        </h4>
                        {renderField(
                          "Title",
                          selectedPage.serviceHighlightsSection.title
                        )}
                      </div>
                    )}

                    {/* Pre-Footer Section */}
                    {selectedPage.preFooterSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Pre-Footer Section
                        </h4>
                        {renderField(
                          "Description",
                          selectedPage.preFooterSection.description
                        )}
                      </div>
                    )}

                    {/* Footer Section */}
                    {selectedPage.footerSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Footer Section
                        </h4>
                        {renderField(
                          "Copyright",
                          selectedPage.footerSection.copyright
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700">
                <div className="px-6 py-12 text-center">
                  <div className="text-slate-400">
                    <svg
                      className="mx-auto h-16 w-16 mb-6 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-xl text-slate-200 mb-2">
                      Select a landing page to view details
                    </p>
                    <p className="text-slate-400">
                      Choose a landing page from the list to view and edit its
                      configuration
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && pageToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 max-w-md w-full">
            <div className="px-6 py-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-600/20 rounded-full">
                  <svg
                    className="w-6 h-6 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-100">
                  Delete Landing Page
                </h3>
              </div>
              <p className="text-slate-300 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-100">
                  {pageToDelete.businessName}
                </span>
                ? This action will permanently remove the landing page and all its associated data including:
              </p>
              <ul className="text-sm text-slate-400 mb-6 space-y-1 ml-4">
                <li>• Business contact information</li>
                <li>• SEO settings and theme</li>
                <li>• All sections (hero, about, services, etc.)</li>
                <li>• Image pools and associated images</li>
                <li>• Service areas and social links</li>
              </ul>
              <p className="text-sm text-red-400 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelDelete}
                  disabled={deleteLoading}
                  className="px-4 py-2 bg-slate-600 text-slate-100 rounded-lg hover:bg-slate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {deleteLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete Permanently
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
