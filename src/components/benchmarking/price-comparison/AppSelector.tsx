
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { ComparisonItem } from './types';
import { pricingOptions } from './pricing-data';

interface AppSelectorProps {
  item: ComparisonItem;
  onAppChange: (appName: string) => void;
  className?: string;
}

export function AppSelector({ item, onAppChange, className }: AppSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`justify-between ${className}`}>
          {item.appName}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px] max-h-[200px] overflow-y-auto">
        {pricingOptions.map((option) => (
          <DropdownMenuItem 
            key={option.id}
            onClick={() => onAppChange(option.name)}
            className="cursor-pointer"
          >
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
