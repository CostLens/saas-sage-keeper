
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 flex items-center justify-center">
              <img 
                src="/lovable-uploads/4efda508-f87e-4b11-a806-b08971bca4a2.png" 
                alt="Velto Logo" 
                className="w-8 h-auto"
              />
            </div>
            <span className="font-bold text-lg">Velto</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2023 Velto. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
