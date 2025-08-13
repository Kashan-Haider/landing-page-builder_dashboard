import React, { useState, useCallback } from 'react';
import { Save, Undo, Redo, Eye, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button, Card } from '../ui/inputs';
import { SectionForm, BusinessContactForm, HeroSectionsForm, ServicesSectionsForm } from './SectionForm';
import { setNestedValue } from '../../types/field-definitions';
import { useAutoSave } from '../../hooks/useAutoSave';
import { useFieldHistory } from '../../hooks/useFieldHistory';

interface LandingPage {
  id: string;
  templateId: string;
  businessName: string;
  githubUrl?: string;
  heroSections?: any[];
  aboutSections?: any[];
  servicesSections?: any[];
  gallerySections?: any[];
  testimonialsSections?: any[];
  faqSections?: any[];
  businessContact?: any;
  seoSettings?: any;
  theme?: any;
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

  // Section definitions
  const sections = [
    { id: 'basic', label: 'Basic Info', fields: ['businessName', 'templateId', 'githubUrl'] },
    { id: 'hero', label: 'Hero Section', fields: ['heroSections'] },
    { id: 'about', label: 'About Section', fields: ['aboutSections'] },
    { id: 'services', label: 'Services', fields: ['servicesSections'] },
    { id: 'gallery', label: 'Gallery', fields: ['gallerySections'] },
    { id: 'testimonials', label: 'Testimonials', fields: ['testimonialsSections'] },
    { id: 'faq', label: 'FAQ', fields: ['faqSections'] },
    { id: 'contact', label: 'Contact', fields: ['businessContact'] },
    { id: 'theme', label: 'Theme', fields: ['theme.primaryColor', 'theme.secondaryColor'] },
    { id: 'seo', label: 'SEO Settings', fields: ['seoSettings.title', 'seoSettings.description', 'seoSettings.keywords', 'seoSettings.favicon'] }
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
      case 'hero':
        return (
          <HeroSectionsForm
            data={localData.heroSections || []}
            onChange={handleFieldChange}
          />
        );
      
      case 'services':
        return (
          <ServicesSectionsForm
            data={localData.servicesSections || []}
            onChange={handleFieldChange}
          />
        );
      
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-900">
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
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              {isSaving ? (
                <div className="flex items-center text-blue-600">
                  <Clock className="w-4 h-4 mr-1 animate-spin" />
                  Saving...
                </div>
              ) : lastSaved ? (
                <div className="flex items-center text-green-600">
                  <Save className="w-4 h-4 mr-1" />
                  Saved
                </div>
              ) : (
                <div className="text-gray-500">Not saved</div>
              )}
            </div>
            {lastSaved && (
              <div className="text-xs text-gray-500 mt-1">
                {lastSaved.toLocaleTimeString()}
              </div>
            )}
            {error && (
              <div className="flex items-center text-red-600 text-xs mt-1">
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
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className={activeSection === section.id ? 'block' : 'hidden'}
            >
              <Card className="p-6">
                {renderSectionContent(section)}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
