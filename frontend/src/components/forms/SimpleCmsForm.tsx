import React, { useState } from "react";
import { Save, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";

interface SimpleCmsFormProps {
  onSave: (data: FormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

interface FormData {
  businessName: string;
  templateId: string;
  githubUrl: string;
}

export const SimpleCmsForm: React.FC<SimpleCmsFormProps> = ({
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    templateId: "",
    githubUrl: "",
  });

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      errors.businessName = "Business name is required";
    }

    if (!formData.templateId.trim()) {
      errors.templateId = "Template ID is required";
    }

    if (!formData.githubUrl.trim()) {
      errors.githubUrl = "GitHub URL is required";
    } else if (!isValidGitHubUrl(formData.githubUrl)) {
      errors.githubUrl = "Please enter a valid GitHub repository URL";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate GitHub URL format
  const isValidGitHubUrl = (url: string): boolean => {
    const githubUrlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/;
    return githubUrlPattern.test(url);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
      return;
    }

    setSaveStatus("saving");
    try {
      await onSave(formData);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      console.error("Error creating landing page:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onCancel}
            className="btn-metallic px-4 py-2 rounded-lg flex items-center space-x-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            Create New Landing Page
          </h1>
          <p className="text-[var(--text-secondary)]">
            Enter your business details to generate a professional landing page from a Next.js template
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[var(--bg-secondary)] rounded-xl p-8 shadow-lg border border-[var(--border-primary)]">
          {/* Validation Errors Display */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h4 className="text-red-800 font-medium">Please fix the following errors:</h4>
              </div>
              <ul className="space-y-1">
                {Object.entries(validationErrors).map(([field, error]) => (
                  <li key={field} className="text-sm text-red-700">
                    • {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Success Message */}
          {saveStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h4 className="text-green-800 font-medium">Landing page created successfully!</h4>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Business Name *
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="e.g., Acme Professional Solutions"
                className={`w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] ${
                  validationErrors.businessName 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-[var(--border-secondary)] focus:border-[var(--accent-primary)]'
                }`}
                disabled={isLoading || saveStatus === "saving"}
              />
              {validationErrors.businessName && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.businessName}</p>
              )}
            </div>

            {/* Template ID */}
            <div>
              <label htmlFor="templateId" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Template ID *
              </label>
              <input
                type="text"
                id="templateId"
                name="templateId"
                value={formData.templateId}
                onChange={handleChange}
                placeholder="e.g., premium-business-template"
                className={`w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] ${
                  validationErrors.templateId 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-[var(--border-secondary)] focus:border-[var(--accent-primary)]'
                }`}
                disabled={isLoading || saveStatus === "saving"}
              />
              {validationErrors.templateId && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.templateId}</p>
              )}
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Identifier for the Next.js template to use
              </p>
            </div>

            {/* GitHub URL */}
            <div>
              <label htmlFor="githubUrl" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                GitHub Repository URL *
              </label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/nextjs-template"
                className={`w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] ${
                  validationErrors.githubUrl 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-[var(--border-secondary)] focus:border-[var(--accent-primary)]'
                }`}
                disabled={isLoading || saveStatus === "saving"}
              />
              {validationErrors.githubUrl && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.githubUrl}</p>
              )}
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                URL of the Next.js template repository to clone and customize
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-[var(--border-secondary)]">
            <button
              type="submit"
              disabled={isLoading || saveStatus === "saving"}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                saveStatus === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : saveStatus === "error"
                  ? "bg-red-600 hover:bg-red-700"
                  : saveStatus === "saving"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] shadow-lg hover:shadow-xl"
              }`}
            >
              <Save className="w-5 h-5" />
              <span>
                {saveStatus === "saving"
                  ? "Creating Landing Page..."
                  : saveStatus === "success"
                  ? "Created Successfully!"
                  : saveStatus === "error"
                  ? "Try Again"
                  : "Create Landing Page"}
              </span>
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-blue-800 font-medium mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Your landing page will be created with dynamic business name</li>
            <li>• The GitHub repository will be fetched and customized</li>
            <li>• A .env file will be generated with your configuration</li>
            <li>• Your page will be ready for deployment and customization</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
