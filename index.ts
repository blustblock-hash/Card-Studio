
import { ThemeType } from '../types';

export interface ThemeTokens {
  background: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  shadow: string;
  accent: string;
  glass?: boolean;
}

export const THEMES: Record<ThemeType, ThemeTokens> = {
  'momh-executive': {
    background: '#F8FAFC',
    cardBg: '#FFFFFF',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    accent: '#0F172A',
  },
  'minimal-white': {
    background: '#FFFFFF',
    cardBg: '#FFFFFF',
    textPrimary: '#18181B',
    textSecondary: '#71717A',
    border: '#F4F4F5',
    shadow: 'none',
    accent: '#18181B',
  },
  'glass-soft': {
    background: '#F1F5F9',
    cardBg: 'rgba(255, 255, 255, 0.7)',
    textPrimary: '#1E293B',
    textSecondary: '#475569',
    border: 'rgba(255, 255, 255, 0.5)',
    shadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)',
    accent: '#1E293B',
    glass: true,
  },
  'print-grayscale': {
    background: '#FFFFFF',
    cardBg: '#FFFFFF',
    textPrimary: '#000000',
    textSecondary: '#333333',
    border: '#000000',
    shadow: 'none',
    accent: '#000000',
  },
  'deep-navy': {
    background: '#0F172A',
    cardBg: '#1E293B',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: '#334155',
    shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    accent: '#38BDF8',
  },
  'royal-gold': {
    background: '#FDFCF0',
    cardBg: '#FFFFFF',
    textPrimary: '#422006',
    textSecondary: '#713F12',
    border: '#FEF08A',
    shadow: '0 10px 15px -3px rgba(202, 138, 4, 0.1)',
    accent: '#CA8A04',
  },
  'modern-emerald': {
    background: '#F0FDF4',
    cardBg: '#FFFFFF',
    textPrimary: '#064E3B',
    textSecondary: '#065F46',
    border: '#BBF7D0',
    shadow: '0 10px 15px -3px rgba(5, 150, 105, 0.1)',
    accent: '#059669',
  },
  'vibrant-sunset': {
    background: '#FFF7ED',
    cardBg: '#FFFFFF',
    textPrimary: '#7C2D12',
    textSecondary: '#9A3412',
    border: '#FED7AA',
    shadow: '0 10px 15px -3px rgba(234, 88, 12, 0.1)',
    accent: '#EA580C',
  }
};
