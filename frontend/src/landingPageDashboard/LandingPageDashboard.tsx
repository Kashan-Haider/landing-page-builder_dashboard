import React, { useState, useEffect } from 'react';
import { DynamicLandingPageForm } from '../components/forms/DynamicLandingPageForm';

// Type definitions based on your Prisma schema
interface LandingPage {
  id: string;
  templateId: string;
  businessName: string;
  githubUrl?: string;
  createdAt: string;
  updatedAt: string;
  seoSettingsId?: string;
  businessContactId?: string;
  businessContact?: BusinessContact;
  seoSettings?: SEOSettings;
  heroSections: HeroSection[];
  aboutSections: AboutSection[];
  servicesSections: ServicesSection[];
  theme?: Theme;
}

interface BusinessContact {
  id: string;
  businessName: string;
  phone: string;
  emergencyPhone?: string;
  email: string;
  emergencyEmail?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
}

interface SEOSettings {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  favicon?: string;
}

interface HeroSection {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
}

interface AboutSection {
  id: string;
  title: string;
  description: string;
  features: string[];
}

interface ServicesSection {
  id: string;
  title: string;
  description?: string;
}

interface Theme {
  id: string;
  primaryColor?: string;
  secondaryColor?: string;
}

const Dashboard: React.FC = () => {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [filteredPages, setFilteredPages] = useState<LandingPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingFields, setEditingFields] = useState<{[key: string]: boolean}>({});
  const [viewMode, setViewMode] = useState<'list' | 'edit'>('list');

  // Fetch landing pages from API
  useEffect(() => {
    const fetchLandingPages = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/landing-pages');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLandingPages(data);
        setFilteredPages(data);
      } catch (err) {
        setError('Failed to fetch landing pages');
        console.error('Error fetching landing pages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPages();
  }, []);

  // Filter pages based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredPages(landingPages);
    } else {
      const filtered = landingPages.filter(page =>
        page.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.templateId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPages(filtered);
    }
  }, [searchTerm, landingPages]);

  // Handle field editing toggle
  const toggleEdit = (fieldKey: string) => {
    setEditingFields(prev => ({
      ...prev,
      [fieldKey]: !prev[fieldKey]
    }));
  };

  // Handle saving data from dynamic form
  const handleSaveFromDynamicForm = async (data: Partial<LandingPage>) => {
    if (!selectedPage) return;

    try {
      const response = await fetch(`http://localhost:3000/api/landing-pages/${selectedPage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Update local state
      const updatedPage = { ...selectedPage, ...data };
      setSelectedPage(updatedPage);
      const updatedPages = landingPages.map(page => 
        page.id === selectedPage.id ? updatedPage : page
      );
      setLandingPages(updatedPages);
    } catch (err) {
      console.error('Error saving:', err);
      throw err;
    }
  };

  // Handle field value update
  const updateField = async (fieldPath: string, value: any) => {
    if (!selectedPage) return;

    try {
      const updatedPage = { ...selectedPage };
      
      // Handle nested field updates
      const keys = fieldPath.split('.');
      let current: any = updatedPage;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;

      // Update in API
      const response = await fetch(`/api/landing-pages/${selectedPage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPage),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Update local state
      setSelectedPage(updatedPage);
      const updatedPages = landingPages.map(page => 
        page.id === selectedPage.id ? updatedPage : page
      );
      setLandingPages(updatedPages);
      
      // Turn off editing mode
      setEditingFields(prev => ({
        ...prev,
        [fieldPath]: false
      }));
    } catch (err) {
      console.error('Error updating field:', err);
      alert('Failed to update field');
    }
  };

  // Render editable field
  const renderEditableField = (
    label: string,
    fieldPath: string,
    value: any,
    type: 'text' | 'email' | 'number' | 'textarea' | 'array' = 'text'
  ) => {
    const isEditing = editingFields[fieldPath];

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {isEditing ? (
            type === 'textarea' ? (
              <textarea
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={value || ''}
                onChange={(e) => updateField(fieldPath, e.target.value)}
                onBlur={() => toggleEdit(fieldPath)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    toggleEdit(fieldPath);
                  }
                }}
                rows={3}
                autoFocus
              />
            ) : type === 'array' ? (
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={Array.isArray(value) ? value.join(', ') : ''}
                onChange={(e) => updateField(fieldPath, e.target.value.split(', ').filter(v => v.trim()))}
                onBlur={() => toggleEdit(fieldPath)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    toggleEdit(fieldPath);
                  }
                }}
                placeholder="Comma-separated values"
                autoFocus
              />
            ) : (
              <input
                type={type}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={value || ''}
                onChange={(e) => updateField(fieldPath, type === 'number' ? Number(e.target.value) : e.target.value)}
                onBlur={() => toggleEdit(fieldPath)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    toggleEdit(fieldPath);
                  }
                }}
                autoFocus
              />
            )
          ) : (
            <div
              className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 min-h-[40px] flex items-center"
              onClick={() => toggleEdit(fieldPath)}
            >
              {type === 'array' ? (
                Array.isArray(value) && value.length > 0 ? value.join(', ') : 'Click to edit'
              ) : (
                value || 'Click to edit'
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading landing pages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If we're in edit mode and have a selected page, show the dynamic form
  if (viewMode === 'edit' && selectedPage) {
    return (
      <DynamicLandingPageForm
        landingPage={selectedPage}
        onSave={handleSaveFromDynamicForm}
        onPreview={() => {
          // You can implement preview functionality here
          console.log('Preview functionality to be implemented');
        }}
        onBack={() => setViewMode('list')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Landing Page Dashboard</h1>
            {selectedPage && (
              <button
                onClick={() => setViewMode('edit')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Advanced Edit Mode
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID, business name, or template ID..."
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Landing Pages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Landing Pages ({filteredPages.length})
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredPages.map((page) => (
                    <div
                      key={page.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedPage?.id === page.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                      onClick={() => setSelectedPage(page)}
                    >
                      <div className="font-medium text-sm text-gray-900 truncate">
                        {page.businessName}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        ID: {page.id}
                      </div>
                      <div className="text-xs text-gray-500">
                        Template: {page.templateId}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Landing Page Details */}
          <div className="lg:col-span-2">
            {selectedPage ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      Edit Landing Page
                    </h3>
                    <div className="text-sm text-gray-500">
                      Last updated: {new Date(selectedPage.updatedAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-4">Basic Information</h4>
                      {renderEditableField('Business Name', 'businessName', selectedPage.businessName)}
                      {renderEditableField('Template ID', 'templateId', selectedPage.templateId)}
                      {renderEditableField('GitHub URL', 'githubUrl', selectedPage.githubUrl)}
                    </div>

                    {/* SEO Settings */}
                    {selectedPage.seoSettings && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">SEO Settings</h4>
                        {renderEditableField('SEO Title', 'seoSettings.title', selectedPage.seoSettings.title)}
                        {renderEditableField('SEO Description', 'seoSettings.description', selectedPage.seoSettings.description, 'textarea')}
                        {renderEditableField('Keywords', 'seoSettings.keywords', selectedPage.seoSettings.keywords, 'array')}
                        {renderEditableField('Favicon URL', 'seoSettings.favicon', selectedPage.seoSettings.favicon)}
                      </div>
                    )}

                    {/* Business Contact */}
                    {selectedPage.businessContact && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Business Contact</h4>
                        {renderEditableField('Phone', 'businessContact.phone', selectedPage.businessContact.phone)}
                        {renderEditableField('Emergency Phone', 'businessContact.emergencyPhone', selectedPage.businessContact.emergencyPhone)}
                        {renderEditableField('Email', 'businessContact.email', selectedPage.businessContact.email, 'email')}
                        {renderEditableField('Emergency Email', 'businessContact.emergencyEmail', selectedPage.businessContact.emergencyEmail, 'email')}
                        {renderEditableField('Street', 'businessContact.street', selectedPage.businessContact.street)}
                        {renderEditableField('City', 'businessContact.city', selectedPage.businessContact.city)}
                        {renderEditableField('State', 'businessContact.state', selectedPage.businessContact.state)}
                        {renderEditableField('Zip Code', 'businessContact.zipCode', selectedPage.businessContact.zipCode)}
                        {renderEditableField('Latitude', 'businessContact.latitude', selectedPage.businessContact.latitude, 'number')}
                        {renderEditableField('Longitude', 'businessContact.longitude', selectedPage.businessContact.longitude, 'number')}
                      </div>
                    )}

                    {/* Hero Sections */}
                    {selectedPage.heroSections && selectedPage.heroSections.length > 0 && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Hero Sections</h4>
                        {selectedPage.heroSections.map((hero, index) => (
                          <div key={hero.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Hero Section {index + 1}</h5>
                            {renderEditableField('Title', `heroSections.${index}.title`, hero.title)}
                            {renderEditableField('Subtitle', `heroSections.${index}.subtitle`, hero.subtitle)}
                            {renderEditableField('Description', `heroSections.${index}.description`, hero.description, 'textarea')}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* About Sections */}
                    {selectedPage.aboutSections && selectedPage.aboutSections.length > 0 && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">About Sections</h4>
                        {selectedPage.aboutSections.map((about, index) => (
                          <div key={about.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">About Section {index + 1}</h5>
                            {renderEditableField('Title', `aboutSections.${index}.title`, about.title)}
                            {renderEditableField('Description', `aboutSections.${index}.description`, about.description, 'textarea')}
                            {renderEditableField('Features', `aboutSections.${index}.features`, about.features, 'array')}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Services Sections */}
                    {selectedPage.servicesSections && selectedPage.servicesSections.length > 0 && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Services Sections</h4>
                        {selectedPage.servicesSections.map((service, index) => (
                          <div key={service.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Services Section {index + 1}</h5>
                            {renderEditableField('Title', `servicesSections.${index}.title`, service.title)}
                            {renderEditableField('Description', `servicesSections.${index}.description`, service.description, 'textarea')}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Theme */}
                    {selectedPage.theme && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Theme</h4>
                        {renderEditableField('Primary Color', 'theme.primaryColor', selectedPage.theme.primaryColor)}
                        {renderEditableField('Secondary Color', 'theme.secondaryColor', selectedPage.theme.secondaryColor)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow">
                <div className="px-4 py-5 sm:p-6 text-center">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg">Select a landing page to edit</p>
                    <p className="text-sm mt-2">Choose a landing page from the list on the left to view and edit its details.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;