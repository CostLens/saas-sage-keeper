
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Bot,
  Settings,
  HelpCircle,
  BarChart3,
  UserCog,
  UserPlus,
  Users
} from "lucide-react";

interface SidebarLinksProps {
  collapsed: boolean;
  showUsageFeatures: boolean;
}

export function SidebarLinks({ collapsed, showUsageFeatures }: SidebarLinksProps) {
  const location = useLocation();
  
  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: location.pathname === "/dashboard",
    },
    {
      name: "Spend Analytics",
      href: "/spend-trends",
      icon: <TrendingUp className="h-5 w-5" />,
      active: location.pathname === "/spend-trends",
    },
    {
      name: "Usage Analytics",
      href: "/usage",
      icon: <BarChart3 className="h-5 w-5" />,
      active: location.pathname === "/usage",
      show: showUsageFeatures,
    },
    {
      name: "Contracts",
      href: "/contracts",
      icon: <FileText className="h-5 w-5" />,
      active: location.pathname === "/contracts",
    },
    {
      name: "User Management",
      href: "/user-management",
      icon: <UserCog className="h-5 w-5" />,
      active: location.pathname === "/user-management",
    },
    {
      name: "User Onboarding",
      href: "/user-onboarding",
      icon: <UserPlus className="h-5 w-5" />,
      active: location.pathname === "/user-onboarding",
      show: showUsageFeatures,
    },
    {
      name: "User Boarding",
      href: "/user-boarding",
      icon: <Users className="h-5 w-5" />,
      active: location.pathname === "/user-boarding",
      show: showUsageFeatures,
    },
    {
      name: "AI Assistant",
      href: "/ai-assistant",
      icon: <Bot className="h-5 w-5" />,
      active: location.pathname === "/ai-assistant",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
      active: location.pathname === "/settings",
    },
    {
      name: "Help",
      href: "/help",
      icon: <HelpCircle className="h-5 w-5" />,
      active: location.pathname === "/help",
    },
  ];

  return (
    <div className="space-y-1">
      {links.map((link) => 
        (link.show === undefined || link.show) && (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "flex items-center py-2 px-3 text-sm font-medium rounded-md transition-colors",
              collapsed ? "justify-center" : "",
              link.active 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            {link.icon}
            {!collapsed && <span className="ml-3">{link.name}</span>}
          </Link>
        )
      )}
    </div>
  );
}
