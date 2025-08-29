import React, { useState } from "react";

interface Service {
  name: string;
  description: string;
  price: string;
  features: string[];
  image: File | null;
}

interface ServiceArea {
  city: string;
  region: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image: File | null;
}

interface FormData {
  businessName: string;
  industry: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  websiteUrl: string;
  logo: File | null;
  heroImage: File | null;
  aboutImage: File | null;
  galleryImages: { altText: string; file: File | null }[];
  services: Service[];
  serviceAreas: ServiceArea[];
  testimonials: Testimonial[];
}

const BusinessForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    industry: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    websiteUrl: "",
    logo: null,
    heroImage: null,
    aboutImage: null,
    galleryImages: [
      { altText: "", file: null },
      { altText: "", file: null },
      { altText: "", file: null },
    ],
    services: [],
    serviceAreas: [],
    testimonials: [],
  });

  // handle basic field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // file change (logo, hero, about)
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof FormData
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [key]: file }));
  };

  // gallery change
  const handleGalleryChange = (
    index: number,
    field: "altText" | "file",
    value: any
  ) => {
    setFormData((prev) => {
      const updated = [...prev.galleryImages];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, galleryImages: updated };
    });
  };

  // services
  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        { name: "", description: "", price: "", features: [], image: null },
      ],
    }));
  };

  const updateService = (index: number, field: keyof Service, value: any) => {
    setFormData((prev) => {
      const updated = [...prev.services];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, services: updated };
    });
  };

  // service areas
  const addServiceArea = () => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: [
        ...prev.serviceAreas,
        { city: "", region: "", description: "" },
      ],
    }));
  };

  const updateServiceArea = (
    index: number,
    field: keyof ServiceArea,
    value: any
  ) => {
    setFormData((prev) => {
      const updated = [...prev.serviceAreas];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, serviceAreas: updated };
    });
  };

  // testimonials
  const addTestimonial = () => {
    setFormData((prev) => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        { name: "", role: "", company: "", text: "", rating: 5, image: null },
      ],
    }));
  };

  const updateTestimonial = (
    index: number,
    field: keyof Testimonial,
    value: any
  ) => {
    setFormData((prev) => {
      const updated = [...prev.testimonials];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, testimonials: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted ✅", formData);
    // TODO: send to backend/file storage
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-[var(--bg-secondary)] rounded-2xl shadow-lg p-8 space-y-6 border border-[var(--border-primary)]"
      >
        <h2 className="text-2xl font-bold text-[var(--text-secondary)]">
          Business Information
        </h2>

        {/* --- core info --- */}
        <input
          type="text"
          name="businessName"
          placeholder="Business Name"
          value={formData.businessName}
          onChange={handleChange}
          className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)] mb-3"
          required
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)] mb-3"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)] mb-3"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)] mb-3"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)]"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)]"
            required
          />
        </div>
        <input
          type="url"
          name="websiteUrl"
          placeholder="Website URL"
          value={formData.websiteUrl}
          onChange={handleChange}
          className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)] mt-3"
          required
        />

        {/* logo/hero/about */}
        <div className="space-y-3">
          <label>Logo *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "logo")}
            required
          />

          <label>Hero Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "heroImage")}
            required
          />

          <label>About Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "aboutImage")}
            required
          />
        </div>

        {/* gallery */}
        <div>
          <h3 className="font-semibold mt-6">Gallery Images (min 3)</h3>
          {formData.galleryImages.map((img, i) => (
            <div key={i} className="mb-3">
              <input
                type="text"
                placeholder="Alt text"
                value={img.altText}
                onChange={(e) =>
                  handleGalleryChange(i, "altText", e.target.value)
                }
                className="w-full p-2 rounded-lg bg-[var(--bg-tertiary)] mb-1"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleGalleryChange(i, "file", e.target.files?.[0] || null)
                }
                required
              />
            </div>
          ))}
        </div>

        {/* services */}
        <div>
          <h3 className="font-semibold mt-6">Services</h3>
          {formData.services.map((srv, i) => (
            <div
              key={i}
              className="mb-4 p-3 bg-[var(--bg-tertiary)] rounded-lg"
            >
              <input
                type="text"
                placeholder="Service Name"
                value={srv.name}
                onChange={(e) => updateService(i, "name", e.target.value)}
                className="w-full p-2 rounded mb-2"
                required
              />
              <textarea
                placeholder="Description"
                value={srv.description}
                onChange={(e) =>
                  updateService(i, "description", e.target.value)
                }
                className="w-full p-2 rounded mb-2"
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={srv.price}
                onChange={(e) => updateService(i, "price", e.target.value)}
                className="w-full p-2 rounded mb-2"
              />
              <label>Service Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  updateService(i, "image", e.target.files?.[0] || null)
                }
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addService}
            className="mt-2 py-2 px-4 bg-[var(--accent-primary)] rounded"
          >
            + Add Service
          </button>
        </div>

        {/* service areas */}
        <div>
          <h3 className="font-semibold mt-6">Service Areas</h3>
          {formData.serviceAreas.map((area, i) => (
            <div
              key={i}
              className="mb-4 p-3 bg-[var(--bg-tertiary)] rounded-lg"
            >
              <input
                type="text"
                placeholder="City"
                value={area.city}
                onChange={(e) => updateServiceArea(i, "city", e.target.value)}
                className="w-full p-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Region"
                value={area.region}
                onChange={(e) => updateServiceArea(i, "region", e.target.value)}
                className="w-full p-2 rounded mb-2"
              />
              <textarea
                placeholder="Description"
                value={area.description}
                onChange={(e) =>
                  updateServiceArea(i, "description", e.target.value)
                }
                className="w-full p-2 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addServiceArea}
            className="mt-2 py-2 px-4 bg-[var(--accent-primary)] rounded"
          >
            + Add Service Area
          </button>
        </div>

        {/* testimonials */}
        <div>
          <h3 className="font-semibold mt-6">Testimonials</h3>
          {formData.testimonials.map((t, i) => (
            <div
              key={i}
              className="mb-4 p-3 bg-[var(--bg-tertiary)] rounded-lg"
            >
              <input
                type="text"
                placeholder="Name"
                value={t.name}
                onChange={(e) => updateTestimonial(i, "name", e.target.value)}
                className="w-full p-2 rounded mb-2"
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={t.role}
                onChange={(e) => updateTestimonial(i, "role", e.target.value)}
                className="w-full p-2 rounded mb-2"
                required
              />
              <input
                type="text"
                placeholder="Company"
                value={t.company}
                onChange={(e) =>
                  updateTestimonial(i, "company", e.target.value)
                }
                className="w-full p-2 rounded mb-2"
                required
              />
              <textarea
                placeholder="Testimonial text"
                value={t.text}
                onChange={(e) => updateTestimonial(i, "text", e.target.value)}
                className="w-full p-2 rounded mb-2"
                required
              />
              <input
                type="number"
                min={1}
                max={5}
                value={t.rating}
                onChange={(e) =>
                  updateTestimonial(i, "rating", parseInt(e.target.value))
                }
                className="w-full p-2 rounded mb-2"
                required
              />
              <label>Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  updateTestimonial(i, "image", e.target.files?.[0] || null)
                }
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTestimonial}
            className="mt-2 py-2 px-4 bg-[var(--accent-primary)] rounded"
          >
            + Add Testimonial
          </button>
        </div>

        {/* submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white font-semibold shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BusinessForm;
