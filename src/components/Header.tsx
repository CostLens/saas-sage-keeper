
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bell, Settings, HelpCircle, Search, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { user, signOut } = useAuth();
  
  // Get user initials for the avatar
  const getInitials = () => {
    if (!user) return "?";
    
    const fullName = user.user_metadata?.full_name || '';
    if (fullName) {
      return fullName.split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    return user.email?.substring(0, 2).toUpperCase() || "?";
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-6",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold text-lg tracking-tight">Cost Lens</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex rounded-md bg-muted/30 hover:bg-muted/50 transition-colors px-3 py-1.5">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Search across apps..."
            className="bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
          </Button>

          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2 gap-1">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {getInitials()}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.user_metadata?.full_name || "Kanav Hasija"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
