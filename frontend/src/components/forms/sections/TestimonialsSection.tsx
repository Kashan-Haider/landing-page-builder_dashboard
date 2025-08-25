import React from "react";
import { TextInput } from "../TextInput";
import { getNestedValue } from "../formHelpers";
import { Plus, X } from "lucide-react";

interface TestimonialsSectionProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  formData,
  updateFormData,
}) => {
  const testimonials = getNestedValue(formData, "content.testimonials.testimonials") || [];

  const addTestimonial = () => {
    const newTestimonials = [...testimonials, {
      name: "",
      role: "",
      company: "",
      text: "",
      rating: 5,
    }];
    updateFormData("content.testimonials.testimonials", newTestimonials);
  };

  const updateTestimonial = (index: number, field: string, value: any) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    updateFormData("content.testimonials.testimonials", newTestimonials);
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = testimonials.filter((_: any, i: number) => i !== index);
    updateFormData("content.testimonials.testimonials", newTestimonials);
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Testimonials Section
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Show what your customers say about you
        </p>
      </div>

      <TextInput
        label="Testimonials Title"
        value={getNestedValue(formData, "content.testimonials.title")}
        onChange={(value) => updateFormData("content.testimonials.title", value)}
        placeholder="What Our Clients Say"
        required
      />

      <TextInput
        label="Testimonials Description"
        value={getNestedValue(formData, "content.testimonials.description")}
        onChange={(value) => updateFormData("content.testimonials.description", value)}
        placeholder="Hear from our satisfied customers"
        multiline
        required
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium" style={{ color: "var(--text-secondary)" }}>
            Testimonials
          </h4>
          <button
            type="button"
            onClick={addTestimonial}
            className="flex items-center space-x-2 px-3 py-1 text-sm rounded-md transition-colors"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "var(--text-on-accent)",
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>

        <div className="space-y-4">
          {testimonials.map((testimonial: any, index: number) => (
            <div
              key={index}
              className="p-4 rounded-lg border space-y-4"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-secondary)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Testimonial {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeTestimonial(index)}
                  className="p-1 rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextInput
                  label="Name"
                  value={testimonial.name || ""}
                  onChange={(value) => updateTestimonial(index, "name", value)}
                  placeholder="John Doe"
                  required
                />
                <TextInput
                  label="Role"
                  value={testimonial.role || ""}
                  onChange={(value) => updateTestimonial(index, "role", value)}
                  placeholder="CEO"
                  required
                />
                <TextInput
                  label="Company"
                  value={testimonial.company || ""}
                  onChange={(value) => updateTestimonial(index, "company", value)}
                  placeholder="Acme Corp"
                  required
                />
              </div>

              <TextInput
                label="Testimonial Text"
                value={testimonial.text || ""}
                onChange={(value) => updateTestimonial(index, "text", value)}
                placeholder="What they said about your service..."
                multiline
                required
              />

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Rating
                </label>
                <select
                  value={testimonial.rating || 5}
                  onChange={(e) => updateTestimonial(index, "rating", parseInt(e.target.value))}
                  className="px-4 py-2 metallic-bg rounded-lg border transition-all duration-300 outline-none"
                  style={{
                    color: "var(--text-primary)",
                    borderColor: "var(--border-secondary)",
                    backgroundColor: "var(--bg-secondary)",
                  }}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                  <option value={3}>⭐⭐⭐ (3 stars)</option>
                  <option value={2}>⭐⭐ (2 stars)</option>
                  <option value={1}>⭐ (1 star)</option>
                </select>
              </div>
            </div>
          ))}

          {testimonials.length === 0 && (
            <div
              className="text-center py-8 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              No testimonials added yet. Click "Add Testimonial" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
