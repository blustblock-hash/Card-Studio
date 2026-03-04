
import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { CardRenderer } from '../cards/CardRenderer';
import { CardForm } from '../components/Editor/CardForm';
import { DesignControls } from '../components/Editor/DesignControls';
import { Button } from '@/src/components/ui/button';
import { ScrollArea } from '@/src/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import { 
  ChevronLeft, 
  Download, 
  Save, 
  Share2, 
  FileImage, 
  FileText, 
  Presentation,
  Maximize2,
  Minimize2,
  Undo2
} from 'lucide-react';
import { exportToPng, exportToPdf, exportToPptx } from '../lib/export';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/src/components/ui/dropdown-menu';

interface EditorProps {
  onNavigate: (page: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ onNavigate }) => {
  const { currentCard, updateCard, saveCurrentCard, settings, t } = useStore();
  const [isPreviewFull, setIsPreviewFull] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');

  if (!currentCard) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <p className="text-slate-500">No card selected</p>
        <Button onClick={() => onNavigate('dashboard')}>Go to Dashboard</Button>
      </div>
    );
  }

  const handleContentChange = (content: any) => {
    updateCard(currentCard.id, { content });
  };

  const handleLabelChange = (labelOverrides: Record<string, string>) => {
    updateCard(currentCard.id, { labelOverrides });
  };

  const handleDesignChange = (designUpdates: any) => {
    updateCard(currentCard.id, { 
      design: { ...currentCard.design, ...designUpdates } 
    });
  };

  const handleSave = async () => {
    await saveCurrentCard();
    toast.success('Card saved to library');
  };

  const handleExport = async (format: 'png' | 'pdf' | 'pptx') => {
    toast.promise(
      async () => {
        if (format === 'png') await exportToPng('card-preview', settings.export.pngScale, currentCard.design.aspectRatio);
        if (format === 'pdf') await exportToPdf('card-preview', currentCard.design.aspectRatio);
        if (format === 'pptx') await exportToPptx('card-preview', currentCard.design.aspectRatio);
      },
      {
        loading: `Generating ${format.toUpperCase()}...`,
        success: `${format.toUpperCase()} exported successfully`,
        error: 'Export failed',
      }
    );
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-4 sm:px-6 shrink-0 z-20">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')} className="h-8 w-8 sm:h-10 sm:w-10">
            <ChevronLeft size={20} />
          </Button>
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          <div className="max-w-[150px] sm:max-w-none truncate">
            <h2 className="text-sm font-bold text-slate-900 truncate">
              {currentCard.content?.title || currentCard.content?.name || t('untitledCard')}
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {t(currentCard.type as any) || currentCard.type.replace('-', ' ')} {t('editor')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="outline" size="sm" onClick={handleSave} className="text-[10px] sm:text-xs font-bold uppercase tracking-wider h-8 px-2 sm:px-3">
            <Save size={14} className="sm:mr-2" /> <span className="hidden sm:inline">{t('saveDraft')}</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider h-8 px-2 sm:px-3">
                <Download size={14} className="sm:mr-2" /> <span className="hidden sm:inline">{t('export')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleExport('png')} className="flex items-center gap-2 py-3">
                <FileImage size={16} className="text-slate-500" />
                <div className="flex flex-col">
                  <span className="font-bold text-xs uppercase tracking-wider">PNG Image</span>
                  <span className="text-[10px] text-slate-400">High resolution ({settings.export.pngScale}x)</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')} className="flex items-center gap-2 py-3">
                <FileText size={16} className="text-slate-500" />
                <div className="flex flex-col">
                  <span className="font-bold text-xs uppercase tracking-wider">PDF Document</span>
                  <span className="text-[10px] text-slate-400">Vector quality</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pptx')} className="flex items-center gap-2 py-3">
                <Presentation size={16} className="text-slate-500" />
                <div className="flex flex-col">
                  <span className="font-bold text-xs uppercase tracking-wider">PowerPoint</span>
                  <span className="text-[10px] text-slate-400">Editable slide</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
            <Share2 size={18} />
          </Button>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b bg-white shrink-0">
        <button 
          onClick={() => { setActiveTab('content'); setIsPreviewFull(false); }}
          className={cn("flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-colors", activeTab === 'content' && !isPreviewFull ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400")}
        >
          {t('content')}
        </button>
        <button 
          onClick={() => { setActiveTab('design'); setIsPreviewFull(false); }}
          className={cn("flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-colors", activeTab === 'design' && !isPreviewFull ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400")}
        >
          {t('design')}
        </button>
        <button 
          onClick={() => setIsPreviewFull(true)}
          className={cn("flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-colors", isPreviewFull ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400")}
        >
          {t('preview')}
        </button>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Panel: Form */}
        <aside className={cn(
          "w-full lg:w-[400px] border-r bg-white flex flex-col shrink-0 transition-all duration-300 absolute lg:relative inset-0 z-10 lg:z-0",
          isPreviewFull || activeTab !== 'content' ? "-translate-x-full lg:translate-x-0 lg:hidden" : "translate-x-0"
        )}>
          <ScrollArea className="flex-1">
            <div className="p-4 sm:p-8">
              <CardForm 
                card={currentCard} 
                onChange={handleContentChange} 
                onLabelChange={handleLabelChange}
              />
            </div>
          </ScrollArea>
        </aside>

        {/* Center: Preview */}
        <main className={cn(
          "flex-1 bg-slate-100 p-4 sm:p-8 lg:p-12 flex flex-col items-center justify-center overflow-auto transition-all duration-300",
          isPreviewFull ? "z-20 absolute inset-0 lg:relative" : "hidden lg:flex"
        )}>
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex gap-2 z-10">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full shadow-sm h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => setIsPreviewFull(!isPreviewFull)}
            >
              {isPreviewFull ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </Button>
          </div>
          
          <div className={cn(
            "transition-all duration-500 ease-in-out w-full",
            isPreviewFull ? "max-w-5xl" : "max-w-4xl"
          )}>
            <div className="shadow-2xl rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden bg-white">
              <CardRenderer card={currentCard} id="card-preview" />
            </div>
            <div className="mt-4 sm:mt-6 flex justify-center">
              <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-center">
                {t('livePreview')} • {currentCard.design.language} • {currentCard.design.theme.replace('-', ' ')}
              </p>
            </div>
          </div>
        </main>

        {/* Right Panel: Design */}
        <aside className={cn(
          "w-full lg:w-[320px] border-l bg-white flex flex-col shrink-0 transition-all duration-300 absolute lg:relative inset-0 z-10 lg:z-0",
          isPreviewFull || activeTab !== 'design' ? "translate-x-full lg:translate-x-0 lg:hidden" : "translate-x-0"
        )}>
          <ScrollArea className="flex-1">
            <div className="p-4 sm:p-8">
              <DesignControls card={currentCard} onChange={handleDesignChange} />
            </div>
          </ScrollArea>
        </aside>
      </div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
