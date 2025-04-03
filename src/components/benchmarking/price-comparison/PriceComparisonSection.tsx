
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ComparisonItem } from './types';
import { ComparisonItemComponent } from './ComparisonItem';
import { pricingOptions } from './pricing-data';

export function PriceComparisonSection() {
  const [comparisonItems, setComparisonItems] = useState<ComparisonItem[]>([
    { id: '1', appName: 'Sales Cloud', licenses: 25, term: '12' },
    { id: '2', appName: 'Salesforce Platform', licenses: 15, term: '24' }
  ]);
  
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
          {comparisonItems.map((item) => (
            <ComparisonItemComponent
              key={item.id}
              item={item}
              onRemove={() => removeComparison(item.id)}
              onUpdate={(field, value) => updateComparison(item.id, field, value)}
            />
          ))}
          
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
