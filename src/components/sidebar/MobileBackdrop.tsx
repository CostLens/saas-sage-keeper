
import React from "react";

interface MobileBackdropProps {
  isMobileOpen: boolean;
  onClose: () => void;
}

export const MobileBackdrop = ({ isMobileOpen, onClose }: MobileBackdropProps) => {
  if (!isMobileOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 z-30"
      onClick={onClose}
    />
  );
};
