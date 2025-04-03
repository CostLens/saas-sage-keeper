
import React from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { PriceEstimate } from './types';

interface PriceDisplayProps {
  monthlyPrice: PriceEstimate;
  annualPrice: PriceEstimate;
  licenses: number;
}

export function PriceDisplay({ monthlyPrice, annualPrice, licenses }: PriceDisplayProps) {
  return (
    <div className="bg-muted/40 p-3 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Recommended monthly cost</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              <Info className="h-3.5 w-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <p className="text-sm">
              Estimated cost based on aggregate market research for {licenses} licenses.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-1">
        <div>
          <p className="text-xs text-muted-foreground">Monthly</p>
          <p className="font-medium">
            {formatCurrency(monthlyPrice.min)} - {formatCurrency(monthlyPrice.max)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Annual</p>
          <p className="font-medium">
            {formatCurrency(annualPrice.min)} - {formatCurrency(annualPrice.max)}
          </p>
        </div>
      </div>
    </div>
  );
}
