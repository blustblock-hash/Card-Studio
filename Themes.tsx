
import React from 'react';
import { useStore } from '../store/useStore';
import { THEMES } from '../themes';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { ChevronLeft, Check, Layout, Palette, Type, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemesProps {
  onNavigate: (page: string) => void;
}

export const Themes: React.FC<ThemesProps> = ({ onNavigate }) => {
  const { settings, updateSettings, t } = useStore();

  const handleSelectTheme = (themeId: string) => {
    updateSettings({
      brand: {
        ...settings.brand,
        defaultTheme: themeId as any
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('dashboard')}
            className="-ml-2 text-slate-500 hover:text-slate-900"
          >
            <ChevronLeft size={16} className="mr-1" /> {t('backToDashboard')}
          </Button>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">{t('themesTokens')}</h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium">{t('exploreTokens')}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8 sm:space-y-12">
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Palette size={14} /> {t('themes')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(THEMES).map(([id, theme]) => (
                <Card 
                  key={id}
                  className={`cursor-pointer transition-all border-2 ${
                    settings.brand.defaultTheme === id 
                      ? 'border-slate-900 shadow-lg' 
                      : 'border-transparent hover:border-slate-200'
                  }`}
                  onClick={() => handleSelectTheme(id)}
                >
                  <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle className="text-sm font-bold capitalize">{id.replace(/-/g, ' ')}</CardTitle>
                      <CardDescription className="text-[10px]">Executive visual style</CardDescription>
                    </div>
                    {settings.brand.defaultTheme === id && (
                      <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center">
                        <Check size={14} />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="h-24 rounded-lg overflow-hidden flex" style={{ backgroundColor: theme.cardBg }}>
                      <div className="w-1/3 h-full opacity-20" style={{ backgroundColor: theme.accent }} />
                      <div className="flex-1 p-3 space-y-2">
                        <div className="h-2 w-3/4 rounded-full bg-slate-200" style={{ backgroundColor: theme.textSecondary, opacity: 0.2 }} />
                        <div className="h-2 w-1/2 rounded-full bg-slate-200" style={{ backgroundColor: theme.textSecondary, opacity: 0.2 }} />
                        <div className="h-4 w-full rounded-md bg-slate-200" style={{ backgroundColor: theme.textPrimary, opacity: 0.1 }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Layers size={14} /> {t('layoutVariant')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['A', 'B', 'C'].map((variant) => (
                <div key={variant} className="aspect-video rounded-xl border border-slate-200 bg-white flex items-center justify-center font-bold text-slate-400 hover:border-slate-900 hover:text-slate-900 cursor-pointer transition-colors">
                  Variant {variant}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <Card className="bg-slate-50 border-slate-200">
            <CardHeader>
              <CardTitle className="text-sm">Design System Info</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-4 text-slate-600 leading-relaxed">
              <p>
                Our themes use a semantic token system that ensures accessibility and brand consistency across all government departments.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Type size={12} /> Typography</span>
                  <span className="font-mono text-[10px]">Inter / System</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Layout size={12} /> Grid</span>
                  <span className="font-mono text-[10px]">8px Baseline</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-emerald-900 text-emerald-50 space-y-4">
            <h3 className="font-bold">Custom Tokens</h3>
            <p className="text-xs opacity-70">Need a bespoke theme for your department? Contact the design systems team.</p>
            <Button variant="outline" className="w-full border-emerald-700 text-emerald-50 hover:bg-emerald-800">
              Request Theme
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
};
