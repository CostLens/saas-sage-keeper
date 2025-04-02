
import { useState, useEffect } from "react";
import { mockSaaSData, SaaSData } from "@/lib/mockData";

// Extended SaaSData with shadow IT specific fields
export interface ShadowITData extends SaaSData {
  discoveryDate: string;
  discoveryMethod: "Network Scan" | "Expense Report" | "User Report" | "Integration";
  riskLevel: "Low" | "Medium" | "High";
  category: "Managed" | "Unmanaged" | "Under Review";
  users: string[];
  certifications: {
    name: string;
    status: "Verified" | "Unknown" | "Failed";
    lastChecked?: string;
  }[];
}

export function useShadowITData() {
  const [shadowITApps, setShadowITApps] = useState<ShadowITData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      // Transform the mock data to include shadow IT specific fields
      const transformedData: ShadowITData[] = mockSaaSData
        .filter((_, index) => index % 3 === 0) // Take every third item to simulate shadow IT apps
        .map((saas) => {
          // Generate random risk level
          const riskLevels: ["Low", "Medium", "High"] = ["Low", "Medium", "High"];
          const randomRiskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
          
          // Generate random category
          const categories: ["Managed", "Unmanaged", "Under Review"] = ["Managed", "Unmanaged", "Under Review"];
          const randomCategory = categories[Math.floor(Math.random() * categories.length)];
          
          // Generate random discovery date (1-12 months ago)
          const discoveryDate = new Date();
          discoveryDate.setMonth(discoveryDate.getMonth() - Math.floor(Math.random() * 12) - 1);
          
          // Generate random discovery method
          const discoveryMethods: ["Network Scan", "Expense Report", "User Report", "Integration"] = [
            "Network Scan", "Expense Report", "User Report", "Integration"
          ];
          const randomDiscoveryMethod = discoveryMethods[Math.floor(Math.random() * discoveryMethods.length)];
          
          // Generate random users
          const usernames = [
            "john.doe", "jane.smith", "robert.johnson", "susan.williams", 
            "david.brown", "lisa.miller", "michael.davis", "sarah.wilson"
          ];
          const numUsers = Math.floor(Math.random() * 5) + 1;
          const randomUsers = Array.from({ length: numUsers }, () => 
            usernames[Math.floor(Math.random() * usernames.length)]
          );
          
          // Generate random certifications
          const certificationNames = [
            "SOC 2", "GDPR", "HIPAA", "ISO 27001", "PCI DSS", "CCPA"
          ];
          const certificationStatuses: ["Verified", "Unknown", "Failed"] = ["Verified", "Unknown", "Failed"];
          const numCertifications = Math.floor(Math.random() * 3) + 1;
          
          const randomCertifications = Array.from({ length: numCertifications }, () => {
            const name = certificationNames[Math.floor(Math.random() * certificationNames.length)];
            const status = certificationStatuses[Math.floor(Math.random() * certificationStatuses.length)];
            const lastChecked = new Date();
            lastChecked.setDate(lastChecked.getDate() - Math.floor(Math.random() * 90));
            
            return {
              name,
              status,
              lastChecked: status !== "Unknown" ? lastChecked.toISOString() : undefined
            };
          });
          
          // Add owners
          const owners = [
            "Sarah Johnson", "Michael Chen", "Emily Davis", "Carlos Rodriguez", 
            "Aisha Patel", "Trevor Williams", null
          ];
          const randomOwner = owners[Math.floor(Math.random() * owners.length)];
          
          return {
            ...saas,
            discoveryDate: discoveryDate.toISOString(),
            discoveryMethod: randomDiscoveryMethod,
            riskLevel: randomRiskLevel,
            category: randomCategory,
            users: randomUsers,
            certifications: randomCertifications,
            owner: randomOwner
          };
        });
      
      setShadowITApps(transformedData);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  return { shadowITApps, isLoading };
}
