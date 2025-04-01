
import React from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarPopover } from "@/components/calendar/CalendarPopover";
import { MobileLogoLink } from "@/components/header/MobileLogoLink";
import { SearchBar } from "@/components/header/SearchBar";
import { NotificationsMenu } from "@/components/header/NotificationsMenu";
import { UserMenu } from "@/components/header/UserMenu";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background text-foreground backdrop-blur-sm px-6 shadow-sm",
        className
      )}
    >
      <MobileLogoLink />
      <SearchBar />
      <div className="flex items-center gap-4">
        <CalendarPopover>
          <Button variant="ghost" size="icon" className="relative">
            <Calendar className="h-5 w-5" />
          </Button>
        </CalendarPopover>
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>
  );
}
