
import React from "react";
import { LucideIcon } from "lucide-react";
import { NavItem } from "./NavItem";
import { TooltipProvider } from "@/components/ui/tooltip";

interface NavItemType {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface NavSectionProps {
  title?: string;
  items: NavItemType[];
  isCollapsed: boolean;
}

export const NavSection = ({ title, items, isCollapsed }: NavSectionProps) => {
  return (
    <div className={title ? "mt-6" : ""}>
      {title && !isCollapsed && (
        <div className="px-4 py-2">
          <h2 className="text-xs font-semibold text-muted-foreground">
            {title}
          </h2>
        </div>
      )}
      <nav className="grid gap-1 px-2">
        <TooltipProvider>
          {items.map((item) => (
            <NavItem
              key={item.name}
              name={item.name}
              href={item.href}
              icon={item.icon}
              isCollapsed={isCollapsed}
              exact={item.href === "/dashboard"}
            />
          ))}
        </TooltipProvider>
      </nav>
    </div>
  );
};
