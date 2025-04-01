
import React from "react";
import { Link } from "react-router-dom";

export function MobileLogoLink() {
  return (
    <div className="md:hidden">
      <Link to="/" className="flex items-center gap-2">
        <div className="rounded-md bg-gradient-to-r from-green-400 to-blue-500 p-1.5 w-8 h-8 flex items-center justify-center">
          <span className="font-bold text-white text-xl">IQ</span>
        </div>
        <span className="font-semibold text-lg tracking-tight">XpendIQ</span>
      </Link>
    </div>
  );
}
