
import { ServiceItem, ProductItem } from './types';

export const COLORS = {
  primary: '#1e293b',
  secondary: '#64748b',
  accent: '#3b82f6',
  neutral: '#f8fafc',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'cost-control',
    title: 'BIM-Based Cost & Quantity Control',
    description:
      'For clients who already have a Revit model. We standardize your existing digital assets to ensure every data point is accurate and construction-ready.',
    features: [
      'Model standardization for reliable data',
      'Automated quantity extraction',
      'Real-time cost impact tracking for design changes',
    ],
    outcome: 'Controlled budgets and fewer construction surprises.',
    imageUrl: '/services/cost-control.png',
  },
  {
    id: 'planning-boq',
    title: 'BIM-Led Planning & BOQs',
    description:
      'For projects with only 2D drawings or sketches. We build a specialized planning model strictly for financial and quantity validation.',
    features: [
      'Creation of planning-level digital models',
      'Extraction of accurate Bills of Quantities (BOQs)',
      'Early-stage cost clarity before ground-breaking',
    ],
    outcome: 'Cost certainty before you commit to execution.',
    imageUrl: '/services/planning-boq.png',
  },
  {
    id: 'construction-cost',
    title: 'Construction Phase Cost Control',
    description:
      'Ongoing support during active construction to validate variations and track changes as they happen on-site.',
    features: [
      'Validation of quantity variations on-site',
      'Strategic tracking of scope changes',
      'Data-driven decision support for project principals',
    ],
    outcome: 'Fewer disputes and significantly smoother construction phases.',
    imageUrl: '/services/construction-phase.png',
  },
];



export const PRODUCTS: ProductItem[] = [
  {
    id: 'revit-auto',
    name: 'Revit Automation Tools',
    category: 'Software Support',
    description: 'Proprietary utilities designed to speed up repetitive modeling tasks for internal BIM teams.'
  },
  {
    id: 'qto-tools',
    name: 'Quantity Takeoff Tools',
    category: 'Analytics',
    description: 'Advanced scripts for rock-solid quantity extraction from complex architectural models.'
  },
  {
    id: 'bim-templates',
    name: 'BIM Parameter Templates',
    category: 'Standards',
    description: 'Pre-configured Revit parameters optimized for high-precision cost control workflows.'
  },
  {
    id: 'excel-cost',
    name: 'Cost Management Playbooks',
    category: 'Templates',
    description: 'Strategic templates linking BIM data to professional cost management worksheets.'
  }
];
