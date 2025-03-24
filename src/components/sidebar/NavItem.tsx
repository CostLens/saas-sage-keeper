
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
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
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={href}
          end={exact}
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
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
  );
};
