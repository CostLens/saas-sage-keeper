
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItemProps {
  isCollapsed: boolean;
  icon: LucideIcon;
  title: string;
  href: string;
  isActive: boolean;
}

export function NavItem({ 
  isCollapsed, 
  icon: Icon, 
  title, 
  href, 
  isActive 
}: NavItemProps) {
  return (
    <li className={cn("relative", !isCollapsed && "w-full")}>
      <a
        href={href}
        className={cn(
          "flex h-10 w-full items-center rounded-md px-3 py-2",
          isActive
            ? "bg-accent text-accent-foreground font-medium"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-2")} />
        {!isCollapsed && <span>{title}</span>}
      </a>
    </li>
  );
}
