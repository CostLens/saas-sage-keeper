
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface AppDiscoveryData {
  id: number;
  name: string;
  category: string;
  logo?: string;
  description: string;
  publisher: string;
  averageUsage: number;
  activeUsers: number;
  totalLicenses: number;
  costPerYear: number;
  status: "Approved" | "Pending" | "Restricted";
  lastUsed: string;
  purchaseDate: string;
  departments: string[];
  website: string;
  features?: string[];
  alternatives?: { name: string; matchScore: number }[];
}

export function useAppDiscoveryData() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for app discovery
  const saasData: AppDiscoveryData[] = [
    {
      id: 1,
      name: "Slack",
      category: "Communication",
      description: "Team communication and collaboration platform",
      publisher: "Salesforce",
      averageUsage: 87,
      activeUsers: 230,
      totalLicenses: 250,
      costPerYear: 42500,
      status: "Approved",
      lastUsed: "Today",
      purchaseDate: "2021-04-15",
      departments: ["Engineering", "Marketing", "Sales", "HR"],
      website: "https://slack.com",
      features: ["Channels", "Direct Messages", "File Sharing", "Video Calls"],
      alternatives: [
        { name: "Microsoft Teams", matchScore: 92 },
        { name: "Discord", matchScore: 78 }
      ]
    },
    {
      id: 2,
      name: "Salesforce",
      category: "CRM",
      logo: "SA",
      description: "Customer relationship management platform",
      publisher: "Salesforce Inc.",
      averageUsage: 65,
      activeUsers: 120,
      totalLicenses: 150,
      costPerYear: 180000,
      status: "Approved",
      lastUsed: "Today",
      purchaseDate: "2020-07-22",
      departments: ["Sales", "Marketing", "Customer Support"],
      website: "https://salesforce.com",
      features: ["Contact Management", "Opportunity Tracking", "Reporting", "Analytics"],
      alternatives: [
        { name: "HubSpot", matchScore: 85 },
        { name: "Zoho CRM", matchScore: 76 }
      ]
    },
    {
      id: 3,
      name: "Adobe Creative Cloud",
      category: "Design",
      description: "Suite of creative design applications",
      publisher: "Adobe Inc.",
      averageUsage: 42,
      activeUsers: 35,
      totalLicenses: 50,
      costPerYear: 29500,
      status: "Approved",
      lastUsed: "Yesterday",
      purchaseDate: "2022-01-10",
      departments: ["Marketing", "Design"],
      website: "https://adobe.com/creativecloud",
      features: ["Photoshop", "Illustrator", "InDesign", "Premiere Pro"],
      alternatives: [
        { name: "Affinity Suite", matchScore: 79 },
        { name: "Sketch", matchScore: 65 }
      ]
    },
    {
      id: 4,
      name: "Zendesk",
      category: "Customer Support",
      description: "Customer service platform and support ticketing system",
      publisher: "Zendesk Inc.",
      averageUsage: 76,
      activeUsers: 45,
      totalLicenses: 50,
      costPerYear: 32000,
      status: "Approved",
      lastUsed: "Today",
      purchaseDate: "2021-11-05",
      departments: ["Customer Support", "Sales"],
      website: "https://zendesk.com",
      features: ["Ticketing", "Live Chat", "Knowledge Base", "Analytics"],
      alternatives: [
        { name: "Freshdesk", matchScore: 88 },
        { name: "Intercom", matchScore: 72 }
      ]
    },
    {
      id: 5,
      name: "Dropbox",
      category: "File Storage",
      description: "Cloud storage and file sharing service",
      publisher: "Dropbox Inc.",
      averageUsage: 34,
      activeUsers: 175,
      totalLicenses: 300,
      costPerYear: 22500,
      status: "Restricted",
      lastUsed: "Last week",
      purchaseDate: "2019-08-17",
      departments: ["All Departments"],
      website: "https://dropbox.com",
      features: ["File Storage", "File Sharing", "Syncing", "Collaboration"],
      alternatives: [
        { name: "Google Drive", matchScore: 94 },
        { name: "Microsoft OneDrive", matchScore: 91 },
        { name: "Box", matchScore: 89 }
      ]
    },
    {
      id: 6,
      name: "Asana",
      category: "Project Management",
      description: "Project management and team collaboration tool",
      publisher: "Asana Inc.",
      averageUsage: 58,
      activeUsers: 95,
      totalLicenses: 120,
      costPerYear: 28800,
      status: "Approved",
      lastUsed: "Today",
      purchaseDate: "2022-03-01",
      departments: ["Engineering", "Marketing", "Product"],
      website: "https://asana.com",
      features: ["Task Management", "Project Tracking", "Team Collaboration", "Reporting"],
      alternatives: [
        { name: "Monday.com", matchScore: 87 },
        { name: "ClickUp", matchScore: 82 },
        { name: "Trello", matchScore: 75 }
      ]
    }
  ];

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data refreshed",
        description: "App discovery data has been updated"
      });
    }, 800);
  };

  return {
    saasData,
    isLoading,
    refresh
  };
}
