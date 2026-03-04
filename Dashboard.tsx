
import React from 'react';
import { useStore } from '../store/useStore';
import { CardType } from '../types';
import { CARD_SCHEMAS } from '../cards/schemas';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Plus, Clock, Layout, Settings as SettingsIcon, Library as LibraryIcon, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CardRenderer } from '../cards/CardRenderer';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { cards, addCard, setCurrentCard, t } = useStore();
  
  const handleCreate = async (type: CardType) => {
    const newCard = await addCard(type);
    setCurrentCard(newCard);
    onNavigate('editor');
  };

  const handleOpen = (card: any) => {
    setCurrentCard(card);
    onNavigate('editor');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16">
      <header className="space-y-2">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">{t('dashboard')}</h1>
        <p className="text-lg sm:text-xl text-slate-500 font-medium">{t('subtitle')}</p>
      </header>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">{t('newCard')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(CARD_SCHEMAS).map((schema) => (
            <motion.div
              key={schema.type}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-xl transition-all border-slate-200/60 bg-white/50 backdrop-blur-sm group h-full"
                onClick={() => handleCreate(schema.type)}
              >
                <CardHeader className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus size={20} />
                  </div>
                  <CardTitle className="text-lg font-bold">{t(schema.type as any) || schema.title}</CardTitle>
                  <CardDescription className="text-xs">Start with a fresh {schema.type} template.</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {cards.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">{t('recentCards')}</h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('library')} className="text-xs font-bold uppercase tracking-widest">
              {t('viewAll')} <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.slice(0, 3).map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div 
                  className="aspect-[1.414/1] rounded-2xl overflow-hidden border border-slate-200 shadow-sm group-hover:shadow-2xl transition-all cursor-pointer bg-white"
                  onClick={() => handleOpen(card)}
                >
                  <div className="scale-[0.25] origin-top-left w-[400%] h-[400%] pointer-events-none">
                    <CardRenderer card={card} />
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{card.content?.title || card.content?.name || t('untitledCard')}</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">{t(card.type as any) || card.type.replace('-', ' ')}</p>
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Clock size={10} />
                    {new Date(card.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
        <Card className="bg-slate-900 text-white border-none overflow-hidden relative group cursor-pointer" onClick={() => onNavigate('library')}>
          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform">
            <LibraryIcon size={160} />
          </div>
          <CardHeader>
            <CardTitle>{t('library')}</CardTitle>
            <CardDescription className="text-slate-400">Browse and manage your collection of saved cards.</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-white border-slate-200 overflow-hidden relative group cursor-pointer" onClick={() => onNavigate('settings')}>
          <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:scale-110 transition-transform">
            <SettingsIcon size={160} />
          </div>
          <CardHeader>
            <CardTitle>{t('settings')}</CardTitle>
            <CardDescription>Configure branding, export defaults, and localization.</CardDescription>
          </CardHeader>
        </Card>

        <Card 
          className="bg-emerald-50 border-emerald-100 overflow-hidden relative group cursor-pointer sm:col-span-2 lg:col-span-1"
          onClick={() => onNavigate('themes')}
        >
          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform text-emerald-900">
            <Layout size={160} />
          </div>
          <CardHeader>
            <CardTitle className="text-emerald-900">{t('themes')}</CardTitle>
            <CardDescription className="text-emerald-700">Explore premium design tokens and layout variants.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
