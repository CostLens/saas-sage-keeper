
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const SidebarHeader = ({ isCollapsed, toggleCollapse }: SidebarHeaderProps) => {
  return (
    <div className="flex h-16 items-center border-b px-4 justify-between">
      {!isCollapsed && (
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="rounded-md bg-gradient-to-r from-green-400 to-blue-500 p-1.5 w-8 h-8 flex items-center justify-center">
            <span className="font-bold text-white text-xl">IQ</span>
          </div>
          <span className="font-bold text-xl tracking-tight">XpendIQ</span>
        </Link>
      )}
      {isCollapsed && (
        <Link to="/dashboard" className="mx-auto">
          <div className="rounded-md bg-gradient-to-r from-green-400 to-blue-500 p-1.5 w-8 h-8 flex items-center justify-center">
            <span className="font-bold text-white text-xl">IQ</span>
          </div>
        </Link>
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
  );
};
