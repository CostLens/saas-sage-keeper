
import { useState } from "react";
import { mockSaaSData, SaaSData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export function useDashboardData() {
  const { toast } = useToast();
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  
  // Calculate total spend
  const totalSpend = mockSaaSData.reduce((sum, saas) => sum + saas.price, 0);

  // Calculate license and usage data
  const totalLicenses = mockSaaSData.reduce((sum, saas) => sum + (saas.usage.totalLicenses || 0), 0);
  const activeUsers = mockSaaSData.reduce((sum, saas) => sum + saas.usage.activeUsers, 0);
  const overallUtilization = totalLicenses > 0 ? Math.round((activeUsers / totalLicenses) * 100) : 0;
  
  const unusedLicenses = totalLicenses - activeUsers;
  const potentialSavings = mockSaaSData.reduce((sum, saas) => {
    if (saas.pricingTerms === 'User-based' && saas.usage.totalLicenses) {
      const unusedInApp = saas.usage.totalLicenses - saas.usage.activeUsers;
      const costPerLicense = saas.price / saas.usage.totalLicenses;
      return sum + (unusedInApp * costPerLicense);
    }
    return sum;
  }, 0);

  // Calculate upcoming renewals
  const upcomingRenewals = mockSaaSData
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
  const paymentsData = mockSaaSData
    .filter(saas => saas.lastPayment && new Date(saas.lastPayment.date) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .slice(0, 3);
  
  const paymentsAmount = paymentsData.reduce((sum, saas) => 
    sum + (saas.lastPayment ? saas.lastPayment.amount : 0), 0);

  // Calculate terminations data
  const terminationsData = mockSaaSData
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
