
import { SaaSData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

export interface Recommendation {
  action: "Maintain" | "Reduce";
  suggestion: string;
  newLicenses: number;
  potentialSavings: number;
}

export function calculateRecommendation(saas: SaaSData): Recommendation | null {
  if (saas.pricingTerms !== 'User-based' || !saas.usage.totalLicenses) {
    return null;
  }
  
  const utilizationRate = saas.usage.utilizationRate;
  const activeUsers = saas.usage.activeUsers;
  const totalLicenses = saas.usage.totalLicenses;
  
  if (utilizationRate >= 80) {
    return {
      action: "Maintain",
      suggestion: "Current utilization is optimal",
      newLicenses: totalLicenses,
      potentialSavings: 0
    };
  }
  
  // Recommend 20% buffer above current active users
  const recommendedLicenses = Math.ceil(activeUsers * 1.2);
  const licenseReduction = totalLicenses - recommendedLicenses;
  
  // Calculate savings based on price per license
  const pricePerLicense = saas.price / totalLicenses;
  const potentialSavings = licenseReduction * pricePerLicense;
  
  return {
    action: "Reduce",
    suggestion: `Reduce licenses from ${totalLicenses} to ${recommendedLicenses} (includes 20% buffer)`,
    newLicenses: recommendedLicenses,
    potentialSavings: potentialSavings
  };
}

export function calculateTotalPotentialSavings(contracts: SaaSData[]): number {
  return contracts.reduce((total, saas) => {
    const recommendation = calculateRecommendation(saas);
    return total + (recommendation?.potentialSavings || 0);
  }, 0);
}
