
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Users,
  Bot,
  Settings,
  HelpCircle,
  BarChart3,
  UserCog
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface SidebarLinksProps {
  collapsed: boolean;
  showUsageFeatures: boolean;
  showBoardingFeatures: boolean;
}

export function SidebarLinks({ collapsed, showUsageFeatures, showBoardingFeatures }: SidebarLinksProps) {
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
      name: "User Boarding",
      href: "/user-boarding",
      icon: <UserCog className="h-5 w-5" />,
      active: location.pathname === "/user-boarding",
      show: showBoardingFeatures,
    },
    {
      name: "Repository",
      href: "/contracts",
      icon: <FileText className="h-5 w-5" />,
      active: location.pathname === "/contracts",
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
          <TooltipProvider key={link.href} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
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
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  {link.name}
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        )
      )}
    </div>
  );
}
