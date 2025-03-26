
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  TrendingUp, 
  FileText,
  Settings, 
  HelpCircle,
  Gauge,
  UserCog,
  FileSearch
} from "lucide-react";

export const useSidebarFeatures = () => {
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-usage-features");
      return savedValue !== "false";
    }
    return true;
  });

  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-boarding-features");
      return savedValue !== "false";
    }
    return true;
  });

  const [showNegotiationFeatures, setShowNegotiationFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-negotiation-features");
      return savedValue !== "false";
    }
    return true;
  });

  // Listen for storage changes to update UI accordingly
  useEffect(() => {
    const handleStorageChange = () => {
      const usageValue = localStorage.getItem("show-usage-features");
      const boardingValue = localStorage.getItem("show-boarding-features");
      const negotiationValue = localStorage.getItem("show-negotiation-features");
      setShowUsageFeatures(usageValue !== "false");
      setShowBoardingFeatures(boardingValue !== "false");
      setShowNegotiationFeatures(negotiationValue !== "false");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usageFeaturesToggled', handleStorageChange);
    window.addEventListener('boardingFeaturesToggled', handleStorageChange);
    window.addEventListener('negotiationFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usageFeaturesToggled', handleStorageChange);
      window.removeEventListener('boardingFeaturesToggled', handleStorageChange);
      window.removeEventListener('negotiationFeaturesToggled', handleStorageChange);
    };
  }, []);

  // Build navigation items based on feature flags
  const getPrimaryNavItems = () => {
    const items = [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Spend Analytics", href: "/spend-trends", icon: TrendingUp },
    ];
    
    if (showUsageFeatures) {
      items.push({ name: "Usage Analytics", href: "/usage", icon: Gauge });
    }
    
    if (showBoardingFeatures) {
      items.push({ name: "User Boarding", href: "/user-boarding", icon: UserCog });
    }
    
    // Contract negotiation now comes before repository
    if (showNegotiationFeatures) {
      items.push({ name: "Contract Negotiation", href: "/contract-negotiation", icon: FileSearch });
    }
    
    items.push({ name: "Repository", href: "/contracts", icon: FileText });
    
    return items;
  };

  const secondaryNavigation = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help & Support", href: "/help", icon: HelpCircle },
  ];

  return {
    showUsageFeatures,
    showBoardingFeatures,
    showNegotiationFeatures,
    getPrimaryNavItems,
    secondaryNavigation
  };
};
