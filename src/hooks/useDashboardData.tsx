
import { useState } from "react";
import { mockSaaSData, SaaSData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export function useDashboardData() {
  const { toast } = useToast();
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const saasData = mockSaaSData;
  
  // Calculate total spend
  const totalSpend = saasData.reduce((sum, saas) => sum + saas.price, 0);

  // Calculate license and usage data
  const totalLicenses = saasData.reduce((sum, saas) => sum + (saas.usage.totalLicenses || 0), 0);
  const activeUsers = saasData.reduce((sum, saas) => sum + saas.usage.activeUsers, 0);
  const overallUtilization = totalLicenses > 0 ? Math.round((activeUsers / totalLicenses) * 100) : 0;
  
  const unusedLicenses = totalLicenses - activeUsers;
  const potentialSavings = saasData.reduce((sum, saas) => {
    if (saas.pricingTerms === 'User-based' && saas.usage.totalLicenses) {
      const unusedInApp = saas.usage.totalLicenses - saas.usage.activeUsers;
      const costPerLicense = saas.price / saas.usage.totalLicenses;
      return sum + (unusedInApp * costPerLicense);
    }
    return sum;
  }, 0);

  // Calculate upcoming renewals
  const upcomingRenewals = saasData
    .filter(saas => 
      saas.renewalDate !== "N/A" && 
      new Date(saas.renewalDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    )
    .map(saas => ({
      ...saas,
      renewalDateObj: new Date(saas.renewalDate)
    }));
  
  const upcomingRenewalAmount = upcomingRenewals.reduce((sum, saas) => sum + saas.price, 0);

  // Calculate payments data
  const paymentsData = saasData
    .filter(saas => saas.lastPayment && new Date(saas.lastPayment.date) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .slice(0, 3);
  
  const paymentsAmount = paymentsData.reduce((sum, saas) => 
    sum + (saas.lastPayment ? saas.lastPayment.amount : 0), 0);

  // Calculate terminations data
  const terminationsData = saasData
    .filter(saas => 
      saas.contract && 
      saas.contract.cancellationDeadline && 
      new Date(saas.contract.cancellationDeadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    )
    .slice(0, 2);

  const handleRefresh = () => {
    setLastRefreshed(new Date());
    toast({
      title: "Dashboard data refreshed",
      description: "All data has been updated to the latest values",
    });
  };

  return {
    saasData,
    lastRefreshed,
    totalSpend,
    totalLicenses,
    activeUsers,
    overallUtilization,
    unusedLicenses,
    potentialSavings,
    upcomingRenewals,
    upcomingRenewalAmount,
    paymentsData,
    paymentsAmount,
    terminationsData,
    handleRefresh
  };
}
