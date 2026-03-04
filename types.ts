
export type CardType = 
  | 'policy' 
  | 'objective' 
  | 'executive-summary' 
  | 'kpi' 
  | 'initiative' 
  | 'task' 
  | 'evidence-response';

export interface CardField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'chips' | 'bullets' | 'rag';
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  options?: string[];
  maxLength?: number;
  visibilityToggle?: boolean;
}

export interface CardSchema {
  type: CardType;
  title: string;
  fields: CardField[];
}

export type ThemeType = 
  | 'momh-executive' 
  | 'minimal-white' 
  | 'glass-soft' 
  | 'print-grayscale'
  | 'deep-navy'
  | 'royal-gold'
  | 'modern-emerald'
  | 'vibrant-sunset';
export type LayoutVariant = 'A' | 'B' | 'C' | 'D' | 'E';
export type Density = 'compact' | 'comfortable' | 'spacious';
export type Language = 'AR' | 'EN';
export type AspectRatio = '1:1' | '16:9' | 'A4';

export interface CardDesign {
  theme: ThemeType;
  layoutVariant: LayoutVariant;
  density: Density;
  language: Language;
  aspectRatio: AspectRatio;
  showLogo: boolean;
  logoUrl?: string;
  logoPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  logoSize: number;
  logoOpacity: number;
  footer: {
    leftText: string;
    centerText: string;
    rightText: string;
    showPageStamp: boolean;
    pageStampText: string;
  };
  header?: {
    show: boolean;
    backgroundColor: string;
    textColor: string;
    style: 'modern' | 'clean' | 'bold';
  };
  accentColor: string;
}

export interface Card {
  id: string;
  type: CardType;
  content: Record<string, any>;
  labelOverrides: Record<string, string>;
  design: CardDesign;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  thumbnail?: string;
}

export interface AppSettings {
  brand: {
    logoUrl?: string;
    defaultFooter: CardDesign['footer'];
    defaultTheme: ThemeType;
    defaultAccentColor: string;
  };
  export: {
    pngScale: number;
    pdfSize: 'A4' | '16:9';
    pptSlideSize: '16:9' | '4:3';
  };
  language: {
    defaultLanguage: Language;
    autoRTL: boolean;
  };
}
