
export enum AppTab {
  HOME = 'home',
  SERVICES = 'services',
  PRODUCTS = 'products',
  PRICING = 'pricing',
  HOW_IT_WORKS = 'how-it-works',
  CASE_EXAMPLE = 'case-example',
  TALK_TO_EXPERT = 'talk-to-expert',
  RESOURCES = 'resources'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  outcome: string;
  features: string[];
  imageUrl: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: string;
}
