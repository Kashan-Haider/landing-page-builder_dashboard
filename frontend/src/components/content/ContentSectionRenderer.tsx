import React from "react";

interface CTAButton {
  label: string;
  href: string;
  style?: string;
}

interface AboutSection {
  title: string;
  description: string;
  features?: string[];
  ctaButton?: CTAButton;
}

interface Service {
  name: string;
  description: string;
  features?: string[];
  price?: string;
}

interface ServicesSection {
  title: string;
  description: string;
  services: Service[];
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

interface TestimonialsSection {
  title: string;
  description: string;
  testimonials: Testimonial[];
}

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

interface FAQSection {
  title: string;
  description: string;
  questions: FAQ[];
}

interface GallerySection {
  title: string;
  description: string;
}

interface ContactSection {
  title: string;
  description: string;
  showMap?: boolean;
}

interface FooterSection {
  copyright: string;
  links: { text: string; href: string }[];
}

interface ContentSectionRendererProps {
  sectionKey: string;
  sectionValue: any;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-4 h-4 ${
          star <= rating ? "text-yellow-400" : "text-gray-600"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const AboutSectionRenderer: React.FC<{ data: AboutSection }> = ({ data }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
      {data.title}
    </h3>
    <p style={{ color: "var(--text-secondary)" }}>{data.description}</p>
    {data.features && data.features.length > 0 && (
      <div>
        <h4
          className="font-semibold mb-2"
          style={{ color: "var(--text-tertiary)" }}
        >
          Features:
        </h4>
        <ul className="grid grid-cols-2 gap-2">
          {data.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--accent-primary)" }}
              />
              <span style={{ color: "var(--text-secondary)" }}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
    {data.ctaButton && (
      <div className="pt-3">
        <button className="btn-metallic px-4 py-2 rounded-lg font-medium">
          {data.ctaButton.label}
        </button>
      </div>
    )}
  </div>
);

const ServicesSectionRenderer: React.FC<{ data: ServicesSection }> = ({
  data,
}) => (
  <div className="space-y-6">
    <div>
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {data.title}
      </h3>
      <p style={{ color: "var(--text-secondary)" }}>{data.description}</p>
    </div>
    <div className="grid gap-4">
      {data.services.map((service, index) => (
        <div key={index} className="card-metallic p-4">
          <div className="flex justify-between items-start mb-3">
            <h4
              className="font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {service.name}
            </h4>
            {service.price && (
              <span className="silver-text font-bold">{service.price}</span>
            )}
          </div>
          <p className="mb-3" style={{ color: "var(--text-secondary)" }}>
            {service.description}
          </p>
          {service.features && service.features.length > 0 && (
            <ul className="space-y-1">
              {service.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--accent-primary)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-tertiary)" }}
                  >
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
);

const TestimonialsSectionRenderer: React.FC<{ data: TestimonialsSection }> = ({
  data,
}) => (
  <div className="space-y-6">
    <div>
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {data.title}
      </h3>
      <p style={{ color: "var(--text-secondary)" }}>{data.description}</p>
    </div>
    <div className="space-y-4">
      {data.testimonials.map((testimonial, index) => (
        <div key={index} className="card-metallic p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4
                className="font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {testimonial.name}
              </h4>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                {testimonial.role} at {testimonial.company}
              </p>
            </div>
            <StarRating rating={testimonial.rating} />
          </div>
          <p style={{ color: "var(--text-secondary)" }}>"{testimonial.text}"</p>
        </div>
      ))}
    </div>
  </div>
);

const FAQSectionRenderer: React.FC<{ data: FAQSection }> = ({ data }) => (
  <div className="space-y-6">
    <div>
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {data.title}
      </h3>
      <p style={{ color: "var(--text-secondary)" }}>{data.description}</p>
    </div>
    <div className="space-y-3">
      {data.questions.map((faq, index) => (
        <div key={index} className="card-metallic p-4">
          <h4
            className="font-semibold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {faq.question}
          </h4>
          <p style={{ color: "var(--text-secondary)" }}>{faq.answer}</p>
          {faq.category && (
            <span
              className="inline-block mt-2 px-2 py-1 text-xs rounded"
              style={{
                backgroundColor: "var(--bg-quaternary)",
                color: "var(--text-muted)",
              }}
            >
              {faq.category}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

const GallerySectionRenderer: React.FC<{ data: GallerySection }> = ({
  data,
}) => (
  <div className="space-y-4">
    <div>
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {data.title}
      </h3>
      <p style={{ color: "var(--text-secondary)" }}>{data.description}</p>
    </div>
  </div>
);

const ContactSectionRenderer: React.FC<{ data: ContactSection }> = ({
  data,
}) => (
  <div className="space-y-4">
    <div>
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {data.title}
      </h3>
      <p style={{ color: "var(--text-secondary)" }}>{data.description}</p>
    </div>
  </div>
);

const FooterSectionRenderer: React.FC<{ data: FooterSection }> = ({ data }) => (
  <div className="space-y-4">
    <p style={{ color: "var(--text-secondary)" }}>{data.copyright}</p>
    <div>
      <h4
        className="font-semibold mb-2"
        style={{ color: "var(--text-tertiary)" }}
      >
        Footer Links:
      </h4>
      <div className="flex flex-wrap gap-4">
        {data.links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="hover:underline"
            style={{ color: "var(--accent-primary)" }}
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  </div>
);

export const ContentSectionRenderer: React.FC<ContentSectionRendererProps> = ({
  sectionKey,
  sectionValue,
}) => {
  if (!sectionValue || typeof sectionValue !== "object") {
    return (
      <div className="card-metallic p-4">
        <h5
          className="font-medium mb-2"
          style={{ color: "var(--text-tertiary)" }}
        >
          {sectionKey.replace(/([A-Z])/g, " $1").trim()} Section
        </h5>
        <p style={{ color: "var(--text-muted)" }}>No content available</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (sectionKey) {
      case "about":
        return <AboutSectionRenderer data={sectionValue as AboutSection} />;
      case "services":
        return (
          <ServicesSectionRenderer data={sectionValue as ServicesSection} />
        );
      case "testimonials":
        return (
          <TestimonialsSectionRenderer
            data={sectionValue as TestimonialsSection}
          />
        );
      case "faq":
        return <FAQSectionRenderer data={sectionValue as FAQSection} />;
      case "gallery":
        return <GallerySectionRenderer data={sectionValue as GallerySection} />;
      case "contact":
        return <ContactSectionRenderer data={sectionValue as ContactSection} />;
      case "footer":
        return <FooterSectionRenderer data={sectionValue as FooterSection} />;
      default:
        // Fallback for unknown sections - render as formatted JSON
        return (
          <div className="space-y-3">
            {Object.entries(sectionValue).map(([key, value]) => (
              <div key={key}>
                <span
                  className="font-medium capitalize"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </span>
                <div className="mt-1">
                  {typeof value === "string" ? (
                    <p style={{ color: "var(--text-secondary)" }}>{value}</p>
                  ) : Array.isArray(value) ? (
                    <ul className="space-y-1">
                      {value.map((item, index) => (
                        <li
                          key={index}
                          style={{ color: "var(--text-secondary)" }}
                        >
                          •{" "}
                          {typeof item === "object"
                            ? JSON.stringify(item, null, 2)
                            : String(item)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <pre
                      className="text-sm overflow-x-auto"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="card-metallic p-4">
      <h5 className="text-sm font-medium mb-4 silver-text uppercase tracking-wider">
        {sectionKey.replace(/([A-Z])/g, " $1").trim()} Section
      </h5>
      {renderContent()}
    </div>
  );
};
