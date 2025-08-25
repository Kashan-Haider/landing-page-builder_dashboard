import React, { useState, useCallback } from "react";
import { Save, ArrowLeft } from "lucide-react";
import type { LandingPage } from "../../types/landingPageDataTypes";
import { setNestedValue } from "./formHelpers";

// Import section components
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { SeoSection } from "./sections/SeoSection";
import { ThemeSection } from "./sections/ThemeSection";
import { BusinessDataSection } from "./sections/BusinessDataSection";
import { ContentSection } from "./sections/ContentSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { FaqSection } from "./sections/FaqSection";
import { ImageArrayInput } from "./ImageArrayInput";

interface CmsFormProps {
  page?: LandingPage;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const CmsForm: React.FC<CmsFormProps> = ({
  page,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  // Initialize form data with page data or defaults
  const [formData, setFormData] = useState<any>(() => {
    if (page) return { ...page };
    
    return {
      templateId: "",
      businessName: "",
      githubUrl: "",
      status: "draft",
      content: {
        hero: {
          title: "",
          subtitle: "",
          description: "",
          ctaButtons: [],
        },
        about: {
          title: "",
          description: "",
          features: [],
          ctaButton: undefined,
        },
        services: {
          title: "",
          description: "",
          services: [],
        },
        gallery: {
          title: "",
          description: "",
        },
        testimonials: {
          title: "",
          description: "",
          testimonials: [],
        },
        faq: {
          title: "",
          description: "",
          questions: [],
        },
        contact: {
          title: "",
          description: "",
          showMap: true,
        },
        footer: {
          copyright: "",
          links: [],
        },
      },
      seoData: {
        title: "",
        description: "",
        keywords: [],
        canonicalUrl: "",
        focusedKeywords: [],
        isIndex: true,
      },
      themeData: {
        primaryColor: "#3B82F6",
        secondaryColor: "#1E40AF",
        fontFamily: "Inter",
        logoUrl: "",
      },
      businessData: {
        phone: "",
        email: "",
        emergencyPhone: "",
        emergencyEmail: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "US",
        },
        coordinates: undefined,
        hours: {
          timezone: "",
          schedule: [],
        },
        socialLinks: [],
        serviceAreas: [],
      },
      images: [],
    };
  });

  // Current section state for sidebar navigation
  const [currentSection, setCurrentSection] = useState("basic");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  // Helper to update nested form data
  const updateFormData = useCallback((path: string, value: any) => {
    setFormData((prev: any) => setNestedValue(prev, path, value));
  }, []);

  // Save handler
  const handleSave = useCallback(async () => {
    setSaveStatus("saving");
    try {
      await onSave(formData);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  }, [formData, onSave]);

  // Form sections for sidebar navigation
  const sections = [
    { id: "basic", label: "Basic Info", icon: "📝" },
    { id: "seo", label: "SEO Settings", icon: "🔍" },
    { id: "theme", label: "Theme & Design", icon: "🎨" },
    { id: "business", label: "Business Data", icon: "🏢" },
    { id: "hero", label: "Hero Section", icon: "🎯" },
    { id: "about", label: "About Section", icon: "ℹ️" },
    { id: "services", label: "Services", icon: "⚙️" },
    { id: "gallery", label: "Gallery", icon: "🖼️" },
    { id: "testimonials", label: "Testimonials", icon: "💬" },
    { id: "faq", label: "FAQ", icon: "❓" },
    { id: "contact", label: "Contact", icon: "📞" },
    { id: "footer", label: "Footer", icon: "📄" },
    { id: "images", label: "Images", icon: "🖼️" },
  ];

  // Render current section content
  const renderCurrentSection = () => {
    switch (currentSection) {
      case "basic":
        return <BasicInfoSection formData={formData} updateFormData={updateFormData} />;
      case "seo":
        return <SeoSection formData={formData} updateFormData={updateFormData} />;
      case "theme":
        return <ThemeSection formData={formData} updateFormData={updateFormData} />;
      case "business":
        return <BusinessDataSection formData={formData} updateFormData={updateFormData} />;
      case "hero":
        return <ContentSection formData={formData} updateFormData={updateFormData} section="hero" />;
      case "about":
        return <ContentSection formData={formData} updateFormData={updateFormData} section="about" />;
      case "services":
        return <ServicesSection formData={formData} updateFormData={updateFormData} />;
      case "gallery":
        return <ContentSection formData={formData} updateFormData={updateFormData} section="gallery" />;
      case "testimonials":
        return <TestimonialsSection formData={formData} updateFormData={updateFormData} />;
      case "faq":
        return <FaqSection formData={formData} updateFormData={updateFormData} />;
      case "contact":
        return <ContentSection formData={formData} updateFormData={updateFormData} section="contact" />;
      case "footer":
        return <ContentSection formData={formData} updateFormData={updateFormData} section="footer" />;
      case "images":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                Page Images
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Manage all images used throughout your landing page
              </p>
            </div>
            <ImageArrayInput
              label="Images"
              value={formData.images || []}
              onChange={(value) => updateFormData("images", value)}
            />
          </div>
        );
      default:
        return <BasicInfoSection formData={formData} updateFormData={updateFormData} />;
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar Navigation */}
      <div
        className="w-64 border-r p-4 space-y-2 overflow-y-auto"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-secondary)",
        }}
      >
        <div className="mb-6">
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Edit Page
          </h3>
          <p
            className="text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {formData.businessName || "New Landing Page"}
          </p>
        </div>

        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(section.id)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
              currentSection === section.id
                ? "metallic-bg"
                : "hover:bg-opacity-50"
            }`}
            style={{
              backgroundColor:
                currentSection === section.id
                  ? "var(--accent-primary)"
                  : "transparent",
              color:
                currentSection === section.id
                  ? "white"
                  : "var(--text-secondary)",
            }}
          >
            <span>{section.icon}</span>
            <span className="text-sm font-medium">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Main Form Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div
          className="border-b px-6 py-4 flex justify-between items-center"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-secondary)",
          }}
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={onCancel}
              className="btn-metallic px-3 py-2 rounded-lg flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div>
              <h2
                className="text-xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {sections.find((s) => s.id === currentSection)?.label}
              </h2>
              <p
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Configure your landing page settings
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isLoading || saveStatus === "saving"}
            className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300 ${
              saveStatus === "success"
                ? "bg-green-600 text-white"
                : saveStatus === "error"
                ? "bg-red-600 text-white"
                : "btn-metallic"
            }`}
          >
            <Save className="w-4 h-4" />
            <span>
              {saveStatus === "saving"
                ? "Saving..."
                : saveStatus === "success"
                ? "Saved!"
                : saveStatus === "error"
                ? "Error"
                : "Save Page"}
            </span>
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {renderCurrentSection()}
          </div>
        </div>
      </div>
    </div>
  );
};
