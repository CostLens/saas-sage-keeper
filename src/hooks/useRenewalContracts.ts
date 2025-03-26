
import { useState, useEffect } from "react";
import { mockSaaSData, SaaSData } from "@/lib/mockData";

export function useRenewalContracts() {
  const [renewalContracts, setRenewalContracts] = useState<SaaSData[]>([]);
  
  useEffect(() => {
    // Get contracts due for renewal in the next 90 days
    const now = new Date();
    const ninetyDaysFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    
    const dueForRenewal = mockSaaSData.filter(saas => {
      if (saas.renewalDate === "N/A") return false;
      const renewalDate = new Date(saas.renewalDate);
      return renewalDate <= ninetyDaysFromNow && renewalDate >= now;
    });
    
    setRenewalContracts(dueForRenewal);
  }, []);

  return renewalContracts;
}
