export interface LandingPage {
  id: string;
  templateId: string;
  businessName: string;
  githubUrl?: string;
  status: 'draft' | 'published' | 'archived';
  content: LandingPageContent;
  seoData: SEOData;
  themeData: ThemeData;
  businessData: BusinessData;
  images: Image[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface LandingPageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaButtons?: Array<{
      label: string;
      href: string;
      style: 'primary' | 'secondary';
    }>;
  };
  about: {
    title: string;
    description: string;
    features: string[];
    ctaButton?: {
      label: string;
      href: string;
    };
  };
  services: {
    title: string;
    description: string;
    services: Array<{
      name: string;
      description: string;
      features: string[];
      price?: string;
    }>;
  };
  gallery: {
    title: string;
    description: string;
    categories: string[];
  };
  testimonials: {
    title: string;
    description: string;
    testimonials: Array<{
      name: string;
      role: string;
      company: string;
      text: string;
      rating?: number;
    }>;
  };
  faq: {
    title: string;
    description: string;
    questions: Array<{
      question: string;
      answer: string;
      category: string;
    }>;
  };
  contact: {
    title: string;
    description: string;
    showMap?: boolean;
  };
  footer: {
    copyright: string;
    links?: Array<{
      text: string;
      href: string;
    }>;
  };
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  favicon?: string;
  ogImage?: string;
}

export interface ThemeData {
  primaryColor: string;
  secondaryColor: string;
  fontFamily?: string;
  logoUrl?: string;
}

export interface BusinessData {
  phone: string;
  email: string;
  emergencyPhone?: string;
  emergencyEmail?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  hours: Array<{
    day: string;
    hours: string;
    isClosed: boolean;
  }>;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  serviceAreas: Array<{
    city: string;
    region: string;
    description: string;
  }>;
}

export interface Image {
  id: string;
  landingPageId: string;
  title: string;
  altText: string;
  imageUrl: string;
  category: string;
  createdAt: Date;
}

export interface CreateLandingPageData {
  templateId: string;
  businessName: string;
  githubUrl?: string;
  content: LandingPageContent;
  seoData: SEOData;
  themeData: ThemeData;
  businessData: BusinessData;
}

export interface UpdateLandingPageData {
  templateId?: string;
  businessName?: string;
  githubUrl?: string;
  status?: 'draft' | 'published' | 'archived';
  content?: Partial<LandingPageContent>;
  seoData?: Partial<SEOData>;
  themeData?: Partial<ThemeData>;
  businessData?: Partial<BusinessData>;
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
