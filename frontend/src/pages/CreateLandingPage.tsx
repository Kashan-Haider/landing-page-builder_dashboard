import React, { useState } from "react";

interface Template {
  id: string;
  name: string;
  url: string;
  description: string;
  preview?: string;
}

interface Service {
  name: string;
  description: string;
  price: string;
  features: string[];
}

interface ServiceArea {
  city: string;
  region: string;
  description: string;
}

interface FormData {
  businessName: string;
  email: string;
  phone: string;
  emergencyPhone: string;
  emergencyEmail: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  templateId: string;
  githubUrl: string;
  services: Service[];
  serviceAreas: ServiceArea[];
}

const CreateLandingPage: React.FC = () => {
  // Available templates
  const templates: Template[] = [
    {
      id: "template001",
      name: "Template 001",
      url: "https://github.com/Kashan-Haider/template001",
      description: "Modern corporate template with clean design and professional layout"
    }
  ];

  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    email: "",
    phone: "",
    emergencyPhone: "",
    emergencyEmail: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    templateId: "template001", // Default to first template
    githubUrl: "https://github.com/Kashan-Haider/template001",
    services: [{ name: "", description: "", price: "", features: [""] }],
    serviceAreas: [{ city: "", region: "", description: "" }]
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle service changes
  const handleServiceChange = (index: number, field: keyof Service, value: string | string[]) => {
    const updatedServices = [...formData.services];
    if (field === 'features' && Array.isArray(value)) {
      updatedServices[index][field] = value;
    } else if (typeof value === 'string') {
      (updatedServices[index] as any)[field] = value;
    }
    setFormData((prev) => ({ ...prev, services: updatedServices }));
  };

  // Handle service area changes
  const handleServiceAreaChange = (index: number, field: keyof ServiceArea, value: string) => {
    const updatedServiceAreas = [...formData.serviceAreas];
    updatedServiceAreas[index][field] = value;
    setFormData((prev) => ({ ...prev, serviceAreas: updatedServiceAreas }));
  };

  // Add new service
  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, { name: "", description: "", price: "", features: [""] }]
    }));
  };

  // Remove service
  const removeService = (index: number) => {
    if (formData.services.length > 1) {
      const updatedServices = formData.services.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, services: updatedServices }));
    }
  };

  // Add new service area
  const addServiceArea = () => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: [...prev.serviceAreas, { city: "", region: "", description: "" }]
    }));
  };

  // Remove service area
  const removeServiceArea = (index: number) => {
    if (formData.serviceAreas.length > 1) {
      const updatedServiceAreas = formData.serviceAreas.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, serviceAreas: updatedServiceAreas }));
    }
  };

  // Handle feature changes for services
  const handleFeatureChange = (serviceIndex: number, featureIndex: number, value: string) => {
    const updatedServices = [...formData.services];
    updatedServices[serviceIndex].features[featureIndex] = value;
    setFormData((prev) => ({ ...prev, services: updatedServices }));
  };

  // Add feature to service
  const addFeature = (serviceIndex: number) => {
    const updatedServices = [...formData.services];
    updatedServices[serviceIndex].features.push("");
    setFormData((prev) => ({ ...prev, services: updatedServices }));
  };

  // Remove feature from service
  const removeFeature = (serviceIndex: number, featureIndex: number) => {
    const updatedServices = [...formData.services];
    if (updatedServices[serviceIndex].features.length > 1) {
      updatedServices[serviceIndex].features.splice(featureIndex, 1);
      setFormData((prev) => ({ ...prev, services: updatedServices }));
    }
  };

  // Handle template selection
  const handleTemplateChange = (templateId: string) => {
    const selectedTemplate = templates.find(t => t.id === templateId);
    if (selectedTemplate) {
      setFormData((prev) => ({
        ...prev,
        templateId: selectedTemplate.id,
        githubUrl: selectedTemplate.url
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Creating landing page with data:", formData);
      
      const response = await fetch('/api/pages/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.businessName,
          templateId: formData.templateId,
          githubUrl: formData.githubUrl,
          email: formData.email,
          phone: formData.phone,
          emergencyPhone: formData.emergencyPhone,
          emergencyEmail: formData.emergencyEmail,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country
          },
          services: formData.services.filter(service => service.name.trim() !== ""),
          serviceAreas: formData.serviceAreas.filter(area => area.city.trim() !== "")
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create landing page');
      }

      const result = await response.json();
      console.log("Landing page created successfully:", result);
      
      alert(`Landing page created successfully! Page ID: ${result.data.id}`);
      
      // Reset form after successful creation
      setFormData({
        businessName: "",
        email: "",
        phone: "",
        emergencyPhone: "",
        emergencyEmail: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        templateId: "template001",
        githubUrl: "https://github.com/Kashan-Haider/template001",
        services: [{ name: "", description: "", price: "", features: [""] }],
        serviceAreas: [{ city: "", region: "", description: "" }]
      });
    } catch (error) {
      console.error("Error creating landing page:", error);
      alert(`Error creating landing page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] py-6 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto bg-[var(--bg-secondary)] rounded-2xl shadow-lg p-8 space-y-6 border border-[var(--border-primary)]"
      >
        <h2 className="text-2xl font-bold text-[var(--text-secondary)] text-center">
          Create Landing Page
        </h2>
        <p className="text-[var(--text-tertiary)] text-center">
          Choose a template and provide comprehensive business information including services and service areas to generate a professional landing page
        </p>

        {/* Template Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--text-secondary)]">
            Select Template *
          </label>
          <div className="space-y-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  formData.templateId === template.id
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                    : 'border-[var(--border-secondary)] bg-[var(--bg-tertiary)] hover:border-[var(--accent-primary)]/50'
                }`}
                onClick={() => handleTemplateChange(template.id)}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="templateId"
                    value={template.id}
                    checked={formData.templateId === template.id}
                    onChange={() => handleTemplateChange(template.id)}
                    className="w-4 h-4 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--text-secondary)]">{template.name}</h3>
                    <p className="text-sm text-[var(--text-tertiary)] mt-1">{template.description}</p>
                    <p className="text-xs text-[var(--text-quaternary)] mt-1">Source: {template.url}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--text-secondary)]">
            Business Name *
          </label>
          <input
            type="text"
            name="businessName"
            placeholder="Enter your business name"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
            required
          />
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4 p-4 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-secondary)]">
          <h3 className="text-lg font-semibold text-[var(--text-secondary)] border-b border-[var(--border-secondary)] pb-2">
            Contact Information
          </h3>
          
          {/* Primary Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
              Primary Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your primary email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
              required
            />
          </div>

          {/* Emergency Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
              Emergency Email
            </label>
            <input
              type="email"
              name="emergencyEmail"
              placeholder="Enter emergency contact email"
              value={formData.emergencyEmail}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
            />
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                Primary Phone *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                Emergency Phone
              </label>
              <input
                type="tel"
                name="emergencyPhone"
                placeholder="Emergency contact number"
                value={formData.emergencyPhone}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Business Address Section */}
        <div className="space-y-4 p-4 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-secondary)]">
          <h3 className="text-lg font-semibold text-[var(--text-secondary)] border-b border-[var(--border-secondary)] pb-2">
            Business Address
          </h3>
          
          {/* Street Address */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
              Street Address *
            </label>
            <input
              type="text"
              name="street"
              placeholder="Enter your street address"
              value={formData.street}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
              required
            />
          </div>

          {/* City, State, Zip */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                City *
              </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                State *
              </label>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                Zip Code *
              </label>
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Country */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
              Country *
            </label>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="space-y-4 p-4 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-secondary)]">
          <div className="flex justify-between items-center border-b border-[var(--border-secondary)] pb-2">
            <h3 className="text-lg font-semibold text-[var(--text-secondary)]">
              Services Offered
            </h3>
            <button
              type="button"
              onClick={addService}
              className="px-3 py-1 text-sm bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors"
            >
              + Add Service
            </button>
          </div>
          
          {formData.services.map((service, serviceIndex) => (
            <div key={serviceIndex} className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-secondary)] space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-[var(--text-secondary)]">
                  Service {serviceIndex + 1}
                </h4>
                {formData.services.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeService(serviceIndex)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--text-secondary)]">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Web Development"
                    value={service.name}
                    onChange={(e) => handleServiceChange(serviceIndex, 'name', e.target.value)}
                    className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--text-secondary)]">
                    Price
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Starting at $2,500"
                    value={service.price}
                    onChange={(e) => handleServiceChange(serviceIndex, 'price', e.target.value)}
                    className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)]">
                  Service Description
                </label>
                <textarea
                  placeholder="Describe this service in detail..."
                  value={service.description}
                  onChange={(e) => handleServiceChange(serviceIndex, 'description', e.target.value)}
                  rows={3}
                  className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent resize-vertical"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-[var(--text-secondary)]">
                    Key Features
                  </label>
                  <button
                    type="button"
                    onClick={() => addFeature(serviceIndex)}
                    className="text-xs px-2 py-1 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white rounded transition-colors"
                  >
                    + Add Feature
                  </button>
                </div>
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g., Responsive Design"
                      value={feature}
                      onChange={(e) => handleFeatureChange(serviceIndex, featureIndex, e.target.value)}
                      className="flex-1 p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
                    />
                    {service.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(serviceIndex, featureIndex)}
                        className="text-red-500 hover:text-red-700 px-2"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Service Areas Section */}
        <div className="space-y-4 p-4 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-secondary)]">
          <div className="flex justify-between items-center border-b border-[var(--border-secondary)] pb-2">
            <h3 className="text-lg font-semibold text-[var(--text-secondary)]">
              Service Areas
            </h3>
            <button
              type="button"
              onClick={addServiceArea}
              className="px-3 py-1 text-sm bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors"
            >
              + Add Area
            </button>
          </div>
          
          {formData.serviceAreas.map((area, areaIndex) => (
            <div key={areaIndex} className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-secondary)] space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-[var(--text-secondary)]">
                  Service Area {areaIndex + 1}
                </h4>
                {formData.serviceAreas.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeServiceArea(areaIndex)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--text-secondary)]">
                    City/Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., San Francisco"
                    value={area.city}
                    onChange={(e) => handleServiceAreaChange(areaIndex, 'city', e.target.value)}
                    className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--text-secondary)]">
                    Region/Area *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Bay Area & Silicon Valley"
                    value={area.region}
                    onChange={(e) => handleServiceAreaChange(areaIndex, 'region', e.target.value)}
                    className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)]">
                  Area Description
                </label>
                <textarea
                  placeholder="Describe your services in this area..."
                  value={area.description}
                  onChange={(e) => handleServiceAreaChange(areaIndex, 'description', e.target.value)}
                  rows={2}
                  className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent resize-vertical"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold shadow-md transition-colors duration-200"
        >
          {isLoading ? "Creating Landing Page..." : "Create Landing Page"}
        </button>
      </form>
    </div>
  );
};

export default CreateLandingPage;
