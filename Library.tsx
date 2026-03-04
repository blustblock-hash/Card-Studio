
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CardRenderer } from '../cards/CardRenderer';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Copy, 
  ExternalLink,
  Grid,
  List,
  ChevronLeft
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/src/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

interface LibraryProps {
  onNavigate: (page: string) => void;
}

export const Library: React.FC<LibraryProps> = ({ onNavigate }) => {
  const { cards, deleteCard, duplicateCard, setCurrentCard, t } = useStore();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredCards = cards.filter(c => 
    (c.content?.title || c.content?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    c.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = (card: any) => {
    setCurrentCard(card);
    onNavigate('editor');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this card?')) {
      await deleteCard(id);
      toast.success('Card deleted');
    }
  };

  const handleDuplicate = async (id: string) => {
    await duplicateCard(id);
    toast.success('Card duplicated');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')} className="-ml-2">
              <ChevronLeft size={20} />
            </Button>
            <span className="text-xs font-bold uppercase tracking-widest">{t('backToDashboard')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">{t('library')}</h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium">Manage your collection of {cards.length} cards.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              placeholder="Search cards..." 
              className="pl-10 bg-white border-slate-200 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex border rounded-lg overflow-hidden bg-white flex-1 sm:flex-none">
              <Button 
                variant={view === 'grid' ? 'secondary' : 'ghost'} 
                size="icon" 
                onClick={() => setView('grid')}
                className="rounded-none flex-1 sm:flex-none"
              >
                <Grid size={18} />
              </Button>
              <Button 
                variant={view === 'list' ? 'secondary' : 'ghost'} 
                size="icon" 
                onClick={() => setView('list')}
                className="rounded-none flex-1 sm:flex-none"
              >
                <List size={18} />
              </Button>
            </div>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </div>
        </div>
      </header>

      {filteredCards.length === 0 ? (
        <div className="py-20 sm:py-32 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Search size={32} />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900">No cards found</h3>
            <p className="text-sm text-slate-500">Try adjusting your search or create a new card.</p>
          </div>
          <Button onClick={() => onNavigate('dashboard')}>{t('newCard')}</Button>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
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
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 truncate">{card.content?.title || card.content?.name || t('untitledCard')}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{t(card.type as any) || card.type.replace('-', ' ')}</span>
                      <span className="text-[10px] text-slate-300">•</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{new Date(card.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpen(card)}>
                        <ExternalLink size={14} className="mr-2" /> Open
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(card.id)}>
                        <Copy size={14} className="mr-2" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(card.id)} className="text-red-600">
                        <Trash2 size={14} className="mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <th className="px-6 py-4">Card Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Last Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCards.map((card) => (
                <tr key={card.id} className="border-b hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <button onClick={() => handleOpen(card)} className="font-bold text-slate-900 hover:underline text-sm truncate max-w-[200px] block">
                      {card.content?.title || card.content?.name || t('untitledCard')}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{t(card.type as any) || card.type.replace('-', ' ')}</span>
                  </td>
                  <td className="px-6 py-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {new Date(card.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => handleDuplicate(card.id)}>
                        <Copy size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(card.id)} className="text-red-600">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
