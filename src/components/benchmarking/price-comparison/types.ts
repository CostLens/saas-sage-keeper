
export interface PricingOption {
  id: string;
  name: string;
  monthlyPrices: {
    '12': { min: number, max: number };
    '24': { min: number, max: number };
    '36': { min: number, max: number };
  };
}

export interface ComparisonItem {
  id: string;
  appName: string;
  licenses: number;
  term: '12' | '24' | '36';
}

export interface PriceEstimate {
  min: number;
  max: number;
}
