
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface TermSelectorProps {
  term: '12' | '24' | '36';
  onTermChange: (term: '12' | '24' | '36') => void;
  className?: string;
}

export function TermSelector({ term, onTermChange, className }: TermSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`justify-between ${className}`}>
          {term} month term
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem 
          onClick={() => onTermChange('12')} 
          className="cursor-pointer"
        >
          12 month term
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onTermChange('24')} 
          className="cursor-pointer"
        >
          24 month term
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onTermChange('36')} 
          className="cursor-pointer"
        >
          36 month term
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
