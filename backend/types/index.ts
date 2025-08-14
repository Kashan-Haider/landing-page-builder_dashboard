export interface BusinessHour {
  day: string;
  hours: string;
  isClosed: boolean;
}

export interface BusinessContact {
  id?: string;
  businessName: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  emergencyEmail: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  businessHours?: BusinessHour[];
}

export interface SEOSettings {
  id?: string;
  title: string;
  description: string;
  keywords: string[];
}

export interface Theme {
  id?: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface CtaButton {
  id?: string;
  label: string;
  href: string;
}

export interface ServiceArea {
  id?: string;
  city: string;
  region: string;
  description: string;
  ctaButtonId?: string;
  ctaButton?: CtaButton;
}

export interface SocialPlatform {
  id?: string;
  platform: string;
  url: string;
  socialLinkId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SocialLink {
  id?: string;
  name: string;
  socialPlatforms?: SocialPlatform[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Image {
  id?: string;
  imageId: string;
  title: string;
  altText: string;
  imageUrl: string;
  category?: string;
  description?: string;
  imagePoolId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ImagesPool {
  id?: string;
  name: string;
  description?: string;
  images?: Image[];
  createdAt?: string;
  updatedAt?: string;
}

export interface HeroSection {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface AboutSection {
  id?: string;
  title: string;
  description: string;
  features: string[];
}

export interface ServicesSection {
  id?: string;
  title: string;
  description: string;
}

export interface GallerySection {
  id?: string;
  title: string;
  description: string;
}

export interface TestimonialsSection {
  id?: string;
  title: string;
  description: string;
}

export interface FAQSection {
  id?: string;
  title: string;
  description: string;
}

export interface ServiceAreaSection {
  id?: string;
  title: string;
  description: string;
}

export interface BusinessDetailSubSection {
  title: string;
  description: string;
  ctaTitle: string;
}

export interface BusinessContactForm {
  title: string;
}

export interface MapSettings {
  latitude: number;
  longitude: number;
  locationName: string;
}

export interface BusinessDetailsSection {
  id?: string;
  title: string;
  sections?: BusinessDetailSubSection[];
  contactForm?: BusinessContactForm;
  map?: MapSettings;
}

export interface CompanyOverviewSubSection {
  title: string;
  description: string;
}

export interface CompanyOverviewSection {
  id?: string;
  title: string;
  sections?: CompanyOverviewSubSection[];
}

export interface ServiceHighlightsSection {
  id?: string;
  title: string;
}

export interface PreFooterSection {
  id?: string;
  description: string;
}

export interface FooterSection {
  id?: string;
  copyright: string;
}

export interface CreateLandingPageData {
  templateId: string;
  businessName: string;
  githubUrl?: string;
  
  // Relations - either provide ID or full object
  businessContact?: BusinessContact;
  businessContactId?: string;
  seoSettings?: SEOSettings;
  seoSettingsId?: string;
  theme?: Theme;
  themeId?: string;
  
  // Required sections
  serviceArea: ServiceArea;
  socialLink: SocialLink;
  image: ImagesPool;
  heroSection: HeroSection;
  aboutSection: AboutSection;
  servicesSection: ServicesSection;
  gallerySection: GallerySection;
  testimonialsSection: TestimonialsSection;
  faqSection: FAQSection;
  serviceAreaSection: ServiceAreaSection;
  businessDetailsSection: BusinessDetailsSection;
  companyOverviewSection: CompanyOverviewSection;
  serviceHighlightsSection: ServiceHighlightsSection;
  preFooterSection: PreFooterSection;
  footerSection: FooterSection;
}

export interface WebhookPayload {
  templateId: string;
  githubUrl?: string;
  event: 'created' | 'updated';
  timestamp: string;
}

export interface WebhookConfig {
  id?: string;
  name: string;
  url: string;
  events: ('created' | 'updated')[];
  isActive?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  details?: any;
}
