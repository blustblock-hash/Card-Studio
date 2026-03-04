
import { create } from 'zustand';
import { Card, CardType, AppSettings, Language, ThemeType } from '../types';
import { getAllCards, saveCard as dbSaveCard, deleteCard as dbDeleteCard, getSettings, saveSettings as dbSaveSettings } from '../lib/db';
import { translations, TranslationKey } from '../lib/translations';

interface AppState {
  cards: Card[];
  currentCard: Card | null;
  settings: AppSettings;
  isLoading: boolean;
  
  // Actions
  loadInitialData: () => Promise<void>;
  setCurrentCard: (card: Card | null) => void;
  addCard: (type: CardType) => Promise<Card>;
  updateCard: (id: string, updates: Partial<Card>) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  duplicateCard: (id: string) => Promise<void>;
  saveCurrentCard: () => Promise<void>;
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>;
  t: (key: TranslationKey) => string;
}

const DEFAULT_SETTINGS: AppSettings = {
  brand: {
    logoUrl: 'https://picsum.photos/seed/gov/200/200',
    defaultFooter: {
      leftText: 'Confidential',
      centerText: '',
      rightText: '© 2024 Card Studio',
      showPageStamp: true,
      pageStampText: 'DRAFT',
    },
    defaultTheme: 'momh-executive',
    defaultAccentColor: '#0F172A',
  },
  export: {
    pngScale: 2,
    pdfSize: 'A4',
    pptSlideSize: '16:9',
  },
  language: {
    defaultLanguage: 'EN',
    autoRTL: true,
  },
};

export const useStore = create<AppState>((set, get) => ({
  cards: [],
  currentCard: null,
  settings: DEFAULT_SETTINGS,
  isLoading: true,

  loadInitialData: async () => {
    const [cards, settings] = await Promise.all([
      getAllCards(),
      getSettings(),
    ]);
    
    let finalCards = cards;
    if (cards.length === 0) {
      const { SAMPLE_CARDS } = await import('../constants');
      finalCards = SAMPLE_CARDS;
      // Optionally save samples to DB
      for (const card of SAMPLE_CARDS) {
        await dbSaveCard(card);
      }
    }

    set({ 
      cards: finalCards.sort((a, b) => b.updatedAt - a.updatedAt), 
      settings: settings || DEFAULT_SETTINGS,
      isLoading: false 
    });
  },

  setCurrentCard: (card) => set({ currentCard: card }),

  addCard: async (type) => {
    const { settings } = get();
    const newCard: Card = {
      id: crypto.randomUUID(),
      type,
      content: {},
      labelOverrides: {},
      design: {
        theme: settings.brand.defaultTheme,
        layoutVariant: 'A',
        density: 'comfortable',
        language: settings.language.defaultLanguage,
        aspectRatio: 'A4',
        showLogo: true,
        logoUrl: settings.brand.logoUrl,
        logoPosition: 'top-right',
        logoSize: 60,
        logoOpacity: 1,
        footer: { ...settings.brand.defaultFooter },
        header: {
          show: false,
          backgroundColor: settings.brand.defaultAccentColor,
          textColor: '#FFFFFF',
          style: 'modern',
        },
        accentColor: settings.brand.defaultAccentColor,
      },
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    await dbSaveCard(newCard);
    set((state) => ({ cards: [newCard, ...state.cards], currentCard: newCard }));
    return newCard;
  },

  updateCard: async (id, updates) => {
    const { cards, currentCard } = get();
    const updatedCards = cards.map((c) => 
      c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c
    );
    
    const updatedCard = updatedCards.find(c => c.id === id);
    if (updatedCard) {
      await dbSaveCard(updatedCard);
      set({ 
        cards: updatedCards.sort((a, b) => b.updatedAt - a.updatedAt),
        currentCard: currentCard?.id === id ? updatedCard : currentCard
      });
    }
  },

  deleteCard: async (id) => {
    await dbDeleteCard(id);
    set((state) => ({ 
      cards: state.cards.filter((c) => c.id !== id),
      currentCard: state.currentCard?.id === id ? null : state.currentCard
    }));
  },

  duplicateCard: async (id) => {
    const card = get().cards.find(c => c.id === id);
    if (!card) return;
    
    const duplicated: Card = {
      ...card,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      content: { ...card.content },
      design: { ...card.design, footer: { ...card.design.footer } },
    };
    
    await dbSaveCard(duplicated);
    set((state) => ({ cards: [duplicated, ...state.cards] }));
  },

  saveCurrentCard: async () => {
    const { currentCard } = get();
    if (currentCard) {
      await dbSaveCard(currentCard);
    }
  },

  updateSettings: async (updates) => {
    const newSettings = { ...get().settings, ...updates };
    await dbSaveSettings(newSettings);
    set({ settings: newSettings });
  },

  t: (key) => {
    const { settings } = get();
    const lang = settings.language.defaultLanguage as Language;
    return translations[lang]?.[key] || translations.EN[key] || key;
  },
}));
