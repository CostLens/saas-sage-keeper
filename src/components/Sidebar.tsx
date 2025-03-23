
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  ClipboardList,
  TrendingUp, 
  FileText,
  Package, 
  Settings, 
  HelpCircle,
  PlusCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Obligations", href: "/obligations", icon: ClipboardList },
  { name: "Spend Trends", href: "/spend-trends", icon: TrendingUp },
  { name: "Contracts", href: "/contracts", icon: FileText },
];

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
];

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
            <div className="rounded-md bg-primary/10 p-1">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">SaaS Sage</span>
          </div>
        )}
        {isCollapsed && (
          <div className="rounded-md bg-primary/10 p-1 mx-auto">
            <Package className="h-6 w-6 text-primary" />
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
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

        {!isCollapsed && (
          <div className="mt-6 px-4">
            <Button className="w-full justify-start gap-2" variant="outline">
              <PlusCircle className="h-4 w-4" />
              <span>Connect New SaaS</span>
            </Button>
          </div>
        )}

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

      {!isCollapsed && (
        <div className="p-4 mt-auto">
          <div className="rounded-lg bg-muted/50 p-4">
            <h3 className="font-medium text-sm">Need help?</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Connect your SaaS apps to get started with automated tracking.
            </p>
            <Button variant="default" size="sm" className="mt-3 w-full">
              View integration guide
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}
