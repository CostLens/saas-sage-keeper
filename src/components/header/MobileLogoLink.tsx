
import React from "react";
import { Link } from "react-router-dom";

export function MobileLogoLink() {
  return (
    <div className="md:hidden">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center">
          <img 
            src="/lovable-uploads/4efda508-f87e-4b11-a806-b08971bca4a2.png" 
            alt="Velto Logo" 
            className="w-8 h-auto"
          />
        </div>
        <span className="font-semibold text-lg tracking-tight">Velto</span>
      </Link>
    </div>
  );
}
