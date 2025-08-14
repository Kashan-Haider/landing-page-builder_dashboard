import React, { useState, useCallback } from "react";
import { Save, ArrowLeft } from "lucide-react";
import { Button, Card } from "../ui/inputs";
import { SectionForm, BusinessContactForm, ImagePoolForm, ServiceAreasForm } from "./SectionForm";
import { setNestedValue } from "../../types/field-definitions";

interface LandingPage {
  id: string;
  templateId: string;
  businessName: string;
  githubUrl?: string;
  businessContact?: any;
  seoSettings?: any;
  theme?: any;
  // Section relationships
  serviceAreas?: any[]; // One-to-many
  socialLink?: any;
  imagePool?: any;
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
  onBack?: () => void;
}

export const DynamicLandingPageForm: React.FC<DynamicLandingPageFormProps> = ({
  landingPage,
  onSave,
  onBack,
}) => {
  const [activeSection, setActiveSection] = useState("basic");
  const [localData, setLocalData] = useState<LandingPage>(landingPage);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Section definitions (updated for one-to-one relationships)
  const sections = [
    {
      id: "basic",
      label: "Basic Info",
      fields: ["businessName", "templateId", "githubUrl"],
    },
    {
      id: "seo",
      label: "SEO Settings",
      fields: [
        "seoSettings.title",
        "seoSettings.description",
        "seoSettings.keywords",
        "seoSettings.favicon",
      ],
    },
    {
      id: "theme",
      label: "Theme",
      fields: ["theme.primaryColor", "theme.secondaryColor"],
    },
    { id: "contact", label: "Business Contact", fields: ["businessContact"] },
    {
      id: "serviceAreas",
      label: "Service Areas",
      fields: [], // Will be handled by specialized form
    },
    {
      id: "socialLink",
      label: "Social Link",
      fields: ["socialLink.platform", "socialLink.url"],
    },
    {
      id: "imagePool",
      label: "Image Pool",
      fields: ["imagePool.name", "imagePool.description"],
    },
    {
      id: "hero",
      label: "Hero Section",
      fields: [
        "heroSection.title",
        "heroSection.subtitle",
        "heroSection.description",
      ],
    },
    {
      id: "about",
      label: "About Section",
      fields: [
        "aboutSection.title",
        "aboutSection.description",
        "aboutSection.features",
      ],
    },
    {
      id: "services",
      label: "Services Section",
      fields: ["servicesSection.title", "servicesSection.description"],
    },
    {
      id: "gallery",
      label: "Gallery Section",
      fields: ["gallerySection.title", "gallerySection.description"],
    },
    {
      id: "testimonials",
      label: "Testimonials Section",
      fields: ["testimonialsSection.title", "testimonialsSection.description"],
    },
    {
      id: "faq",
      label: "FAQ Section",
      fields: ["faqSection.title", "faqSection.description"],
    },
    {
      id: "serviceAreaSection",
      label: "Service Area Section",
      fields: ["serviceAreaSection.title", "serviceAreaSection.description"],
    },
    {
      id: "businessDetails",
      label: "Business Details",
      fields: ["businessDetailsSection.title"],
    },
    {
      id: "companyOverview",
      label: "Company Overview",
      fields: ["companyOverviewSection.title"],
    },
    {
      id: "serviceHighlights",
      label: "Service Highlights",
      fields: ["serviceHighlightsSection.title"],
    },
    {
      id: "preFooter",
      label: "Pre-Footer",
      fields: ["preFooterSection.description"],
    },
    { id: "footer", label: "Footer", fields: ["footerSection.copyright"] },
  ];

  // Handle field changes
  const handleFieldChange = useCallback(
    (path: string, value: any) => {
      setLocalData((prevData) => {
        const newData = setNestedValue(prevData, path, value);
        return newData;
      });
      // Clear any previous save status when user makes changes
      if (saveError) {
        setSaveError(null);
      }
      if (saveSuccess) {
        setSaveSuccess(false);
      }
    },
    [saveError]
  );

  // Handle manual save
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveError(null);
      setSaveSuccess(false);
      await onSave(localData);
      setSaveSuccess(true);
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  // Render specialized section forms
  const renderSectionContent = (section: (typeof sections)[0]) => {
    switch (section.id) {
      case "contact":
        return (
          <BusinessContactForm
            data={localData.businessContact || {}}
            onChange={handleFieldChange}
          />
        );
      
      case "imagePool":
        return (
          <ImagePoolForm
            data={localData}
            onChange={handleFieldChange}
          />
        );
      
      case "serviceAreas":
        return (
          <ServiceAreasForm
            data={localData}
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
              <Button onClick={onBack} variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Save Status */}
          {saveError && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center text-red-400 text-sm">
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {saveError}
              </div>
            </div>
          )}
          {saveSuccess && (
            <div className="mb-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center text-green-400 text-sm">
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Changes saved successfully!
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mb-6">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              size="md"
              className="w-full"
            >
              {isSaving ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
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
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700 hover:text-slate-100"
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
              className={activeSection === section.id ? "block" : "hidden"}
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
