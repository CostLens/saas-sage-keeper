
import { useState, useEffect } from "react";
import { mockSaaSData } from "@/lib/mockData";

export interface CertificationData {
  name: "HIPAA" | "GDPR" | "CCPA" | "ISO 27001" | "SOC 2" | "PCI DSS";
  status: "Certified" | "Pending" | "NotCompliant";
  validUntil?: string;
  lastVerified?: string;
}

export interface ComplianceData {
  id: string;
  name: string;
  certifications: CertificationData[];
}

export function useComplianceData() {
  const [complianceData, setComplianceData] = useState<ComplianceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      // Transform the mock data to include compliance certifications
      const transformedData: ComplianceData[] = mockSaaSData.map(saas => {
        // Generate random certification statuses
        const generateCertStatus = (): "Certified" | "Pending" | "NotCompliant" => {
          const rand = Math.random();
          if (rand > 0.7) return "Certified";
          if (rand > 0.3) return "Pending";
          return "NotCompliant";
        };
        
        // Generate a date between 3-18 months in the future
        const generateValidUntil = (): string => {
          const date = new Date();
          date.setMonth(date.getMonth() + Math.floor(Math.random() * 15) + 3);
          return date.toISOString();
        };
        
        // Generate a date in the past 0-12 months
        const generateLastVerified = (): string => {
          const date = new Date();
          date.setMonth(date.getMonth() - Math.floor(Math.random() * 12));
          return date.toISOString();
        };
        
        // Generate random certifications for each SaaS application
        const certifications: CertificationData[] = [
          {
            name: "HIPAA",
            status: generateCertStatus(),
            validUntil: generateValidUntil(),
            lastVerified: generateLastVerified()
          },
          {
            name: "GDPR",
            status: generateCertStatus(),
            validUntil: generateValidUntil(),
            lastVerified: generateLastVerified()
          },
          {
            name: "CCPA",
            status: generateCertStatus(),
            validUntil: generateValidUntil(),
            lastVerified: generateLastVerified()
          },
          {
            name: "ISO 27001",
            status: generateCertStatus(),
            validUntil: generateValidUntil(),
            lastVerified: generateLastVerified()
          },
          {
            name: "SOC 2",
            status: generateCertStatus(),
            validUntil: generateValidUntil(),
            lastVerified: generateLastVerified()
          },
          {
            name: "PCI DSS",
            status: generateCertStatus(),
            validUntil: generateValidUntil(),
            lastVerified: generateLastVerified()
          }
        ];
        
        return {
          id: saas.id,
          name: saas.name,
          certifications
        };
      });
      
      setComplianceData(transformedData);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  return { complianceData, isLoading };
}
