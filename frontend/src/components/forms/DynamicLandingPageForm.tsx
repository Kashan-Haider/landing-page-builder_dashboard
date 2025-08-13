import React, { useState, useCallback } from 'react';
import { Save, Undo, Redo, Eye, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button, Card } from '../ui/inputs';
import { SectionForm, BusinessContactForm } from './SectionForm';
import { setNestedValue } from '../../types/field-definitions';
import { useAutoSave } from '../../hooks/useAutoSave';
import { useFieldHistory } from '../../hooks/useFieldHistory';

interface LandingPage {
  id: string;
  templateId: string;
  businessName: string;
  githubUrl?: string;
  businessContact?: any;
  seoSettings?: any;
  theme?: any;
  // One-to-one section relationships
  serviceArea?: any;
  socialLink?: any;
  image?: any;
  heroSection?: any;
  aboutSection?: any;
  servicesSection?: any;
  gallerySection?: any;
  testimonialsSection?: any;
  faqSection?: any;
  serviceAreaSection?: any;
  businessDetailsSection?: any;
  companyOverviewSection?: any;
  serviceHighlightsSection?: any;
  preFooterSection?: any;
  footerSection?: any;
  createdAt: string;
  updatedAt: string;
}

interface DynamicLandingPageFormProps {
  landingPage: LandingPage;
  onSave: (data: Partial<LandingPage>) => Promise<void>;
  onPreview?: () => void;
  onBack?: () => void;
}

export const DynamicLandingPageForm: React.FC<DynamicLandingPageFormProps> = ({
  landingPage,
  onSave,
  onPreview,
  onBack
}) => {
  const [activeSection, setActiveSection] = useState('basic');
  const [localData, setLocalData] = useState<LandingPage>(landingPage);

  // History and auto-save hooks
  const {
    pushHistory,
    undo,
    redo,
    canUndo,
    canRedo
  } = useFieldHistory(landingPage);

  const { isSaving, lastSaved, error, saveNow } = useAutoSave(
    localData,
    onSave,
    { delay: 3000, enabled: true }
  );

  // Section definitions (updated for one-to-one relationships)
  const sections = [
    { id: 'basic', label: 'Basic Info', fields: ['businessName', 'templateId', 'githubUrl'] },
    { id: 'seo', label: 'SEO Settings', fields: ['seoSettings.title', 'seoSettings.description', 'seoSettings.keywords', 'seoSettings.favicon'] },
    { id: 'theme', label: 'Theme', fields: ['theme.primaryColor', 'theme.secondaryColor'] },
    { id: 'contact', label: 'Business Contact', fields: ['businessContact'] },
    { id: 'serviceArea', label: 'Service Area', fields: ['serviceArea.city', 'serviceArea.region', 'serviceArea.description'] },
    { id: 'socialLink', label: 'Social Link', fields: ['socialLink.platform', 'socialLink.url'] },
    { id: 'image', label: 'Image', fields: ['image.imageId', 'image.title', 'image.altText', 'image.image'] },
    { id: 'hero', label: 'Hero Section', fields: ['heroSection.title', 'heroSection.subtitle', 'heroSection.description'] },
    { id: 'about', label: 'About Section', fields: ['aboutSection.title', 'aboutSection.description', 'aboutSection.features'] },
    { id: 'services', label: 'Services Section', fields: ['servicesSection.title', 'servicesSection.description'] },
    { id: 'gallery', label: 'Gallery Section', fields: ['gallerySection.title', 'gallerySection.description'] },
    { id: 'testimonials', label: 'Testimonials Section', fields: ['testimonialsSection.title', 'testimonialsSection.description'] },
    { id: 'faq', label: 'FAQ Section', fields: ['faqSection.title', 'faqSection.description'] },
    { id: 'serviceAreaSection', label: 'Service Area Section', fields: ['serviceAreaSection.title', 'serviceAreaSection.description'] },
    { id: 'businessDetails', label: 'Business Details', fields: ['businessDetailsSection.title'] },
    { id: 'companyOverview', label: 'Company Overview', fields: ['companyOverviewSection.title'] },
    { id: 'serviceHighlights', label: 'Service Highlights', fields: ['serviceHighlightsSection.title'] },
    { id: 'preFooter', label: 'Pre-Footer', fields: ['preFooterSection.description'] },
    { id: 'footer', label: 'Footer', fields: ['footerSection.copyright'] }
  ];

  // Handle field changes
  const handleFieldChange = useCallback((path: string, value: any) => {
    setLocalData(prevData => {
      const newData = setNestedValue(prevData, path, value);
      pushHistory(newData, `Updated ${path}`);
      return newData;
    });
  }, [pushHistory]);

  // Handle undo/redo
  const handleUndo = useCallback(() => {
    const previousData = undo();
    if (previousData) {
      setLocalData(previousData);
    }
  }, [undo]);

  const handleRedo = useCallback(() => {
    const nextData = redo();
    if (nextData) {
      setLocalData(nextData);
    }
  }, [redo]);

  // Render specialized section forms
  const renderSectionContent = (section: typeof sections[0]) => {
    switch (section.id) {
      case 'contact':
        return (
          <BusinessContactForm
            data={localData.businessContact || {}}
            onChange={handleFieldChange}
          />
        );
      
      default:
        return (
          <SectionForm
            sectionId={section.id}
            fields={section.fields}
            data={localData}
            onChange={handleFieldChange}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar Navigation */}
      <div className="w-72 bg-slate-800 border-r border-slate-700 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-xl text-slate-100">
              Edit Landing Page
            </h2>
            {onBack && (
              <Button
                onClick={onBack}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Save Status */}
          <div className="mb-6 p-4 bg-slate-700 border border-slate-600 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              {isSaving ? (
                <div className="flex items-center text-blue-400">
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </div>
              ) : lastSaved ? (
                <div className="flex items-center text-green-400">
                  <Save className="w-4 h-4 mr-2" />
                  Saved
                </div>
              ) : (
                <div className="text-slate-400">Not saved</div>
              )}
            </div>
            {lastSaved && (
              <div className="text-xs text-slate-400 mt-2">
                {lastSaved.toLocaleTimeString()}
              </div>
            )}
            {error && (
              <div className="flex items-center text-red-400 text-xs mt-2">
                <AlertCircle className="w-3 h-3 mr-1" />
                {error}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mb-6 space-y-2">
            <div className="flex gap-2">
              <Button
                onClick={handleUndo}
                disabled={!canUndo}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Undo className="w-4 h-4 mr-1" />
                Undo
              </Button>
              <Button
                onClick={handleRedo}
                disabled={!canRedo}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Redo className="w-4 h-4 mr-1" />
                Redo
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={saveNow}
                disabled={isSaving}
                size="sm"
                className="flex-1"
              >
                <Save className="w-4 h-4 mr-1" />
                Save Now
              </Button>
              {onPreview && (
                <Button
                  onClick={onPreview}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
              )}
            </div>
          </div>

          {/* Section Navigation */}
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-slate-900">
        <div className="p-8">
          {sections.map((section) => (
            <div
              key={section.id}
              className={activeSection === section.id ? 'block' : 'hidden'}
            >
              <Card className="p-8 bg-slate-800 border-slate-700">
                {renderSectionContent(section)}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
