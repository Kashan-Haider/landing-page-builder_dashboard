export interface LandingPage {
  id: string;
  templateId: string;
  businessName: string;
  githubUrl?: string;
  status: "draft" | "published" | "archived";
  content: LandingPageContent;
  seoData: SEOData;
  themeData: ThemeData;
  businessData: BusinessData;
  images: Image[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface LandingPageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaButtons?: Array<{
      label: string;
      href: string;
      style: "primary" | "secondary";
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
  canonicalUrl: string;
  isIndex: boolean;
  focusedKeywords: string[];
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
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
}

export interface FormState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}
