
import { PricingOption } from './types';
import { pricingOptions } from './pricing-data';

export const getEstimatedPrice = (appName: string, term: '12' | '24' | '36', licenses: number) => {
  const app = pricingOptions.find(app => app.name === appName);
  if (!app) return { min: 0, max: 0 };
  
  const { min, max } = app.monthlyPrices[term];
  return {
    min: min * licenses,
    max: max * licenses
  };
};

export const getAnnualPrice = (appName: string, term: '12' | '24' | '36', licenses: number) => {
  const monthly = getEstimatedPrice(appName, term, licenses);
  return {
    min: monthly.min * 12,
    max: monthly.max * 12
  };
};
