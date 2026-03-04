
import React from 'react';
import { Card, CardType, CardField } from '../../types';
import { CARD_SCHEMAS } from '../../cards/schemas';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/lib/utils';
import { X, Plus, GripVertical, Settings2 } from 'lucide-react';

interface CardFormProps {
  card: Card;
  onChange: (content: Record<string, any>) => void;
  onLabelChange: (labelOverrides: Record<string, string>) => void;
}

export const CardForm: React.FC<CardFormProps> = ({ card, onChange, onLabelChange }) => {
  const schema = CARD_SCHEMAS[card.type];
  const [isEditingLabels, setIsEditingLabels] = React.useState(false);

  const handleFieldChange = (id: string, value: any) => {
    onChange({ ...(card.content || {}), [id]: value });
  };

  const handleLabelChange = (id: string, label: string) => {
    onLabelChange({ ...(card.labelOverrides || {}), [id]: label });
  };

  const renderField = (field: CardField) => {
    const value = (card.content && card.content[field.id]) || '';

    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <Input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="bg-white/50"
          />
        );
      case 'textarea':
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="min-h-[100px] bg-white/50"
          />
        );
      case 'select':
        return (
          <Select value={value} onValueChange={(val) => handleFieldChange(field.id, val)}>
            <SelectTrigger className="bg-white/50">
              <SelectValue placeholder={field.placeholder || "Select option"} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'bullets':
      case 'chips':
        const items = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index] = e.target.value;
                    handleFieldChange(field.id, newItems);
                  }}
                  className="bg-white/50"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newItems = items.filter((_, i) => i !== index);
                    handleFieldChange(field.id, newItems);
                  }}
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full border-dashed"
              onClick={() => handleFieldChange(field.id, [...items, ''])}
            >
              <Plus size={14} className="mr-2" /> Add Item
            </Button>
          </div>
        );
      case 'rag':
        return (
          <div className="flex gap-2">
            {['Green', 'Amber', 'Red'].map((status) => (
              <Button
                key={status}
                variant={value === status ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  "flex-1",
                  value === status && status === 'Green' && "bg-emerald-600 hover:bg-emerald-700",
                  value === status && status === 'Amber' && "bg-amber-500 hover:bg-amber-600",
                  value === status && status === 'Red' && "bg-red-600 hover:bg-red-700"
                )}
                onClick={() => handleFieldChange(field.id, status)}
              >
                {status}
              </Button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Content</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsEditingLabels(!isEditingLabels)}
          className={cn("text-[10px] uppercase tracking-widest h-7", isEditingLabels && "bg-slate-100")}
        >
          <Settings2 size={12} className="mr-1" /> {isEditingLabels ? "Done" : "Edit Labels"}
        </Button>
      </div>

      {schema.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <div className="flex justify-between items-center">
            {isEditingLabels ? (
              <div className="flex-1 flex items-center gap-2 mb-1">
                <Label className="text-[10px] uppercase tracking-wider text-slate-400 shrink-0">Label:</Label>
                <Input 
                  value={(card.labelOverrides && card.labelOverrides[field.id]) || field.label}
                  onChange={(e) => handleLabelChange(field.id, e.target.value)}
                  className="h-7 text-[10px] bg-amber-50/50 border-amber-200"
                />
              </div>
            ) : (
              <Label htmlFor={field.id} className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {(card.labelOverrides && card.labelOverrides[field.id]) || field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
            )}
          </div>
          {renderField(field)}
          {field.helpText && <p className="text-[10px] text-slate-400">{field.helpText}</p>}
        </div>
      ))}
    </div>
  );
};

// CardForm component ends
