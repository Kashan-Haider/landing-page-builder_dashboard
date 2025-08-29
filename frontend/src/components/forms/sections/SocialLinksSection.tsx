import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { TextInput } from "../TextInput";
import { getNestedValue } from "../formHelpers";

interface SocialLinksProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
}

export const SocialLinksSection: React.FC<SocialLinksProps> = ({
  formData,
  updateFormData,
}) => {
  const socialLinks = getNestedValue(formData, "businessData.socialLinks") || [];

  const addSocialLink = () => {
    const newLink = { platform: "", url: "" };
    updateFormData("businessData.socialLinks", [...socialLinks, newLink]);
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = socialLinks.filter((_: any, i: number) => i !== index);
    updateFormData("businessData.socialLinks", updatedLinks);
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    const updatedLinks = socialLinks.map((link: any, i: number) =>
      i === index ? { ...link, [field]: value } : link
    );
    updateFormData("businessData.socialLinks", updatedLinks);
  };

  const platformOptions = [
    "Facebook",
    "Instagram", 
    "Twitter",
    "LinkedIn",
    "YouTube"
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Social Media Links
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Add your business social media profiles
        </p>
      </div>

      <div className="space-y-4">
        {socialLinks.map((link: any, index: number) => (
          <div
            key={index}
            className="p-4 border rounded-lg space-y-4"
            style={{ borderColor: "var(--border-secondary)" }}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium" style={{ color: "var(--text-secondary)" }}>
                Social Link {index + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeSocialLink(index)}
                className="text-red-600 hover:text-red-800 p-1"
                title="Remove social link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                  Platform
                </label>
                <select
                  value={link.platform}
                  onChange={(e) => updateSocialLink(index, "platform", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-secondary)",
                    color: "var(--text-primary)",
                  }}
                >
                  <option value="">Select platform</option>
                  {platformOptions.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              <TextInput
                label="URL"
                value={link.url}
                onChange={(value) => updateSocialLink(index, "url", value)}
                placeholder="https://facebook.com/yourbusiness"
                type="url"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addSocialLink}
          className="w-full p-4 border-2 border-dashed rounded-lg flex items-center justify-center space-x-2 hover:bg-opacity-50 transition-colors"
          style={{
            borderColor: "var(--border-secondary)",
            color: "var(--text-muted)",
          }}
        >
          <Plus className="w-5 h-5" />
          <span>Add Social Media Link</span>
        </button>
      </div>
    </div>
  );
};
