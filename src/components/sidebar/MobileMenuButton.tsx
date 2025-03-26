
import React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuButtonProps {
  isMobileOpen: boolean;
  toggleCollapse: () => void;
}

export const MobileMenuButton = ({ isMobileOpen, toggleCollapse }: MobileMenuButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleCollapse}
      className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
    >
      {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );
};
