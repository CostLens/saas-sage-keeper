
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface NavItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
  isCollapsed: boolean;
  exact?: boolean;
}

export const NavItem = ({ name, href, icon: Icon, isCollapsed, exact = false }: NavItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={href}
            end={exact}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-muted-foreground hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
              )
            }
          >
            <Icon className="h-5 w-5" />
            {!isCollapsed && <span>{name}</span>}
          </NavLink>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right">
            {name}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
