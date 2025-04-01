
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Settings, Flag, CreditCard, Link, Bell, HelpCircle, Users } from "lucide-react";

interface TabItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export function TabNavigation() {
  const isMobile = useIsMobile();
  
  const tabs: TabItem[] = [
    { value: "general", label: "General", icon: <Settings className="h-4 w-4" /> },
    { value: "features", label: "Feature Flag", icon: <Flag className="h-4 w-4" /> },
    { value: "subscription", label: "Subscription", icon: <CreditCard className="h-4 w-4" /> },
    { value: "integrations", label: "Integrations", icon: <Link className="h-4 w-4" /> },
    { value: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
    { value: "users", label: "Users", icon: <Users className="h-4 w-4" /> },
    { value: "support", label: "Support", icon: <HelpCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full overflow-x-auto pb-2">
      <TabsList className="w-full flex flex-nowrap justify-start sm:justify-center gap-1">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value}
            className="flex items-center gap-2 whitespace-nowrap px-3 sm:px-4"
          >
            {tab.icon}
            <span className={isMobile ? "sr-only" : ""}>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
