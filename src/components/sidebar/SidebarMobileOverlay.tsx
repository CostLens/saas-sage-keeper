
import React from "react";

interface SidebarMobileOverlayProps {
  onClose: () => void;
}

export const SidebarMobileOverlay = ({ onClose }: SidebarMobileOverlayProps) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 z-30"
      onClick={onClose}
    />
  );
};
