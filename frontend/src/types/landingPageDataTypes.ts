export interface LandingPage {
  id: string;
  templateId: string;
  businessName: string;
  githubUrl?: string;
  createdAt: string;
  updatedAt: string;
  seoSettingsId?: string;
  businessContactId?: string;
  themeId?: string;
  // Backend returns capitalized field names
  BusinessContact?: BusinessContact;
  SEOSettings?: SEOSettings;
  Theme?: Theme;
  // Section relationships (Backend capitalized names)
  ServiceArea?: ServiceArea[]; // One-to-many
  SocialLink?: SocialLink;
  ImagesPool?: ImagePool;
  HeroSection?: HeroSection;
  AboutSection?: AboutSection;
  ServicesSection?: ServicesSection;
  GallerySection?: GallerySection;
  TestimonialsSection?: TestimonialsSection;
  FAQSection?: FAQSection;
  ServiceAreaSection?: ServiceAreaSection;
  BusinessDetailsSection?: BusinessDetailsSection;
  CompanyOverviewSection?: CompanyOverviewSection;
  ServiceHighlightsSection?: ServiceHighlightsSection;
  PreFooterSection?: PreFooterSection;
  FooterSection?: FooterSection;
  // Legacy field names for backwards compatibility (optional)
  businessContact?: BusinessContact;
  seoSettings?: SEOSettings;
  theme?: Theme;
  serviceAreas?: ServiceArea[];
  socialLink?: SocialLink;
  imagePool?: ImagePool;
  heroSection?: HeroSection;
  aboutSection?: AboutSection;
  servicesSection?: ServicesSection;
  gallerySection?: GallerySection;
  testimonialsSection?: TestimonialsSection;
  faqSection?: FAQSection;
  serviceAreaSection?: ServiceAreaSection;
  businessDetailsSection?: BusinessDetailsSection;
  companyOverviewSection?: CompanyOverviewSection;
  serviceHighlightsSection?: ServiceHighlightsSection;
  preFooterSection?: PreFooterSection;
  footerSection?: FooterSection;
}

interface BusinessContact {
  id: string;
  businessName: string;
  phone: string;
  emergencyPhone?: string;
  email: string;
  emergencyEmail?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  BusinessHour?: BusinessHour[];
}

interface BusinessHour {
  id: string;
  day: string;
  hours: string;
  isClosed: boolean;
  businessContactId: string;
}

interface SEOSettings {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  favicon?: string;
}

interface HeroSection {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
}

interface AboutSection {
  id: string;
  title: string;
  description: string;
  features: string[];
}

interface ServicesSection {
  id: string;
  title: string;
  description?: string;
}

interface Theme {
  id: string;
  primaryColor?: string;
  secondaryColor?: string;
}

interface ServiceArea {
  id: string;
  city: string;
  region: string;
  description: string;
}

interface SocialPlatform {
  id: string;
  platform: string;
  url: string;
  socialLinkId?: string;
}

interface SocialLink {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  socialPlatforms?: SocialPlatform[];
  // Legacy fields for backwards compatibility
  platform?: string;
  url?: string;
}

interface Image {
  id: string;
  imageId: string;
  title: string;
  altText: string;
  imageUrl: string;
  category?: string;
  description?: string;
  imagePoolId: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ImagePool {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  Image?: Image[]; // Backend uses capitalized field name
  images?: Image[]; // Legacy field for backwards compatibility
}

interface GallerySection {
  id: string;
  title: string;
  description?: string;
}

interface TestimonialsSection {
  id: string;
  title: string;
  description?: string;
}

interface FAQSection {
  id: string;
  title: string;
  description?: string;
}

interface ServiceAreaSection {
  id: string;
  title: string;
  description?: string;
}

interface BusinessDetailsSection {
  id: string;
  title: string;
  sections?: any[];
  contactForm?: any;
  map?: any;
}

interface CompanyOverviewSection {
  id: string;
  title: string;
  sections?: any[];
}

interface ServiceHighlightsSection {
  id: string;
  title: string;
}

interface PreFooterSection {
  id: string;
  description: string;
}

interface FooterSection {
  id: string;
  copyright: string;
}