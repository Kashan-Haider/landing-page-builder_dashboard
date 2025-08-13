import React, { useState, useEffect } from 'react';
import { DynamicLandingPageForm } from '../components/forms/DynamicLandingPageForm';

// Type definitions based on your Prisma schema (updated for one-to-one relationships)
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
  theme?: Theme;
  // One-to-one section relationships
  serviceArea?: ServiceArea;
  socialLink?: SocialLink;
  image?: ImageData;
  heroSection?: HeroSection;
  aboutSection?: AboutSection;
  servicesSection?: ServicesSection;
  gallerySection?: GallerySection;
  testimonialsSection?: TestimonialsSection;
  faqSection?: FAQSection;
  serviceAreaSection?: ServiceAreaSection;
  businessDetailsSection?: BusinessDetailsSection;
  companyOverviewSection?: CompanyOverviewSection;
  serviceHighlightsSection?: ServiceHighlightsSection;
  preFooterSection?: PreFooterSection;
  footerSection?: FooterSection;
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

interface ServiceArea {
  id: string;
  city: string;
  region: string;
  description: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface ImageData {
  id: string;
  imageId: string;
  title: string;
  altText: string;
  image: string;
}

interface GallerySection {
  id: string;
  title: string;
  description?: string;
}

interface TestimonialsSection {
  id: string;
  title: string;
  description?: string;
}

interface FAQSection {
  id: string;
  title: string;
  description?: string;
}

interface ServiceAreaSection {
  id: string;
  title: string;
  description?: string;
}

interface BusinessDetailsSection {
  id: string;
  title: string;
  sections?: any[];
  contactForm?: any;
  map?: any;
}

interface CompanyOverviewSection {
  id: string;
  title: string;
  sections?: any[];
}

interface ServiceHighlightsSection {
  id: string;
  title: string;
}

interface PreFooterSection {
  id: string;
  description: string;
}

interface FooterSection {
  id: string;
  copyright: string;
}

const Dashboard: React.FC = () => {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [filteredPages, setFilteredPages] = useState<LandingPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  // Render read-only field
  const renderField = (
    label: string,
    value: any,
    type: 'text' | 'email' | 'number' | 'textarea' | 'array' = 'text'
  ) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-200 mb-2">
          {label}
        </label>
        <div className="p-3 bg-slate-700 border border-slate-600 rounded-lg min-h-[40px] flex items-center">
          {type === 'array' ? (
            Array.isArray(value) && value.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {value.map((item, index) => (
                  <span key={index} className="bg-blue-600/20 border border-blue-500/30 text-blue-300 px-2 py-1 rounded-md text-sm">
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-slate-400">No items</span>
            )
          ) : (
            <span className={value ? 'text-slate-100' : 'text-slate-400'}>
              {value || 'Not set'}
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
  if (viewMode === 'edit' && selectedPage) {
    return (
      <DynamicLandingPageForm
        landingPage={selectedPage}
        onSave={handleSaveFromDynamicForm}
        onBack={() => setViewMode('list')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-100">Landing Page Dashboard</h1>
              <p className="text-slate-400 text-sm mt-1">Manage and edit your landing pages</p>
            </div>
            {selectedPage && (
              <button
                onClick={() => setViewMode('edit')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Advanced Edit Mode
                </span>
              </button>
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
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                  {filteredPages.length > 0 ? filteredPages.map((page) => (
                    <div
                      key={page.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 group ${
                        selectedPage?.id === page.id
                          ? 'bg-blue-600 border border-blue-500 shadow-lg'
                          : 'bg-slate-700 hover:bg-slate-600 border border-slate-600'
                      }`}
                      onClick={() => setSelectedPage(page)}
                    >
                      <div className={`font-medium text-sm truncate mb-2 ${
                        selectedPage?.id === page.id ? 'text-white' : 'text-slate-100'
                      }`}>
                        {page.businessName}
                      </div>
                      <div className={`text-xs truncate mb-1 ${
                        selectedPage?.id === page.id ? 'text-blue-100' : 'text-slate-400'
                      }`}>
                        ID: {page.id.substring(0, 8)}...
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${
                        selectedPage?.id === page.id ? 'text-blue-200' : 'text-slate-500'
                      }`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {page.templateId}
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <svg className="mx-auto h-12 w-12 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
                      <div className="text-xs text-slate-400 mb-1">Last updated</div>
                      <div className="text-sm text-slate-300">
                        {new Date(selectedPage.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 max-h-[500px] overflow-y-auto">
                    {/* Basic Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Basic Information
                      </h4>
                      {renderField('Business Name', selectedPage.businessName)}
                      {renderField('Template ID', selectedPage.templateId)}
                      {renderField('GitHub URL', selectedPage.githubUrl)}
                    </div>

                    {/* SEO Settings */}
                    {selectedPage.seoSettings && (
                      <div>
                        <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          SEO Settings
                        </h4>
                        {renderField('SEO Title', selectedPage.seoSettings.title)}
                        {renderField('SEO Description', selectedPage.seoSettings.description)}
                        {renderField('Keywords', selectedPage.seoSettings.keywords, 'array')}
                        {renderField('Favicon URL', selectedPage.seoSettings.favicon)}
                      </div>
                    )}

                    {/* Theme */}
                    {selectedPage.theme && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Theme</h4>
                        {renderField('Primary Color', selectedPage.theme.primaryColor)}
                        {renderField('Secondary Color', selectedPage.theme.secondaryColor)}
                      </div>
                    )}

                    {/* Business Contact */}
                    {selectedPage.businessContact && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Business Contact</h4>
                        {renderField('Phone', selectedPage.businessContact.phone)}
                        {renderField('Emergency Phone', selectedPage.businessContact.emergencyPhone)}
                        {renderField('Email', selectedPage.businessContact.email)}
                        {renderField('Emergency Email', selectedPage.businessContact.emergencyEmail)}
                        {renderField('Street', selectedPage.businessContact.street)}
                        {renderField('City', selectedPage.businessContact.city)}
                        {renderField('State', selectedPage.businessContact.state)}
                        {renderField('Zip Code', selectedPage.businessContact.zipCode)}
                        {renderField('Latitude', selectedPage.businessContact.latitude, 'number')}
                        {renderField('Longitude', selectedPage.businessContact.longitude, 'number')}
                      </div>
                    )}

                    {/* Service Area */}
                    {selectedPage.serviceArea && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Service Area</h4>
                        {renderField('City', selectedPage.serviceArea.city)}
                        {renderField('Region', selectedPage.serviceArea.region)}
                        {renderField('Description', selectedPage.serviceArea.description)}
                      </div>
                    )}

                    {/* Social Link */}
                    {selectedPage.socialLink && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Social Link</h4>
                        {renderField('Platform', selectedPage.socialLink.platform)}
                        {renderField('URL', selectedPage.socialLink.url)}
                      </div>
                    )}

                    {/* Image */}
                    {selectedPage.image && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Image</h4>
                        {renderField('Image ID', selectedPage.image.imageId)}
                        {renderField('Title', selectedPage.image.title)}
                        {renderField('Alt Text', selectedPage.image.altText)}
                        {renderField('Image URL', selectedPage.image.image)}
                      </div>
                    )}

                    {/* Hero Section */}
                    {selectedPage.heroSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Hero Section</h4>
                        {renderField('Title', selectedPage.heroSection.title)}
                        {renderField('Subtitle', selectedPage.heroSection.subtitle)}
                        {renderField('Description', selectedPage.heroSection.description)}
                      </div>
                    )}

                    {/* About Section */}
                    {selectedPage.aboutSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">About Section</h4>
                        {renderField('Title', selectedPage.aboutSection.title)}
                        {renderField('Description', selectedPage.aboutSection.description)}
                        {renderField('Features', selectedPage.aboutSection.features, 'array')}
                      </div>
                    )}

                    {/* Services Section */}
                    {selectedPage.servicesSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Services Section</h4>
                        {renderField('Title', selectedPage.servicesSection.title)}
                        {renderField('Description', selectedPage.servicesSection.description)}
                      </div>
                    )}

                    {/* Gallery Section */}
                    {selectedPage.gallerySection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Gallery Section</h4>
                        {renderField('Title', selectedPage.gallerySection.title)}
                        {renderField('Description', selectedPage.gallerySection.description)}
                      </div>
                    )}

                    {/* Testimonials Section */}
                    {selectedPage.testimonialsSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Testimonials Section</h4>
                        {renderField('Title', selectedPage.testimonialsSection.title)}
                        {renderField('Description', selectedPage.testimonialsSection.description)}
                      </div>
                    )}

                    {/* FAQ Section */}
                    {selectedPage.faqSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">FAQ Section</h4>
                        {renderField('Title', selectedPage.faqSection.title)}
                        {renderField('Description', selectedPage.faqSection.description)}
                      </div>
                    )}

                    {/* Service Area Section */}
                    {selectedPage.serviceAreaSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Service Area Section</h4>
                        {renderField('Title', selectedPage.serviceAreaSection.title)}
                        {renderField('Description', selectedPage.serviceAreaSection.description)}
                      </div>
                    )}

                    {/* Business Details Section */}
                    {selectedPage.businessDetailsSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Business Details Section</h4>
                        {renderField('Title', selectedPage.businessDetailsSection.title)}
                        {selectedPage.businessDetailsSection.sections && (
                          <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sections</label>
                            <div className="space-y-2">
                              {selectedPage.businessDetailsSection.sections.map((section: any, index: number) => (
                                <div key={index} className="p-2 bg-gray-100 rounded">
                                  <div className="font-medium text-sm">{section.title}</div>
                                  <div className="text-sm text-gray-600">{section.description}</div>
                                  {section.ctaTitle && (
                                    <div className="text-sm text-blue-600">{section.ctaTitle}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Company Overview Section */}
                    {selectedPage.companyOverviewSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Company Overview Section</h4>
                        {renderField('Title', selectedPage.companyOverviewSection.title)}
                        {selectedPage.companyOverviewSection.sections && (
                          <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sections</label>
                            <div className="space-y-2">
                              {selectedPage.companyOverviewSection.sections.map((section: any, index: number) => (
                                <div key={index} className="p-2 bg-gray-100 rounded">
                                  <div className="font-medium text-sm">{section.title}</div>
                                  <div className="text-sm text-gray-600">{section.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Service Highlights Section */}
                    {selectedPage.serviceHighlightsSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Service Highlights Section</h4>
                        {renderField('Title', selectedPage.serviceHighlightsSection.title)}
                      </div>
                    )}

                    {/* Pre-Footer Section */}
                    {selectedPage.preFooterSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Pre-Footer Section</h4>
                        {renderField('Description', selectedPage.preFooterSection.description)}
                      </div>
                    )}

                    {/* Footer Section */}
                    {selectedPage.footerSection && (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Footer Section</h4>
                        {renderField('Copyright', selectedPage.footerSection.copyright)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700">
                <div className="px-6 py-12 text-center">
                  <div className="text-slate-400">
                    <svg className="mx-auto h-16 w-16 mb-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-xl text-slate-200 mb-2">Select a landing page to view details</p>
                    <p className="text-slate-400">Choose a landing page from the list to view and edit its configuration</p>
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