
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface NavSectionProps {
  isCollapsed: boolean;
  title: string;
  children: ReactNode;
}

export function NavSection({ isCollapsed, title, children }: NavSectionProps) {
  return (
    <div className="px-3 py-2">
      {!isCollapsed && (
        <h2 className="mb-2 px-1 text-xs font-semibold tracking-tight text-muted-foreground">
          {title}
        </h2>
      )}
      <ul className="space-y-1">
        {children}
      </ul>
    </div>
  );
}
