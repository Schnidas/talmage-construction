export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface BeforeAfterPair {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface Testimonial {
  author: string;
  review: string;
  rating: number;
  featured?: boolean;
}

export interface EstimateRequest {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  serviceArea: string;
  details: string;
  timeframe: string;
}
