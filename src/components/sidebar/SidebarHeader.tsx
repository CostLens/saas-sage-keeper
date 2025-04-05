
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobile?: boolean;
}

export const SidebarHeader = ({ isCollapsed, toggleCollapse, isMobile = false }: SidebarHeaderProps) => {
  return (
    <div className="flex h-16 items-center border-b px-4 justify-between">
      {!isCollapsed && (
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <img 
              src="/lovable-uploads/334e2e04-bd61-46d7-83c2-8e9fcc8d7406.png" 
              alt="Velto Logo" 
              className="w-8 h-auto"
            />
          </div>
          <span className="font-bold text-xl tracking-tight">Velto</span>
        </Link>
      )}
      {isCollapsed && (
        <Link to="/dashboard" className="mx-auto">
          <div className="w-8 h-8 flex items-center justify-center">
            <img 
              src="/lovable-uploads/334e2e04-bd61-46d7-83c2-8e9fcc8d7406.png" 
              alt="Velto Logo" 
              className="w-8 h-auto"
            />
          </div>
        </Link>
      )}
      {!isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleCollapse}
          className={isCollapsed ? "mx-auto" : "ml-auto"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      )}
    </div>
  );
};
