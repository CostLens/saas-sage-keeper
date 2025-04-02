
import { useState, useEffect } from "react";
import { mockSaaSData } from "@/lib/mockData";

export interface AppDiscoveryData {
  id: string;
  name: string;
  category: string;
  status: "Active" | "Inactive" | "Trial";
  totalPayments: number;
  costToDate: number;
  averageUsage: number;
  firstPurchased: string;
  renewalDate: string | null;
  owner: string | null; // Add owner property
}

export function useAppDiscoveryData() {
  const [saasData, setSaasData] = useState<AppDiscoveryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      // Transform the mock data to include the required fields
      const transformedData: AppDiscoveryData[] = mockSaaSData.map(saas => {
        // Generate random historical payment data (in a real app, this would come from the database)
        const numberOfPayments = Math.floor(Math.random() * 10) + 1;
        const paymentAmount = saas.price;
        const totalPayments = paymentAmount * numberOfPayments;
        
        // Calculate average usage from the existing usage data
        const avgUsage = saas.usage.utilizationRate || Math.floor(Math.random() * 100);
        
        // Calculate first purchase date (simulate 1-3 years ago)
        const monthsAgo = Math.floor(Math.random() * 36) + 1;
        const firstPurchaseDate = new Date();
        firstPurchaseDate.setMonth(firstPurchaseDate.getMonth() - monthsAgo);
        
        // Determine status based on the `active` property
        let status: "Active" | "Inactive" | "Trial" = "Inactive";
        if (saas.active === true) {
          status = "Active";
        } else if (saas.active === undefined) {
          // If active is undefined, randomly assign a status
          const randomStatus = Math.random();
          status = randomStatus > 0.7 ? "Trial" : randomStatus > 0.3 ? "Active" : "Inactive";
        }
        
        return {
          id: saas.id,
          name: saas.name,
          category: saas.category || "Software",
          status: status,
          totalPayments: totalPayments,
          costToDate: totalPayments, // In a real app, this might differ from total payments
          averageUsage: avgUsage,
          firstPurchased: firstPurchaseDate.toISOString(),
          renewalDate: saas.renewalDate !== "N/A" ? saas.renewalDate : null,
          owner: saas.owner || null // Include owner data from mockSaaSData
        };
      });
      
      setSaasData(transformedData);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  return { saasData, isLoading };
}
