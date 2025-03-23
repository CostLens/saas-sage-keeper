import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  TrendingUp, 
  FileText,
  Wallet, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Coins
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  // Use localStorage to persist the collapsed state
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    return localStorage.getItem("show-usage-features") !== "false"; // Default to true if not set
  });

  // Listen for storage changes to update UI accordingly
  useEffect(() => {
    const handleStorageChange = () => {
      setShowUsageFeatures(localStorage.getItem("show-usage-features") !== "false");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usageFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usageFeaturesToggled', handleStorageChange);
    };
  }, []);
  
  // Update localStorage when isCollapsed changes
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
    // Dispatch a custom event to notify pages about sidebar state change
    window.dispatchEvent(new CustomEvent('sidebarStateChanged', { detail: { isCollapsed } }));
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  // Dynamic navigation based on feature flag
  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Spend Trends", href: "/spend-trends", icon: TrendingUp },
    { name: "Contracts", href: "/contracts", icon: FileText },
  ];
  
  // Add Usage tab only if feature flag is enabled
  if (showUsageFeatures) {
    navigation.push({ name: "Usage", href: "/usage", icon: Gauge });
  }

  const secondaryNavigation = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help & Support", href: "/help", icon: HelpCircle },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col border-r bg-background/80 backdrop-blur-sm transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-16 items-center border-b px-4 justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-green-600 p-1">
              <Coins className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ExpenseIQ</span>
          </div>
        )}
        {isCollapsed && (
          <div className="rounded-full bg-green-600 p-1 mx-auto">
            <Coins className="h-6 w-6 text-white" />
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleCollapse}
          className={isCollapsed ? "mx-auto" : "ml-auto"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4 bg-background">
        <nav className="grid gap-1 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6">
          <div className="px-4 py-2">
            {!isCollapsed && (
              <h2 className="text-xs font-semibold text-muted-foreground">
                SUPPORT & SETTINGS
              </h2>
            )}
          </div>
          <nav className="grid gap-1 px-2">
            {secondaryNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

// Export the isCollapsed state for use in other components
export { Sidebar };
