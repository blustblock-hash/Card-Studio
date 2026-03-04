
import { Card, LayoutVariant, ThemeType } from './types';

export const SAMPLE_CARDS: Card[] = [
  {
    id: 'sample-1',
    type: 'policy',
    content: {
      code: 'POL-2024-001',
      title: 'National Digital Transformation Policy',
      statement: 'To establish a unified digital framework that accelerates government service delivery and enhances citizen engagement through cutting-edge technology integration.',
      rationale: 'Current fragmented systems lead to inefficiencies and poor user experience for citizens.',
      outcomes: ['100% digital services by 2026', '30% reduction in operational costs', 'Enhanced data security'],
      stakeholders: ['Government Agencies', 'Citizens', 'Tech Providers'],
      horizon: 'Medium-term',
      owner: 'Ministry of Digital Affairs',
      pillar: 'Economic Growth'
    },
    labelOverrides: {},
    design: {
      theme: 'momh-executive',
      layoutVariant: 'A',
      density: 'comfortable',
      language: 'EN',
      aspectRatio: 'A4',
      showLogo: true,
      logoPosition: 'top-right',
      logoSize: 60,
      logoOpacity: 1,
      footer: {
        leftText: 'Confidential',
        centerText: 'Policy Document',
        rightText: 'v1.0',
        showPageStamp: true,
        pageStampText: 'APPROVED'
      },
      accentColor: '#0F172A'
    },
    tags: ['Policy', 'Digital'],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'sample-2',
    type: 'kpi',
    content: {
      name: 'Citizen Satisfaction Index',
      definition: 'A composite score measuring citizen satisfaction across all digital government touchpoints.',
      formula: '(Sum of positive responses / Total responses) * 100',
      unit: '%',
      baseline: '65%',
      target: '85%',
      source: 'Annual Citizen Survey',
      frequency: 'Annually',
      owner: 'Customer Experience Dept'
    },
    labelOverrides: {},
    design: {
      theme: 'glass-soft',
      layoutVariant: 'B',
      density: 'comfortable',
      language: 'EN',
      aspectRatio: '16:9',
      showLogo: true,
      logoPosition: 'top-right',
      logoSize: 60,
      logoOpacity: 1,
      footer: {
        leftText: 'Internal Use',
        centerText: 'KPI Report',
        rightText: '2024',
        showPageStamp: false,
        pageStampText: ''
      },
      accentColor: '#0EA5E9'
    },
    tags: ['KPI', 'Satisfaction'],
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];
