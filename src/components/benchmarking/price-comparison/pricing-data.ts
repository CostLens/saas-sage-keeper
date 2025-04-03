
import { PricingOption } from './types';

// Extended pricing options
export const pricingOptions: PricingOption[] = [
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
  },
  {
    id: '6',
    name: 'Commerce Cloud',
    monthlyPrices: {
      '12': { min: 250, max: 300 },
      '24': { min: 220, max: 270 },
      '36': { min: 200, max: 240 }
    }
  },
  {
    id: '7',
    name: 'Experience Cloud',
    monthlyPrices: {
      '12': { min: 160, max: 190 },
      '24': { min: 140, max: 170 },
      '36': { min: 120, max: 150 }
    }
  },
  {
    id: '8',
    name: 'Analytics Cloud',
    monthlyPrices: {
      '12': { min: 175, max: 210 },
      '24': { min: 155, max: 185 },
      '36': { min: 135, max: 165 }
    }
  }
];
