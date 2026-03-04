
import React from 'react';
import { Card, CardType, LayoutVariant, ThemeType } from '../types';
import { THEMES } from '../themes';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, Info, Target, TrendingUp, FileText, ListTodo, HelpCircle } from 'lucide-react';

interface CardRendererProps {
  card: Card;
  className?: string;
  id?: string;
}

const ICON_MAP: Record<CardType, any> = {
  policy: FileText,
  objective: Target,
  'executive-summary': Info,
  kpi: TrendingUp,
  initiative: CheckCircle2,
  task: ListTodo,
  'evidence-response': HelpCircle,
};

export const CardRenderer: React.FC<CardRendererProps> = ({ card, className, id }) => {
  if (!card || !card.content) {
    return (
      <div className="aspect-[1.414/1] w-full flex items-center justify-center bg-slate-100 rounded-[1.5rem] border border-dashed border-slate-300">
        <p className="text-slate-400 text-sm font-medium">Card content unavailable</p>
      </div>
    );
  }

  const theme = THEMES[card.design.theme];
  const isRTL = card.design.language === 'AR';
  const Icon = ICON_MAP[card.type];

  const containerStyle: React.CSSProperties = {
    backgroundColor: theme.cardBg,
    color: theme.textPrimary,
    borderColor: theme.border,
    boxShadow: theme.shadow,
    direction: isRTL ? 'rtl' : 'ltr',
    fontFamily: isRTL ? 'Inter, "Noto Sans Arabic", sans-serif' : 'Inter, sans-serif',
    padding: card.design.density === 'compact' ? '1.5rem' : card.design.density === 'spacious' ? '3.5rem' : '2.5rem',
    borderRadius: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    aspectRatio: card.design.aspectRatio === '1:1' ? '1/1' : card.design.aspectRatio === '16:9' ? '16/9' : '1/1.414',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: '1px',
    backdropFilter: theme.glass ? 'blur(12px)' : 'none',
  };

  const accentStyle: React.CSSProperties = {
    backgroundColor: card.design.accentColor,
  };

  const renderHeader = () => {
    const title = card.content?.title || card.content?.name || card.content?.headline || card.content?.question || 'Untitled Card';
    const subtitle = card.content?.code || card.content?.objective || '';

    if (card.design.layoutVariant === 'A') {
      return (
        <div className="mb-8 flex items-start gap-4">
          <div className="h-12 w-1.5 rounded-full" style={accentStyle} />
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest opacity-60 mb-1">
              <Icon size={14} />
              {card.type.replace('-', ' ')}
            </div>
            <h1 className="text-3xl font-bold tracking-tight leading-tight">{title}</h1>
            {subtitle && <p className="text-sm font-medium opacity-70 mt-1">{subtitle}</p>}
          </div>
        </div>
      );
    }

    if (card.design.layoutVariant === 'B') {
      return (
        <div className="mb-8 border-b pb-6" style={{ borderColor: theme.border }}>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest opacity-60 mb-2">
                <Icon size={14} />
                {card.type.replace('-', ' ')}
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight leading-tight">{title}</h1>
            </div>
            {card.content?.status && (
              <div className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                card.content.status === 'Red' ? "bg-red-100 text-red-700" :
                card.content.status === 'Amber' ? "bg-amber-100 text-amber-700" :
                "bg-emerald-100 text-emerald-700"
              )}>
                {card.content.status}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (card.design.layoutVariant === 'C') {
      return (
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Icon size={12} />
            {card.type.replace('-', ' ')}
          </div>
          <h1 className="text-5xl font-serif italic tracking-tight leading-none mb-2">{title}</h1>
          <div className="h-1 w-20 mx-auto rounded-full mt-4" style={accentStyle} />
        </div>
      );
    }

    if (card.design.layoutVariant === 'D') {
      return (
        <div className="mb-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg" style={accentStyle}>
            <Icon size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-center uppercase leading-none">{title}</h1>
          <div className="mt-4 px-4 py-1 rounded-full bg-black/5 text-[10px] font-bold uppercase tracking-[0.3em]">
            {card.type.replace('-', ' ')}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-8 flex justify-between items-end">
        <div className="max-w-[70%]">
          <div className="h-1 w-12 mb-4 rounded-full" style={accentStyle} />
          <h1 className="text-4xl font-bold tracking-tight leading-none">{title}</h1>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Classification</div>
          <div className="text-sm font-bold">{card.type.replace('-', ' ')}</div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (!card.content) return null;
    const fields = Object.entries(card.content).filter(([key]) => !['title', 'name', 'headline', 'question', 'code', 'status'].includes(key));

    return (
      <div className={cn(
        "flex-1 grid gap-6",
        card.design.layoutVariant === 'C' || card.design.layoutVariant === 'D' ? "grid-cols-1" : "grid-cols-2"
      )}>
        {fields.map(([key, value]) => {
          if (!value || (Array.isArray(value) && value.length === 0)) return null;
          
          const label = (card.labelOverrides && card.labelOverrides[key]) || key.replace(/([A-Z])/g, ' $1').trim();

          return (
            <div key={key} className={cn(
              "space-y-2",
              (typeof value === 'string' && value.length > 150) || card.design.layoutVariant === 'D' ? "col-span-2" : ""
            )}>
              <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                {label}
              </h3>
              {Array.isArray(value) ? (
                <ul className="space-y-2">
                  {value.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={accentStyle} />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed font-medium">
                  {value}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderFooter = () => {
    const { footer } = card.design;
    return (
      <div className="mt-auto pt-6 border-t flex justify-between items-center text-[10px] font-medium opacity-40 uppercase tracking-widest" style={{ borderColor: theme.border }}>
        <div>{footer.leftText}</div>
        <div>{footer.centerText}</div>
        <div className="flex items-center gap-4">
          {footer.showPageStamp && (
            <span className="px-2 py-0.5 border rounded" style={{ borderColor: theme.border }}>
              {footer.pageStampText}
            </span>
          )}
          {footer.rightText}
        </div>
      </div>
    );
  };

  return (
    <div id={id} className={cn("aspect-[1.414/1] w-full flex flex-col", className)} style={containerStyle}>
      {card.design.header?.show && (
        <div 
          className={cn(
            "absolute top-0 left-0 right-0 px-8 py-4 flex items-center justify-between z-10",
            card.design.header.style === 'modern' && "rounded-t-[1.5rem]",
            card.design.header.style === 'bold' && "font-black"
          )}
          style={{ 
            backgroundColor: card.design.header.backgroundColor,
            color: card.design.header.textColor
          }}
        >
          <div className="flex items-center gap-3">
            <Icon size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">{card.type.replace('-', ' ')}</span>
          </div>
          {card.design.showLogo && card.design.logoUrl && (
            <img 
              src={card.design.logoUrl} 
              alt="Logo" 
              className="h-8 w-auto object-contain"
              style={{ 
                filter: card.design.theme === 'print-grayscale' ? 'grayscale(1)' : 'none'
              }}
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      )}
      <div className={cn("flex-1 flex flex-col", card.design.header?.show && "mt-12")}>
        {card.design.showLogo && card.design.logoUrl && !card.design.header?.show && (
          <img 
            src={card.design.logoUrl} 
            alt="Logo" 
            className={cn(
              "absolute pointer-events-none",
              card.design.logoPosition === 'top-left' && "top-8 left-8",
              card.design.logoPosition === 'top-right' && "top-8 right-8",
              card.design.logoPosition === 'bottom-left' && "bottom-20 left-8",
              card.design.logoPosition === 'bottom-right' && "bottom-20 right-8"
            )}
            style={{ 
              width: card.design.logoSize, 
              opacity: card.design.logoOpacity,
              filter: card.design.theme === 'print-grayscale' ? 'grayscale(1)' : 'none'
            }}
            referrerPolicy="no-referrer"
          />
        )}
        {renderHeader()}
        {renderContent()}
        {renderFooter()}
      </div>
    </div>
  );
};
