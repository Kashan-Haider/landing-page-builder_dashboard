import React from "react";
import { TextInput } from "../TextInput";
import { ArrayInput } from "../ArrayInput";
import { BooleanInput } from "../BooleanInput";
import { getNestedValue } from "../formHelpers";

interface ContentSectionProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
  section: "hero" | "about" | "gallery" | "contact" | "footer";
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  formData,
  updateFormData,
  section,
}) => {
  const renderHeroSection = () => (
    <div className="space-y-6">
      <TextInput
        label="Hero Title"
        value={getNestedValue(formData, "content.hero.title")}
        onChange={(value) => updateFormData("content.hero.title", value)}
        placeholder="Your compelling headline"
        required
      />
      <TextInput
        label="Hero Subtitle"
        value={getNestedValue(formData, "content.hero.subtitle")}
        onChange={(value) => updateFormData("content.hero.subtitle", value)}
        placeholder="Supporting text that explains your value proposition"
        required
      />
      <TextInput
        label="Hero Description"
        value={getNestedValue(formData, "content.hero.description")}
        onChange={(value) => updateFormData("content.hero.description", value)}
        placeholder="Detailed description of your value proposition"
        multiline
        required
      />
    </div>
  );

  const renderAboutSection = () => (
    <div className="space-y-6">
      <TextInput
        label="About Title"
        value={getNestedValue(formData, "content.about.title")}
        onChange={(value) => updateFormData("content.about.title", value)}
        placeholder="About Us"
        required
      />
      <TextInput
        label="About Description"
        value={getNestedValue(formData, "content.about.description")}
        onChange={(value) => updateFormData("content.about.description", value)}
        placeholder="Tell your story and what makes you unique..."
        multiline
        required
      />
      <ArrayInput
        label="Features"
        value={getNestedValue(formData, "content.about.features")}
        onChange={(value) => updateFormData("content.about.features", value)}
        placeholder="Key feature or benefit"
      />
    </div>
  );

  const renderGallerySection = () => (
    <div className="space-y-6">
      <TextInput
        label="Gallery Title"
        value={getNestedValue(formData, "content.gallery.title")}
        onChange={(value) => updateFormData("content.gallery.title", value)}
        placeholder="Our Work"
        required
      />
      <TextInput
        label="Gallery Description"
        value={getNestedValue(formData, "content.gallery.description")}
        onChange={(value) => updateFormData("content.gallery.description", value)}
        placeholder="Showcase of our best work"
        multiline
        required
      />
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      <TextInput
        label="Contact Title"
        value={getNestedValue(formData, "content.contact.title")}
        onChange={(value) => updateFormData("content.contact.title", value)}
        placeholder="Get In Touch"
        required
      />
      <TextInput
        label="Contact Description"
        value={getNestedValue(formData, "content.contact.description")}
        onChange={(value) => updateFormData("content.contact.description", value)}
        placeholder="We'd love to hear from you..."
        multiline
        required
      />
      <BooleanInput
        label="Show Map"
        value={getNestedValue(formData, "content.contact.showMap")}
        onChange={(value) => updateFormData("content.contact.showMap", value)}
        description="Display a map on the contact section"
      />
    </div>
  );

  const renderFooterSection = () => (
    <div className="space-y-6">
      <TextInput
        label="Copyright Text"
        value={getNestedValue(formData, "content.footer.copyright")}
        onChange={(value) => updateFormData("content.footer.copyright", value)}
        placeholder="© 2024 Your Business. All rights reserved."
        required
      />
    </div>
  );

  const getSectionTitle = () => {
    switch (section) {
      case "hero": return "Hero Section";
      case "about": return "About Section";
      case "gallery": return "Gallery";
      case "contact": return "Contact";
      case "footer": return "Footer";
      default: return "Content Section";
    }
  };

  const getSectionDescription = () => {
    switch (section) {
      case "hero": return "The main banner area of your page";
      case "about": return "Tell your story and showcase what makes you unique";
      case "gallery": return "Display images of your work or products";
      case "contact": return "Help visitors get in touch with you";
      case "footer": return "Footer information and links";
      default: return "Configure this section of your page";
    }
  };

  const renderSectionContent = () => {
    switch (section) {
      case "hero": return renderHeroSection();
      case "about": return renderAboutSection();
      case "gallery": return renderGallerySection();
      case "contact": return renderContactSection();
      case "footer": return renderFooterSection();
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          {getSectionTitle()}
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {getSectionDescription()}
        </p>
      </div>
      {renderSectionContent()}
    </div>
  );
};
