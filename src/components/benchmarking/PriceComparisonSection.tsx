
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Check, Info } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PricingOption {
  id: string;
  name: string;
  monthlyPrices: {
    '12': { min: number, max: number };
    '24': { min: number, max: number };
    '36': { min: number, max: number };
  };
}

interface ComparisonItem {
  id: string;
  appName: string;
  licenses: number;
  term: '12' | '24' | '36';
}

export function PriceComparisonSection() {
  const [comparisonItems, setComparisonItems] = useState<ComparisonItem[]>([
    { id: '1', appName: 'Sales Cloud', licenses: 25, term: '12' },
    { id: '2', appName: 'Salesforce Platform', licenses: 15, term: '24' }
  ]);
  
  // Mock pricing options
  const pricingOptions: PricingOption[] = [
    {
      id: '1',
      name: 'Sales Cloud',
      monthlyPrices: {
        '12': { min: 120, max: 140 },
        '24': { min: 100, max: 125 },
        '36': { min: 90, max: 110 }
      }
    },
    {
      id: '2',
      name: 'Salesforce Platform',
      monthlyPrices: {
        '12': { min: 130, max: 150 },
        '24': { min: 110, max: 125 },
        '36': { min: 95, max: 110 }
      }
    },
    {
      id: '3',
      name: 'Customer Community',
      monthlyPrices: {
        '12': { min: 70, max: 100 },
        '24': { min: 60, max: 80 },
        '36': { min: 50, max: 65 }
      }
    },
    {
      id: '4',
      name: 'Marketing Cloud',
      monthlyPrices: {
        '12': { min: 200, max: 240 },
        '24': { min: 180, max: 220 },
        '36': { min: 150, max: 180 }
      }
    },
    {
      id: '5',
      name: 'Service Cloud',
      monthlyPrices: {
        '12': { min: 150, max: 170 },
        '24': { min: 130, max: 150 },
        '36': { min: 110, max: 130 }
      }
    }
  ];
  
  const addNewComparison = () => {
    const newItem: ComparisonItem = {
      id: Math.random().toString(36).substring(2, 9),
      appName: pricingOptions[0].name,
      licenses: 10,
      term: '12'
    };
    setComparisonItems([...comparisonItems, newItem]);
  };
  
  const removeComparison = (id: string) => {
    setComparisonItems(comparisonItems.filter(item => item.id !== id));
  };
  
  const updateComparison = (id: string, field: keyof ComparisonItem, value: any) => {
    setComparisonItems(comparisonItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };
  
  const getEstimatedPrice = (appName: string, term: '12' | '24' | '36', licenses: number) => {
    const app = pricingOptions.find(app => app.name === appName);
    if (!app) return { min: 0, max: 0 };
    
    const { min, max } = app.monthlyPrices[term];
    return {
      min: min * licenses,
      max: max * licenses
    };
  };
  
  const getAnnualPrice = (appName: string, term: '12' | '24' | '36', licenses: number) => {
    const monthly = getEstimatedPrice(appName, term, licenses);
    return {
      min: monthly.min * 12,
      max: monthly.max * 12
    };
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Price Comparison</CardTitle>
        <CardDescription>
          Compare pricing for different SaaS applications based on license count and term length
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {comparisonItems.map((item) => {
            const monthlyPrice = getEstimatedPrice(item.appName, item.term, item.licenses);
            const annualPrice = getAnnualPrice(item.appName, item.term, item.licenses);
            
            return (
              <div key={item.id} className="p-4 border rounded-md bg-card">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {item.appName.substring(0, 1)}
                      </span>
                    </div>
                    <Select 
                      value={item.appName} 
                      onValueChange={(value) => updateComparison(item.id, 'appName', value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select application" />
                      </SelectTrigger>
                      <SelectContent>
                        {pricingOptions.map((option) => (
                          <SelectItem key={option.id} value={option.name}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeComparison(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="mb-2 block text-sm">License range</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.licenses}
                        onChange={(e) => updateComparison(item.id, 'licenses', parseInt(e.target.value) || 1)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block text-sm">Term length</Label>
                    <Select 
                      value={item.term} 
                      onValueChange={(value: '12' | '24' | '36') => updateComparison(item.id, 'term', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 month term</SelectItem>
                        <SelectItem value="24">24 month term</SelectItem>
                        <SelectItem value="36">36 month term</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
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
                            Estimated cost based on aggregate market research for {item.licenses} licenses.
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
                </div>
              </div>
            );
          })}
          
          <Button 
            variant="outline" 
            className="w-full mt-4" 
            onClick={addNewComparison}
          >
            <Plus className="h-4 w-4 mr-2" /> Add license
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
