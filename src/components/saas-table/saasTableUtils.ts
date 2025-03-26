
import { SaaSData } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { formatCurrency } from "@/lib/utils";

// Format date to relative time
export const formatRelativeDate = (dateString: string) => {
  if (dateString === "N/A") return "N/A";
  
  try {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (e) {
    return dateString;
  }
};

// Get payment frequency from contract term
export const getPaymentFrequency = (contract: SaaSData['contract']) => {
  if (contract.term.toLowerCase().includes('monthly')) {
    return 'Monthly';
  } else if (contract.term.toLowerCase().includes('annual')) {
    return 'Annual';
  } else if (contract.term.toLowerCase().includes('quarterly')) {
    return 'Quarterly';
  } else {
    return contract.term;
  }
};

// Get license or storage info
export const getLicenseOrStorage = (saas: SaaSData) => {
  if (saas.pricingTerms === 'User-based' && saas.usage.totalLicenses) {
    return `${saas.usage.totalLicenses} licenses`;
  } else if (saas.pricingTerms === 'Usage-based') {
    return 'Pay-as-you-go';
  } else {
    return '';
  }
};
