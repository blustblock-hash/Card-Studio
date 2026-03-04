
import React from 'react';
import { useStore } from '../../store/useStore';
import { Card, ThemeType, LayoutVariant, Density, Language } from '../../types';
import { Label } from '@/src/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Switch } from '@/src/components/ui/switch';
import { Slider } from '@/src/components/ui/slider';
import { Button } from '@/src/components/ui/button';
import { THEMES } from '../../themes';
import { Separator } from '@/src/components/ui/separator';
import { Input } from '@/src/components/ui/input';
import { Upload, X } from 'lucide-react';

interface DesignControlsProps {
  card: Card;
  onChange: (design: Partial<Card['design']>) => void;
}

export const DesignControls: React.FC<DesignControlsProps> = ({ card, onChange }) => {
  const { design } = card;
  const { t } = useStore();

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('themeLayout')}</h3>
        
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-wider">{t('globalTheme')}</Label>
          <Select value={design.theme} onValueChange={(val: ThemeType) => onChange({ theme: val })}>
            <SelectTrigger className="bg-white/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="momh-executive">MoMH Executive</SelectItem>
              <SelectItem value="minimal-white">Minimal White</SelectItem>
              <SelectItem value="glass-soft">Glass Soft</SelectItem>
              <SelectItem value="print-grayscale">Print/Grayscale</SelectItem>
              <SelectItem value="deep-navy">Deep Navy</SelectItem>
              <SelectItem value="royal-gold">Royal Gold</SelectItem>
              <SelectItem value="modern-emerald">Modern Emerald</SelectItem>
              <SelectItem value="vibrant-sunset">Vibrant Sunset</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-wider">{t('aspectRatio')}</Label>
          <Select value={design.aspectRatio} onValueChange={(val: any) => onChange({ aspectRatio: val })}>
            <SelectTrigger className="bg-white/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1:1">Square (1:1)</SelectItem>
              <SelectItem value="16:9">Slide (16:9)</SelectItem>
              <SelectItem value="A4">Portrait (A4)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-wider">{t('layoutVariant')}</Label>
          <div className="grid grid-cols-5 gap-1">
            {(['A', 'B', 'C', 'D', 'E'] as LayoutVariant[]).map((v) => (
              <Button
                key={v}
                variant={design.layoutVariant === v ? 'default' : 'outline'}
                size="sm"
                onClick={() => onChange({ layoutVariant: v })}
                className="text-[10px] h-8 px-0"
              >
                {v}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-[10px] uppercase tracking-wider">{t('density')}</Label>
          <div className="flex gap-1">
            {(['compact', 'comfortable', 'spacious'] as Density[]).map((d) => (
              <Button
                key={d}
                variant={design.density === d ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onChange({ density: d })}
                className="text-[10px] h-7 px-2"
              >
                {d.charAt(0)}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-wider">{t('accentColor')}</Label>
          <div className="flex gap-2 flex-wrap">
            {['#0F172A', '#0EA5E9', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map((c) => (
              <button
                key={c}
                className={`w-6 h-6 rounded-full border-2 ${design.accentColor === c ? 'border-slate-400' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
                onClick={() => onChange({ accentColor: c })}
              />
            ))}
            <input 
              type="color" 
              value={design.accentColor} 
              onChange={(e) => onChange({ accentColor: e.target.value })}
              className="w-6 h-6 rounded-full overflow-hidden border-none p-0 cursor-pointer"
            />
          </div>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('branding')}</h3>
        
        <div className="flex items-center justify-between">
          <Label className="text-[10px] uppercase tracking-wider">{t('showLogo')}</Label>
          <Switch checked={design.showLogo} onCheckedChange={(val) => onChange({ showLogo: val })} />
        </div>

        {design.showLogo && (
          <>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-wider">{t('logoSource')}</Label>
              <div className="flex gap-2">
                <Input 
                  value={design.logoUrl || ''} 
                  onChange={(e) => onChange({ logoUrl: e.target.value })}
                  placeholder="https://..."
                  className="text-xs h-8 bg-white/50 flex-1"
                />
                <div className="relative">
                  <Button variant="outline" size="sm" className="h-8 px-2 relative overflow-hidden">
                    <Upload size={14} />
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            onChange({ logoUrl: reader.result as string });
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
              <Label className="text-[10px] uppercase tracking-wider">{t('logoSize')} ({design.logoSize}px)</Label>
              <Slider 
                value={[design.logoSize]} 
                min={20} max={150} step={5}
                onValueChange={([val]) => onChange({ logoSize: val })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-wider">{t('position')}</Label>
              <Select value={design.logoPosition} onValueChange={(val: any) => onChange({ logoPosition: val })}>
                <SelectTrigger className="h-8 text-xs bg-white/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-left">Top Left</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </section>

      <Separator />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('topHeader')}</h3>
          <Switch 
            checked={design.header?.show || false} 
            onCheckedChange={(val) => onChange({ header: { ...(design.header || { backgroundColor: design.accentColor, textColor: '#FFFFFF', style: 'modern' }), show: val } })} 
          />
        </div>

        {design.header?.show && (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-wider">{t('backgroundColor')}</Label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  value={design.header.backgroundColor} 
                  onChange={(e) => onChange({ header: { ...design.header!, backgroundColor: e.target.value } })}
                  className="w-12 h-8 p-1 bg-white/50"
                />
                <Input 
                  value={design.header.backgroundColor} 
                  onChange={(e) => onChange({ header: { ...design.header!, backgroundColor: e.target.value } })}
                  className="text-xs h-8 bg-white/50 flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-wider">{t('textColor')}</Label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  value={design.header.textColor} 
                  onChange={(e) => onChange({ header: { ...design.header!, textColor: e.target.value } })}
                  className="w-12 h-8 p-1 bg-white/50"
                />
                <Input 
                  value={design.header.textColor} 
                  onChange={(e) => onChange({ header: { ...design.header!, textColor: e.target.value } })}
                  className="text-xs h-8 bg-white/50 flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-wider">{t('headerStyle')}</Label>
              <Select 
                value={design.header.style} 
                onValueChange={(val: any) => onChange({ header: { ...design.header!, style: val } })}
              >
                <SelectTrigger className="h-8 text-xs bg-white/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern (Rounded)</SelectItem>
                  <SelectItem value="clean">Clean (Square)</SelectItem>
                  <SelectItem value="bold">Bold (Heavy Text)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </section>

      <Separator />

      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('localization')}</h3>
        <div className="flex items-center justify-between">
          <Label className="text-[10px] uppercase tracking-wider">{t('language')}</Label>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {(['EN', 'AR'] as Language[]).map((l) => (
              <Button
                key={l}
                variant={design.language === l ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onChange({ language: l })}
                className="text-[10px] h-6 px-3"
              >
                {l}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('footer')}</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-[10px] uppercase tracking-wider">{t('leftText')}</Label>
            <Input 
              value={design.footer.leftText} 
              onChange={(e) => onChange({ footer: { ...design.footer, leftText: e.target.value } })}
              className="text-xs h-8 bg-white/50"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] uppercase tracking-wider">{t('centerText')}</Label>
            <Input 
              value={design.footer.centerText} 
              onChange={(e) => onChange({ footer: { ...design.footer, centerText: e.target.value } })}
              className="text-xs h-8 bg-white/50"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] uppercase tracking-wider">{t('rightText')}</Label>
            <Input 
              value={design.footer.rightText} 
              onChange={(e) => onChange({ footer: { ...design.footer, rightText: e.target.value } })}
              className="text-xs h-8 bg-white/50"
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <Label className="text-[10px] uppercase tracking-wider">{t('pageStamp')}</Label>
            <Switch 
              checked={design.footer.showPageStamp} 
              onCheckedChange={(val) => onChange({ footer: { ...design.footer, showPageStamp: val } })} 
            />
          </div>
          {design.footer.showPageStamp && (
            <Input 
              value={design.footer.pageStampText} 
              onChange={(e) => onChange({ footer: { ...design.footer, pageStampText: e.target.value } })}
              placeholder="e.g. CONFIDENTIAL"
              className="text-xs h-8 bg-white/50"
            />
          )}
        </div>
      </section>
    </div>
  );
};
