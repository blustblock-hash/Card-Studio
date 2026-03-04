
import React, { useEffect, useState } from 'react';
import { useStore } from './store/useStore';
import { Dashboard } from './pages/Dashboard';
import { Editor } from './pages/Editor';
import { Library } from './pages/Library';
import { Settings } from './pages/Settings';
import { Themes } from './pages/Themes';
import { Toaster } from './components/ui/sonner';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Globe } from 'lucide-react';
import { Button } from './components/ui/button';

type Page = 'dashboard' | 'editor' | 'library' | 'settings' | 'themes';

export default function App() {
  const { loadInitialData, isLoading, settings, updateSettings } = useStore();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const isArabic = settings.language.defaultLanguage === 'AR';

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-slate-400" size={40} />
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Loading Studio...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={(p) => setCurrentPage(p as Page)} />;
      case 'editor':
        return <Editor onNavigate={(p) => setCurrentPage(p as Page)} />;
      case 'library':
        return <Library onNavigate={(p) => setCurrentPage(p as Page)} />;
      case 'settings':
        return <Settings onNavigate={(p) => setCurrentPage(p as Page)} />;
      case 'themes':
        return <Themes onNavigate={(p) => setCurrentPage(p as Page)} />;
      default:
        return <Dashboard onNavigate={(p) => setCurrentPage(p as Page)} />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => updateSettings({ language: { ...settings.language, defaultLanguage: isArabic ? 'EN' : 'AR' } })}
          className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-sm text-[10px] font-bold uppercase tracking-widest h-8"
        >
          <Globe size={14} className={isArabic ? 'ml-2' : 'mr-2'} />
          {isArabic ? 'English' : 'العربية'}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-full"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      <Toaster position="top-center" />
    </div>
  );
}
