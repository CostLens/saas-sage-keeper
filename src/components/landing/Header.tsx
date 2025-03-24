
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, ListChecks } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 h-8 w-8 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-sm">IQ</span>
            </div>
            <span className="font-bold text-xl">XpendIQ</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">
                <User className="h-4 w-4 mr-1" />
                Sign In
              </Link>
            </Button>
            <Button size="sm" className="gap-2">
              <ListChecks className="h-4 w-4" />
              Join Waiting List
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
