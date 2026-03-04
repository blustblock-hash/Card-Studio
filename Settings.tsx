
import React from 'react';
import { useStore } from '../store/useStore';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Switch } from '@/src/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Separator } from '@/src/components/ui/separator';
import { ChevronLeft, Upload, Shield, Globe, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsProps {
  onNavigate: (page: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const { settings, updateSettings, t } = useStore();

  const handleSave = () => {
    toast.success('Settings updated');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')} className="-ml-2">
            <ChevronLeft size={20} />
          </Button>
          <span className="text-xs font-bold uppercase tracking-widest">{t('backToDashboard')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">{t('settings')}</h1>
        <p className="text-sm sm:text-base text-slate-500 font-medium">{t('globalConfig')}</p>
      </header>

      <div className="space-y-8 sm:space-y-12">
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-slate-400" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">{t('brandIdentity')}</h2>
          </div>
          <div className="grid gap-6 p-4 sm:p-6 bg-white border border-slate-200 rounded-2xl">
            <div className="space-y-2">
              <Label>{t('defaultLogo')}</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                  placeholder="https://..." 
                  value={settings.brand.logoUrl || ''}
                  onChange={(e) => updateSettings({ brand: { ...settings.brand, logoUrl: e.target.value } })}
                  className="flex-1"
                />
                <div className="relative">
                  <Button variant="outline" className="w-full sm:w-auto relative overflow-hidden">
                    <Upload size={16} className="mr-2" /> {t('export')}
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            updateSettings({ brand: { ...settings.brand, logoUrl: reader.result as string } });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('defaultAccent')}</Label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  className="w-12 h-10 p-1" 
                  value={settings.brand.defaultAccentColor}
                  onChange={(e) => updateSettings({ brand: { ...settings.brand, defaultAccentColor: e.target.value } })}
                />
                <Input 
                  value={settings.brand.defaultAccentColor}
                  onChange={(e) => updateSettings({ brand: { ...settings.brand, defaultAccentColor: e.target.value } })}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Download size={18} className="text-slate-400" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">{t('exportDefaults')}</h2>
          </div>
          <div className="grid gap-6 p-4 sm:p-6 bg-white border border-slate-200 rounded-2xl">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label>{t('pngScale')}</Label>
                <p className="text-[10px] sm:text-xs text-slate-500">Higher scale means better quality but larger files.</p>
              </div>
              <Select 
                value={settings.export.pngScale.toString()} 
                onValueChange={(val) => updateSettings({ export: { ...settings.export, pngScale: parseInt(val) } })}
              >
                <SelectTrigger className="w-20 sm:w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1x</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                  <SelectItem value="3">3x</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label>{t('pdfSize')}</Label>
                <p className="text-[10px] sm:text-xs text-slate-500">Choose between standard A4 or presentation 16:9.</p>
              </div>
              <Select 
                value={settings.export.pdfSize}
                onValueChange={(val: any) => updateSettings({ export: { ...settings.export, pdfSize: val } })}
              >
                <SelectTrigger className="w-28 sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A4">A4 Portrait</SelectItem>
                  <SelectItem value="16:9">16:9 Slide</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-slate-400" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">{t('localization')}</h2>
          </div>
          <div className="grid gap-6 p-4 sm:p-6 bg-white border border-slate-200 rounded-2xl">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label>{t('defaultLanguage')}</Label>
                <p className="text-[10px] sm:text-xs text-slate-500">Set the initial language for new cards.</p>
              </div>
              <Select 
                value={settings.language.defaultLanguage}
                onValueChange={(val: any) => updateSettings({ language: { ...settings.language, defaultLanguage: val } })}
              >
                <SelectTrigger className="w-28 sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EN">English</SelectItem>
                  <SelectItem value="AR">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label>{t('autoRTL')}</Label>
                <p className="text-[10px] sm:text-xs text-slate-500">Automatically flip layout direction for Arabic cards.</p>
              </div>
              <Switch 
                checked={settings.language.autoRTL}
                onCheckedChange={(val) => updateSettings({ language: { ...settings.language, autoRTL: val } })}
              />
            </div>
          </div>
        </section>

        <section className="pt-6">
          <div className="p-4 sm:p-6 bg-red-50 border border-red-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-red-900">{t('resetData')}</h3>
              <p className="text-xs text-red-700">This will permanently delete all cards and settings.</p>
            </div>
            <Button variant="destructive" size="sm" className="w-full sm:w-auto" onClick={() => {
              if (confirm('Are you sure? This cannot be undone.')) {
                indexedDB.deleteDatabase('card-studio-db');
                window.location.reload();
              }
            }}>
              <Trash2 size={14} className="mr-2" /> {t('clearAll')}
            </Button>
          </div>
        </section>

        <div className="flex justify-end pt-6">
          <Button onClick={handleSave} className="w-full sm:w-auto bg-slate-900 text-white font-bold uppercase tracking-widest px-8">
            {t('saveChanges')}
          </Button>
        </div>
      </div>
    </div>
  );
};
