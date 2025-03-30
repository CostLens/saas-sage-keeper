
import { useState, useEffect } from "react";
import { mockSaaSData, SaaSData } from "@/lib/mockData";

export function useRenewalContracts() {
  const [renewalContracts, setRenewalContracts] = useState<SaaSData[]>([]);
  
  useEffect(() => {
    // Get contracts due for renewal in the next 90 days
    const now = new Date();
    const ninetyDaysFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    
    // Create some mock data for the renewal contracts
    const mockRenewalContracts = [
      {
        ...mockSaaSData[0], // Using Salesforce
        renewalDate: new Date(Date.now() + (10 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] // 10 days from now
      },
      {
        ...mockSaaSData[1], // Using Slack
        renewalDate: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], // 30 days from now
        usage: {
          ...mockSaaSData[1].usage,
          utilizationRate: 30, // Low utilization for Slack
          activeUsers: 300,
          totalLicenses: 1000
        }
      },
      {
        ...mockSaaSData[2], // Using Asana
        renewalDate: new Date(Date.now() + (45 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] // 45 days from now
      },
      {
        ...mockSaaSData[3], // Using HubSpot
        renewalDate: new Date(Date.now() + (60 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], // 60 days from now
        usage: {
          ...mockSaaSData[3].usage,
          utilizationRate: 72, // Lower utilization
          activeUsers: 108,
          totalLicenses: 150
        }
      },
      {
        ...mockSaaSData[4], // Using Zoom
        renewalDate: new Date(Date.now() + (85 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] // 85 days from now
      }
    ];
    
    setRenewalContracts(mockRenewalContracts);
  }, []);

  return renewalContracts;
}
