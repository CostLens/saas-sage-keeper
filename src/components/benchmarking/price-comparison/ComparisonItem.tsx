
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ComparisonItem as ComparisonItemType } from './types';
import { AppSelector } from './AppSelector';
import { TermSelector } from './TermSelector';
import { PriceDisplay } from './PriceDisplay';
import { getEstimatedPrice, getAnnualPrice } from './price-utils';

interface ComparisonItemProps {
  item: ComparisonItemType;
  onRemove: () => void;
  onUpdate: (field: keyof ComparisonItemType, value: any) => void;
}

export function ComparisonItemComponent({ item, onRemove, onUpdate }: ComparisonItemProps) {
  const monthlyPrice = getEstimatedPrice(item.appName, item.term, item.licenses);
  const annualPrice = getAnnualPrice(item.appName, item.term, item.licenses);
  
  return (
    <div className="p-4 border rounded-md bg-card">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-medium text-primary">
              {item.appName.substring(0, 1)}
            </span>
          </div>
          <AppSelector 
            item={item} 
            onAppChange={(appName) => onUpdate('appName', appName)} 
            className="w-[220px]"
          />
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="mb-2 block">License range</Label>
          <Input
            type="number"
            min="1"
            value={item.licenses}
            onChange={(e) => onUpdate('licenses', parseInt(e.target.value) || 1)}
            className="w-full"
          />
        </div>
        
        <div>
          <Label className="mb-2 block">Term length</Label>
          <TermSelector 
            term={item.term} 
            onTermChange={(term) => onUpdate('term', term)} 
            className="w-full"
          />
        </div>
        
        <PriceDisplay 
          monthlyPrice={monthlyPrice} 
          annualPrice={annualPrice} 
          licenses={item.licenses}
        />
      </div>
    </div>
  );
}
