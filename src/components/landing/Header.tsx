
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useBookDemoModal } from "@/hooks/useBookDemoModal";

const Header = () => {
  const { openDemoModal } = useBookDemoModal();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 flex items-center justify-center">
              <img 
                src="/lovable-uploads/334e2e04-bd61-46d7-83c2-8e9fcc8d7406.png" 
                alt="Velto Logo" 
                className="w-8 h-auto"
              />
            </div>
            <span className="font-bold text-xl">Velto</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">
                <User className="h-4 w-4 mr-1" />
                Sign In
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <Link to="/signup">
                <User className="h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
