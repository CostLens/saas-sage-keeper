
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 h-8 w-8 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-sm">IQ</span>
            </div>
            <span className="font-bold text-lg">XpendIQ</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2023 XpendIQ. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
