import React from "react";
import type {
  LandingPage,
  BusinessOverviewContent,
} from "../../../types/landingPageDataTypes";
import { FieldDisplay } from "../../shared/FieldDisplay";

interface ContentDisplayProps {
  content: LandingPage["content"];
}

// Simple CTA Button Component
const CTAButton: React.FC<{ label: string; href: string }> = ({
  label,
  href,
}) => (
  <div
    className="flex items-center gap-3 p-3 rounded-lg"
    style={{ backgroundColor: "var(--bg-quaternary)" }}
  >
    <span style={{ color: "var(--text-primary)" }} className="font-medium">
      {label}
    </span>
    <span style={{ color: "var(--text-muted)" }}>→</span>
    <span style={{ color: "var(--accent-primary)" }}>{href}</span>
  </div>
);

// Hero Section Renderer
const HeroSection: React.FC<{ hero: LandingPage["content"]["hero"] }> = ({
  hero,
}) => {
  if (!hero) return null;

  return (
    <ContentSection title="Hero Section">
      <div className="space-y-4">
        <FieldDisplay label="Title" value={hero.title} />
        <FieldDisplay label="Subtitle" value={hero.subtitle} />
        <FieldDisplay label="Description" value={hero.description} />
        {hero.ctaButton && <CTAButton {...hero.ctaButton} />}
      </div>
    </ContentSection>
  );
};

// About Section Renderer
const AboutSection: React.FC<{ about: LandingPage["content"]["about"] }> = ({
  about,
}) => {
  if (!about) return null;

  return (
    <ContentSection title="About Section">
      <div className="space-y-4">
        <FieldDisplay label="Title" value={about.title} />
        <FieldDisplay label="Description" value={about.description} />

        {about.features && about.features.length > 0 && (
          <div>
            <h6
              className="font-medium mb-2"
              style={{ color: "var(--text-tertiary)" }}
            >
              Features:
            </h6>
            <ul className="space-y-1">
              {about.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--accent-primary)" }}
                  />
                  <span style={{ color: "var(--text-secondary)" }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {about.ctaButton && <CTAButton {...about.ctaButton} />}
      </div>
    </ContentSection>
  );
};

// Business Overview Section Renderer
const BusinessOverviewSection: React.FC<{
  businessOverview: LandingPage["content"]["businessOverview"];
}> = ({ businessOverview }) => {
  if (!businessOverview?.content || businessOverview.content.length === 0)
    return null;

  return (
    <ContentSection title="Business Overview Section">
      <div className="space-y-4">
        {businessOverview.content.map(
          (item: BusinessOverviewContent, index: number) => (
            <div key={index} className="border-l-2 border-purple-400 pl-4">
              <h6
                className="font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {item.heading}
              </h6>
              <p className="mb-3" style={{ color: "var(--text-secondary)" }}>
                {item.description}
              </p>
              {item.ctaButton && <CTAButton {...item.ctaButton} />}
            </div>
          )
        )}
      </div>
    </ContentSection>
  );
};

// Services Section Renderer
const ServicesSection: React.FC<{
  services: LandingPage["content"]["services"];
}> = ({ services }) => {
  if (!services) return null;

  return (
    <ContentSection title="Services Section">
      <div className="space-y-4">
        <FieldDisplay label="Title" value={services.title} />
        <FieldDisplay label="Description" value={services.description} />

        {services.services && services.services.length > 0 && (
          <div>
            <h6
              className="font-medium mb-3"
              style={{ color: "var(--text-tertiary)" }}
            >
              Services ({services.services.length}):
            </h6>
            <div className="space-y-3">
              {services.services.map((service, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3"
                  style={{ borderColor: "var(--border-primary)" }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h6
                      className="font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {service.name}
                    </h6>
                    {service.price && (
                      <span
                        className="text-sm font-bold"
                        style={{ color: "var(--accent-primary)" }}
                      >
                        {service.price}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {service.description}
                  </p>
                  {service.features && service.features.length > 0 && (
                    <ul className="text-xs space-y-1">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-1">
                          <div
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: "var(--accent-primary)" }}
                          />
                          <span style={{ color: "var(--text-muted)" }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ContentSection>
  );
};

// Generic Section Renderer for simpler sections
const GenericSection: React.FC<{ title: string; data: any }> = ({
  title,
  data,
}) => {
  if (!data || typeof data !== "object") return null;

  return (
    <ContentSection title={title}>
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => {
          if (key === "testimonials" && Array.isArray(value)) {
            return (
              <div key={key}>
                <h6
                  className="font-medium mb-2"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Testimonials ({value.length}):
                </h6>
                <div className="space-y-2">
                  {value.map((testimonial: any, index: number) => (
                    <div
                      key={index}
                      className="text-sm border-l-2 border-gray-400 pl-3"
                    >
                      <p style={{ color: "var(--text-secondary)" }}>
                        "{testimonial.text}"
                      </p>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        — {testimonial.name}, {testimonial.role} at{" "}
                        {testimonial.company}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (key === "questions" && Array.isArray(value)) {
            return (
              <div key={key}>
                <h6
                  className="font-medium mb-2"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  FAQ ({value.length}):
                </h6>
                <div className="space-y-2">
                  {value.map((faq: any, index: number) => (
                    <div key={index} className="text-sm">
                      <p
                        className="font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Q: {faq.question}
                      </p>
                      <p style={{ color: "var(--text-secondary)" }}>
                        A: {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (Array.isArray(value)) {
            return (
              <FieldDisplay
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={`${value.length} items`}
              />
            );
          }

          if (typeof value === "string") {
            return (
              <FieldDisplay
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
              />
            );
          }

          return null;
        })}
      </div>
    </ContentSection>
  );
};

// Reusable Content Section Wrapper
const ContentSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div>
    <h5 className="text-sm font-medium mb-3 silver-text uppercase tracking-wider">
      {title}
    </h5>
    <div className="card-metallic p-4">{children}</div>
  </div>
);

export const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  if (!content) return null;

  return (
    <div>
      <h4 className="text-lg font-semibold silver-text mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Page Content
      </h4>

      <div className="space-y-6">
        <HeroSection hero={content.hero} />
        <AboutSection about={content.about} />
        <BusinessOverviewSection businessOverview={content.businessOverview} />
        <ServicesSection services={content.services} />
        <GenericSection title="Gallery Section" data={content.gallery} />
        <GenericSection
          title="Testimonials Section"
          data={content.testimonials}
        />
        <GenericSection title="FAQ Section" data={content.faq} />
        <GenericSection title="Contact Section" data={content.contact} />
        <GenericSection title="Footer Section" data={content.footer} />
      </div>
    </div>
  );
};
