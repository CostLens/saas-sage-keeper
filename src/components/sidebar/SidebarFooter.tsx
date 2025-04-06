
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarFooterProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const SidebarFooter = ({ isCollapsed, onToggle }: SidebarFooterProps) => {
  return (
    <div className="p-3 mt-auto border-t">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="w-full flex items-center justify-center py-2"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <div className="flex items-center w-full">
            <ChevronLeft className="h-4 w-4 mr-2" />
            <span className="text-sm">Collapse</span>
          </div>
        )}
      </Button>
    </div>
  );
};
