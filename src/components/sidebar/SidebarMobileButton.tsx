
import React from "react";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";

interface SidebarMobileButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const SidebarMobileButton = ({ isOpen, onClick }: SidebarMobileButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );
};
