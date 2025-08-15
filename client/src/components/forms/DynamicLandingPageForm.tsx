import React, { useState, useCallback } from "react";
import { Save, ArrowLeft, Edit3 } from "lucide-react";
import type { LandingPage } from '../../types/landingPageDataTypes';

// Helper to safely get nested values
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Helper to safely set nested values
const setNestedValue = (obj: any, path: string, value: any) => {
  const result = { ...obj };
  const keys = path.split('.');
  let current = result;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    } else {
      current[key] = { ...current[key] };
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
  return result;
};

const TextInput: React.FC<{
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}> = ({ label, value, onChange, placeholder, multiline = false }) => {
  const Component = multiline ? 'textarea' : 'input';
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</label>
      <Component
        type={multiline ? undefined : "text"}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 metallic-bg rounded-lg border transition-all duration-300 outline-none ${
          multiline ? 'min-h-[100px] resize-y' : ''
        }`}
        style={{
          color: 'var(--text-primary)',
          borderColor: 'var(--border-secondary)',
          backgroundColor: 'var(--bg-secondary)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent-primary)';
          e.target.style.boxShadow = '0 0 0 3px rgba(124, 156, 196, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-secondary)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
};

const ArrayInput: React.FC<{
  label: string;
  value: string[] | undefined;
  onChange: (value: string[]) => void;
  placeholder?: string;
}> = ({ label, value = [], onChange, placeholder }) => {
  const addItem = () => onChange([...value, '']);
  const updateItem = (index: number, newValue: string) => {
    const newArray = [...value];
    newArray[index] = newValue;
    onChange(newArray);
  };
  const removeItem = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</label>
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-2 metallic-bg rounded-lg border transition-all duration-300 outline-none"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--border-secondary)',
                backgroundColor: 'var(--bg-secondary)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent-primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(124, 156, 196, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-secondary)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="px-3 py-2 rounded-lg transition-all duration-300 border"
              style={{
                color: 'var(--error)',
                borderColor: 'var(--error)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--error)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.color = 'var(--error)';
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="text-sm font-medium transition-all duration-300 hover:underline"
        style={{ color: 'var(--accent-primary)' }}
      >
        + Add {label.toLowerCase().slice(0, -1)}
      </button>
    </div>
  );
};

// Component for Services Array
const ServicesArrayInput: React.FC<{
  label: string;
  value: any[] | undefined;
  onChange: (value: any[]) => void;
}> = ({ label, value = [], onChange }) => {
  const addService = () => {
    onChange([...value, {
      name: '',
      description: '',
      features: [],
      price: ''
    }]);
  };

  const updateService = (index: number, field: string, newValue: any) => {
    const newArray = [...value];
    newArray[index] = { ...newArray[index], [field]: newValue };
    onChange(newArray);
  };

  const removeService = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</label>
      {value.map((service, index) => (
        <div key={index} className="card-metallic p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h5 className="font-medium" style={{ color: 'var(--text-secondary)' }}>Service {index + 1}</h5>
            <button
              type="button"
              onClick={() => removeService(index)}
              className="px-3 py-1 rounded text-sm transition-all duration-300"
              style={{ color: 'var(--error)' }}
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Service Name"
              value={service.name}
              onChange={(val) => updateService(index, 'name', val)}
              placeholder="e.g., Business Consulting"
            />
            <TextInput
              label="Price"
              value={service.price}
              onChange={(val) => updateService(index, 'price', val)}
              placeholder="e.g., Starting at $500"
            />
          </div>
          <TextInput
            label="Description"
            value={service.description}
            onChange={(val) => updateService(index, 'description', val)}
            placeholder="Describe this service"
            multiline
          />
          <ArrayInput
            label="Features"
            value={service.features || []}
            onChange={(val) => updateService(index, 'features', val)}
            placeholder="Enter a feature"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addService}
        className="btn-metallic px-4 py-2 rounded-lg text-sm font-medium"
      >
        + Add Service
      </button>
    </div>
  );
};

// Component for Testimonials Array
const TestimonialsArrayInput: React.FC<{
  label: string;
  value: any[] | undefined;
  onChange: (value: any[]) => void;
}> = ({ label, value = [], onChange }) => {
  const addTestimonial = () => {
    onChange([...value, {
      name: '',
      role: '',
      company: '',
      text: '',
      rating: 5
    }]);
  };

  const updateTestimonial = (index: number, field: string, newValue: any) => {
    const newArray = [...value];
    newArray[index] = { ...newArray[index], [field]: newValue };
    onChange(newArray);
  };

  const removeTestimonial = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</label>
      {value.map((testimonial, index) => (
        <div key={index} className="card-metallic p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h5 className="font-medium" style={{ color: 'var(--text-secondary)' }}>Testimonial {index + 1}</h5>
            <button
              type="button"
              onClick={() => removeTestimonial(index)}
              className="px-3 py-1 rounded text-sm transition-all duration-300"
              style={{ color: 'var(--error)' }}
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput
              label="Name"
              value={testimonial.name}
              onChange={(val) => updateTestimonial(index, 'name', val)}
              placeholder="Client name"
            />
            <TextInput
              label="Role"
              value={testimonial.role}
              onChange={(val) => updateTestimonial(index, 'role', val)}
              placeholder="e.g., CEO"
            />
            <TextInput
              label="Company"
              value={testimonial.company}
              onChange={(val) => updateTestimonial(index, 'company', val)}
              placeholder="Company name"
            />
          </div>
          <TextInput
            label="Testimonial Text"
            value={testimonial.text}
            onChange={(val) => updateTestimonial(index, 'text', val)}
            placeholder="What did they say about your service?"
            multiline
          />
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>Rating</label>
            <select
              value={testimonial.rating || 5}
              onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value))}
              className="px-4 py-2 metallic-bg rounded-lg border transition-all duration-300 outline-none"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--border-secondary)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addTestimonial}
        className="btn-metallic px-4 py-2 rounded-lg text-sm font-medium"
      >
        + Add Testimonial
      </button>
    </div>
  );
};

// Component for FAQ Array
const FAQArrayInput: React.FC<{
  label: string;
  value: any[] | undefined;
  onChange: (value: any[]) => void;
}> = ({ label, value = [], onChange }) => {
  const addFAQ = () => {
    onChange([...value, {
      question: '',
      answer: '',
      category: 'general'
    }]);
  };

  const updateFAQ = (index: number, field: string, newValue: any) => {
    const newArray = [...value];
    newArray[index] = { ...newArray[index], [field]: newValue };
    onChange(newArray);
  };

  const removeFAQ = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</label>
      {value.map((faq, index) => (
        <div key={index} className="card-metallic p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h5 className="font-medium" style={{ color: 'var(--text-secondary)' }}>FAQ {index + 1}</h5>
            <button
              type="button"
              onClick={() => removeFAQ(index)}
              className="px-3 py-1 rounded text-sm transition-all duration-300"
              style={{ color: 'var(--error)' }}
            >
              Remove
            </button>
          </div>
          <TextInput
            label="Question"
            value={faq.question}
            onChange={(val) => updateFAQ(index, 'question', val)}
            placeholder="What question do customers ask?"
          />
          <TextInput
            label="Answer"
            value={faq.answer}
            onChange={(val) => updateFAQ(index, 'answer', val)}
            placeholder="Provide a helpful answer"
            multiline
          />
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>Category</label>
            <select
              value={faq.category || 'general'}
              onChange={(e) => updateFAQ(index, 'category', e.target.value)}
              className="px-4 py-2 metallic-bg rounded-lg border transition-all duration-300 outline-none"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--border-secondary)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <option value="general">General</option>
              <option value="services">Services</option>
              <option value="pricing">Pricing</option>
              <option value="support">Support</option>
              <option value="results">Results</option>
            </select>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addFAQ}
        className="btn-metallic px-4 py-2 rounded-lg text-sm font-medium"
      >
        + Add FAQ
      </button>
    </div>
  );
};

// Component for Business Hours Array
const BusinessHoursInput: React.FC<{
  label: string;
  value: any[] | undefined;
  onChange: (value: any[]) => void;
}> = ({ label, value = [], onChange }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Initialize with all days if empty
  React.useEffect(() => {
    if (value.length === 0) {
      const defaultHours = days.map(day => ({
        day,
        hours: day === 'Sunday' ? 'Closed' : '9:00 AM - 5:00 PM',
        isClosed: day === 'Sunday'
      }));
      onChange(defaultHours);
    }
  }, [value.length, onChange]);

  const updateHour = (index: number, field: string, newValue: any) => {
    const newArray = [...value];
    newArray[index] = { ...newArray[index], [field]: newValue };
    onChange(newArray);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</label>
      <div className="space-y-3">
        {value.map((hour, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 items-center p-3 metallic-bg rounded-lg">
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{hour.day}</span>
            <input
              type="text"
              value={hour.hours}
              onChange={(e) => updateHour(index, 'hours', e.target.value)}
              placeholder="e.g., 9:00 AM - 5:00 PM"
              className="px-3 py-2 rounded border transition-all duration-300 outline-none"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--border-secondary)',
                backgroundColor: 'var(--bg-secondary)'
              }}
              disabled={hour.isClosed}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hour.isClosed}
                onChange={(e) => {
                  updateHour(index, 'isClosed', e.target.checked);
                  if (e.target.checked) {
                    updateHour(index, 'hours', 'Closed');
                  }
                }}
                className="rounded"
              />
              <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Closed</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for Social Links Array
const SocialLinksInput: React.FC<{
  label: string;
  value: any[] | undefined;
  onChange: (value: any[]) => void;
}> = ({ label, value = [], onChange }) => {
  const addSocialLink = () => {
    onChange([...value, {
      platform: '',
      url: ''
    }]);
  };

  const updateSocialLink = (index: number, field: string, newValue: any) => {
    const newArray = [...value];
    newArray[index] = { ...newArray[index], [field]: newValue };
    onChange(newArray);
  };

  const removeSocialLink = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</label>
      {value.map((link, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>Platform</label>
            <select
              value={link.platform}
              onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
              className="w-full px-3 py-2 metallic-bg rounded border transition-all duration-300 outline-none"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--border-secondary)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <option value="">Select Platform</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>URL</label>
            <input
              type="url"
              value={link.url}
              onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 metallic-bg rounded border transition-all duration-300 outline-none"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--border-secondary)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => removeSocialLink(index)}
            className="px-3 py-2 rounded transition-all duration-300"
            style={{ color: 'var(--error)' }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addSocialLink}
        className="btn-metallic px-4 py-2 rounded-lg text-sm font-medium"
      >
        + Add Social Link
      </button>
    </div>
  );
};

// Component for Service Areas Array
const ServiceAreasInput: React.FC<{
  label: string;
  value: any[] | undefined;
  onChange: (value: any[]) => void;
}> = ({ label, value = [], onChange }) => {
  const addServiceArea = () => {
    onChange([...value, {
      city: '',
      region: '',
      description: ''
    }]);
  };

  const updateServiceArea = (index: number, field: string, newValue: any) => {
    const newArray = [...value];
    newArray[index] = { ...newArray[index], [field]: newValue };
    onChange(newArray);
  };

  const removeServiceArea = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</label>
      {value.map((area, index) => (
        <div key={index} className="card-metallic p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h5 className="font-medium" style={{ color: 'var(--text-secondary)' }}>Service Area {index + 1}</h5>
            <button
              type="button"
              onClick={() => removeServiceArea(index)}
              className="px-3 py-1 rounded text-sm transition-all duration-300"
              style={{ color: 'var(--error)' }}
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="City"
              value={area.city}
              onChange={(val) => updateServiceArea(index, 'city', val)}
              placeholder="e.g., New York"
            />
            <TextInput
              label="Region"
              value={area.region}
              onChange={(val) => updateServiceArea(index, 'region', val)}
              placeholder="e.g., Manhattan"
            />
          </div>
          <TextInput
            label="Description"
            value={area.description}
            onChange={(val) => updateServiceArea(index, 'description', val)}
            placeholder="Describe coverage in this area"
            multiline
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addServiceArea}
        className="btn-metallic px-4 py-2 rounded-lg text-sm font-medium"
      >
        + Add Service Area
      </button>
    </div>
  );
};

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
  
  // Initialize form data with the actual landing page data
  const [localData, setLocalData] = useState<LandingPage>(() => {
    console.log('Form: Initializing with landing page data:', landingPage);
    return { ...landingPage };
  });
  
  // Update local data when landing page prop changes
  React.useEffect(() => {
    console.log('Form: Landing page updated, syncing local data:', landingPage);
    setLocalData({ ...landingPage });
  }, [landingPage]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Section definitions for the comprehensive JSON schema
  const sections = [
    {
      id: "basic",
      label: "Basic Information",
      description: "Core details about the landing page"
    },
    {
      id: "seo",
      label: "SEO Data",
      description: "Search engine optimization settings"
    },
    {
      id: "theme",
      label: "Theme Data", 
      description: "Visual appearance settings"
    },
    {
      id: "business",
      label: "Business Data",
      description: "Business contact and location information"
    },
    {
      id: "content",
      label: "Page Content",
      description: "Hero, About, Services, and other sections"
    },
    {
      id: "advanced-content",
      label: "Advanced Content",
      description: "Testimonials, FAQ, Gallery, Contact & Footer"
    }
  ];

  // Handle field changes
  const handleFieldChange = useCallback(
    (path: string, value: any) => {
      console.log('Form: Field change - path:', path, 'value:', value);
      setLocalData((prevData) => {
        const newData = setNestedValue(prevData, path, value);
        console.log('Form: Updated local data:', newData);
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
    [saveError, saveSuccess]
  );

  // Handle manual save
  const handleSave = async () => {
    try {
      console.log('Form: Starting save process with data:', localData);
      setIsSaving(true);
      setSaveError(null);
      setSaveSuccess(false);
      
      await onSave(localData);
      
      console.log('Form: Save operation completed successfully');
      setSaveSuccess(true);
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Form: Save operation failed:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to save";
      setSaveError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  // Render section forms based on comprehensive schema
  const renderSectionContent = (section: (typeof sections)[0]) => {
    switch (section.id) {
      case "basic":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold silver-text mb-6">Basic Information</h3>
            <TextInput
              label="Business Name"
              value={localData.businessName}
              onChange={(value) => handleFieldChange('businessName', value)}
              placeholder="Enter business name"
            />
            <TextInput
              label="Template ID"
              value={localData.templateId}
              onChange={(value) => handleFieldChange('templateId', value)}
              placeholder="Enter template ID"
            />
            <TextInput
              label="GitHub URL (optional)"
              value={localData.githubUrl}
              onChange={(value) => handleFieldChange('githubUrl', value)}
              placeholder="https://github.com/..."
            />
          </div>
        );
      
      case "seo":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold silver-text mb-6">SEO Data</h3>
            <TextInput
              label="Page Title"
              value={getNestedValue(localData, 'seoData.title')}
              onChange={(value) => handleFieldChange('seoData.title', value)}
              placeholder="Page title for search engines"
            />
            <TextInput
              label="Meta Description"
              value={getNestedValue(localData, 'seoData.description')}
              onChange={(value) => handleFieldChange('seoData.description', value)}
              placeholder="Brief description for search results"
              multiline
            />
            <ArrayInput
              label="Keywords"
              value={getNestedValue(localData, 'seoData.keywords')}
              onChange={(value) => handleFieldChange('seoData.keywords', value)}
              placeholder="Enter a keyword"
            />
          </div>
        );
      
      case "theme":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold silver-text mb-6">Theme Data</h3>
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Primary Color"
                value={getNestedValue(localData, 'themeData.primaryColor')}
                onChange={(value) => handleFieldChange('themeData.primaryColor', value)}
                placeholder="#3B82F6"
              />
              <TextInput
                label="Secondary Color"
                value={getNestedValue(localData, 'themeData.secondaryColor')}
                onChange={(value) => handleFieldChange('themeData.secondaryColor', value)}
                placeholder="#10B981"
              />
            </div>
            <TextInput
              label="Font Family"
              value={getNestedValue(localData, 'themeData.fontFamily')}
              onChange={(value) => handleFieldChange('themeData.fontFamily', value)}
              placeholder="Inter, system-ui, sans-serif"
            />
            <TextInput
              label="Logo URL"
              value={getNestedValue(localData, 'themeData.logoUrl')}
              onChange={(value) => handleFieldChange('themeData.logoUrl', value)}
              placeholder="URL to logo image"
            />
          </div>
        );
      
      case "business":
        return (
          <div className="space-y-8">
            <h3 className="text-xl font-bold silver-text mb-6">Business Data</h3>
            
            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Contact Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Phone"
                  value={getNestedValue(localData, 'businessData.phone')}
                  onChange={(value) => handleFieldChange('businessData.phone', value)}
                  placeholder="(555) 123-4567"
                />
                <TextInput
                  label="Email"
                  value={getNestedValue(localData, 'businessData.email')}
                  onChange={(value) => handleFieldChange('businessData.email', value)}
                  placeholder="contact@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Emergency Phone"
                  value={getNestedValue(localData, 'businessData.emergencyPhone')}
                  onChange={(value) => handleFieldChange('businessData.emergencyPhone', value)}
                  placeholder="(555) 987-6543"
                />
                <TextInput
                  label="Emergency Email"
                  value={getNestedValue(localData, 'businessData.emergencyEmail')}
                  onChange={(value) => handleFieldChange('businessData.emergencyEmail', value)}
                  placeholder="emergency@example.com"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Address</h4>
              <TextInput
                label="Street"
                value={getNestedValue(localData, 'businessData.address.street')}
                onChange={(value) => handleFieldChange('businessData.address.street', value)}
                placeholder="123 Main Street"
              />
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="City"
                  value={getNestedValue(localData, 'businessData.address.city')}
                  onChange={(value) => handleFieldChange('businessData.address.city', value)}
                  placeholder="New York"
                />
                <TextInput
                  label="State"
                  value={getNestedValue(localData, 'businessData.address.state')}
                  onChange={(value) => handleFieldChange('businessData.address.state', value)}
                  placeholder="NY"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Zip Code"
                  value={getNestedValue(localData, 'businessData.address.zipCode')}
                  onChange={(value) => handleFieldChange('businessData.address.zipCode', value)}
                  placeholder="10001"
                />
                <TextInput
                  label="Country"
                  value={getNestedValue(localData, 'businessData.address.country')}
                  onChange={(value) => handleFieldChange('businessData.address.country', value)}
                  placeholder="United States"
                />
              </div>
            </div>

            {/* Coordinates */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Coordinates</h4>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Latitude"
                  value={getNestedValue(localData, 'businessData.coordinates.latitude')}
                  onChange={(value) => handleFieldChange('businessData.coordinates.latitude', parseFloat(value) || 0)}
                  placeholder="40.7128"
                />
                <TextInput
                  label="Longitude"
                  value={getNestedValue(localData, 'businessData.coordinates.longitude')}
                  onChange={(value) => handleFieldChange('businessData.coordinates.longitude', parseFloat(value) || 0)}
                  placeholder="-74.0060"
                />
              </div>
            </div>
          </div>
        );
      
      case "content":
        return (
          <div className="space-y-8">
            <h3 className="text-xl font-bold silver-text mb-6">Page Content</h3>
            
            {/* Hero Section */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Hero Section</h4>
              <TextInput
                label="Title"
                value={getNestedValue(localData, 'content.hero.title')}
                onChange={(value) => handleFieldChange('content.hero.title', value)}
                placeholder="Welcome to our business"
              />
              <TextInput
                label="Subtitle"
                value={getNestedValue(localData, 'content.hero.subtitle')}
                onChange={(value) => handleFieldChange('content.hero.subtitle', value)}
                placeholder="We provide excellent services"
              />
              <TextInput
                label="Description"
                value={getNestedValue(localData, 'content.hero.description')}
                onChange={(value) => handleFieldChange('content.hero.description', value)}
                placeholder="Tell visitors what makes your business special"
                multiline
              />
            </div>

            {/* About Section */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>About Section</h4>
              <TextInput
                label="Title"
                value={getNestedValue(localData, 'content.about.title')}
                onChange={(value) => handleFieldChange('content.about.title', value)}
                placeholder="About Us"
              />
              <TextInput
                label="Description"
                value={getNestedValue(localData, 'content.about.description')}
                onChange={(value) => handleFieldChange('content.about.description', value)}
                placeholder="Tell your story and what you do"
                multiline
              />
              <ArrayInput
                label="Features"
                value={getNestedValue(localData, 'content.about.features')}
                onChange={(value) => handleFieldChange('content.about.features', value)}
                placeholder="Enter a feature or benefit"
              />
            </div>

            {/* Services Section */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Services Section</h4>
              <TextInput
                label="Title"
                value={getNestedValue(localData, 'content.services.title')}
                onChange={(value) => handleFieldChange('content.services.title', value)}
                placeholder="Our Services"
              />
              <TextInput
                label="Description"
                value={getNestedValue(localData, 'content.services.description')}
                onChange={(value) => handleFieldChange('content.services.description', value)}
                placeholder="Description of your services"
                multiline
              />
            </div>

            {/* Gallery Section */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Gallery Section</h4>
              <TextInput
                label="Title"
                value={getNestedValue(localData, 'content.gallery.title')}
                onChange={(value) => handleFieldChange('content.gallery.title', value)}
                placeholder="Our Work"
              />
              <TextInput
                label="Description"
                value={getNestedValue(localData, 'content.gallery.description')}
                onChange={(value) => handleFieldChange('content.gallery.description', value)}
                placeholder="Showcase of our work"
                multiline
              />
              <ArrayInput
                label="Categories"
                value={getNestedValue(localData, 'content.gallery.categories')}
                onChange={(value) => handleFieldChange('content.gallery.categories', value)}
                placeholder="Enter a category"
              />
            </div>
          </div>
        );

      case "advanced-content":
        return (
          <div className="space-y-8">
            <h3 className="text-xl font-bold silver-text mb-6">Advanced Content</h3>
            
            {/* Services Management */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Services Data</h4>
              <ServicesArrayInput
                label="Services"
                value={getNestedValue(localData, 'content.services.services')}
                onChange={(value) => handleFieldChange('content.services.services', value)}
              />
            </div>

            {/* Testimonials Section */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Testimonials Section</h4>
              <TextInput
                label="Title"
                value={getNestedValue(localData, 'content.testimonials.title')}
                onChange={(value) => handleFieldChange('content.testimonials.title', value)}
                placeholder="What Our Clients Say"
              />
              <TextInput
                label="Description"
                value={getNestedValue(localData, 'content.testimonials.description')}
                onChange={(value) => handleFieldChange('content.testimonials.description', value)}
                placeholder="Don't just take our word for it"
                multiline
              />
              <TestimonialsArrayInput
                label="Testimonials"
                value={getNestedValue(localData, 'content.testimonials.testimonials')}
                onChange={(value) => handleFieldChange('content.testimonials.testimonials', value)}
              />
            </div>

            {/* FAQ Section */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>FAQ Section</h4>
              <TextInput
                label="Title"
                value={getNestedValue(localData, 'content.faq.title')}
                onChange={(value) => handleFieldChange('content.faq.title', value)}
                placeholder="Frequently Asked Questions"
              />
              <TextInput
                label="Description"
                value={getNestedValue(localData, 'content.faq.description')}
                onChange={(value) => handleFieldChange('content.faq.description', value)}
                placeholder="Find answers to common questions"
                multiline
              />
              <FAQArrayInput
                label="FAQ Items"
                value={getNestedValue(localData, 'content.faq.questions')}
                onChange={(value) => handleFieldChange('content.faq.questions', value)}
              />
            </div>

            {/* Business Hours */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Business Hours</h4>
              <BusinessHoursInput
                label="Hours"
                value={getNestedValue(localData, 'businessData.hours')}
                onChange={(value) => handleFieldChange('businessData.hours', value)}
              />
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Social Media</h4>
              <SocialLinksInput
                label="Social Links"
                value={getNestedValue(localData, 'businessData.socialLinks')}
                onChange={(value) => handleFieldChange('businessData.socialLinks', value)}
              />
            </div>

            {/* Service Areas */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Service Areas</h4>
              <ServiceAreasInput
                label="Service Areas"
                value={getNestedValue(localData, 'businessData.serviceAreas')}
                onChange={(value) => handleFieldChange('businessData.serviceAreas', value)}
              />
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Contact Section</h4>
              <TextInput
                label="Title"
                value={getNestedValue(localData, 'content.contact.title')}
                onChange={(value) => handleFieldChange('content.contact.title', value)}
                placeholder="Get In Touch"
              />
              <TextInput
                label="Description"
                value={getNestedValue(localData, 'content.contact.description')}
                onChange={(value) => handleFieldChange('content.contact.description', value)}
                placeholder="Ready to get started? Contact us today"
                multiline
              />
            </div>

            {/* Footer Section */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Footer Section</h4>
              <TextInput
                label="Copyright Text"
                value={getNestedValue(localData, 'content.footer.copyright')}
                onChange={(value) => handleFieldChange('content.footer.copyright', value)}
                placeholder="© 2025 Your Business. All rights reserved."
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-8 text-center">
            <Edit3 className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
            <p style={{ color: 'var(--text-tertiary)' }}>Section content will be displayed here</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-dark)' }}>
      {/* Header */}
      <div className="glass-effect border-b" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 rounded-lg transition-all duration-300 metallic-bg border"
                  style={{ borderColor: 'var(--border-secondary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <ArrowLeft className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                </button>
              )}
              <div>
                <h1 className="text-2xl font-bold silver-text">Advanced Landing Page Editor</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>Customize every aspect of your landing page with our comprehensive editor</p>
              </div>
            </div>
            
            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-metallic inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onMouseEnter={(e) => !isSaving && (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => !isSaving && (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {isSaving ? (
                <>
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {(saveError || saveSuccess) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          {saveError && (
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'var(--error)' }}>
              <div className="flex items-center text-sm" style={{ color: 'var(--error)' }}>
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {saveError}
              </div>
            </div>
          )}
          {saveSuccess && (
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: 'rgba(74, 222, 128, 0.1)', borderColor: 'var(--success)' }}>
              <div className="flex items-center text-sm" style={{ color: 'var(--success)' }}>
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Changes saved successfully!
              </div>
            </div>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-72 flex-shrink-0">
            <div className="card-metallic p-2">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 border ${
                      activeSection === section.id ? "btn-metallic shadow-lg" : "metallic-bg"
                    }`}
                    style={{
                      borderColor: activeSection === section.id ? 'var(--accent-primary)' : 'var(--border-secondary)',
                      transform: activeSection === section.id ? 'translateX(4px)' : 'translateX(0)'
                    }}
                  >
                    <div>
                      <div className="font-semibold" style={{ color: activeSection === section.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {section.label}
                      </div>
                      {section.description && (
                        <div className="text-xs mt-1" style={{ color: activeSection === section.id ? 'var(--text-tertiary)' : 'var(--text-muted)' }}>
                          {section.description}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="card-metallic">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={activeSection === section.id ? "block p-8" : "hidden"}
                >
                  {renderSectionContent(section)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
