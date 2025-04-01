
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bell, Search, Calendar } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useRenewalContracts } from "@/hooks/useRenewalContracts";

interface HeaderProps {
  className?: string;
}

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

export function Header({ className }: HeaderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Contract Renewal",
      description: "Slack contract renewal is due in 30 days",
      time: "2 hours ago",
      read: false
    },
    {
      id: "2",
      title: "License Alert",
      description: "Adobe Creative Cloud has 12 unused licenses",
      time: "Yesterday",
      read: false
    },
    {
      id: "3",
      title: "Price Increase",
      description: "Microsoft 365 subscription price will increase by 10% next month",
      time: "3 days ago",
      read: true
    }
  ]);

  const renewalContracts = useRenewalContracts();
  const [searchQuery, setSearchQuery] = useState("");
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background text-foreground backdrop-blur-sm px-6 shadow-sm",
        className
      )}
    >
      <div className="md:hidden">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-md bg-gradient-to-r from-green-400 to-blue-500 p-1.5 w-8 h-8 flex items-center justify-center">
            <span className="font-bold text-white text-xl">IQ</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">XpendIQ</span>
        </Link>
      </div>

      <div className="hidden md:flex flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search..."
            className="pl-9 h-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Calendar className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between p-2 border-b">
              <h4 className="font-medium">Upcoming Renewals</h4>
            </div>
            <div className="max-h-[300px] overflow-auto">
              {renewalContracts.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No upcoming renewals
                </div>
              ) : (
                renewalContracts.map((contract) => (
                  <div 
                    key={contract.id} 
                    className="p-3 border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between">
                      <h5 className="text-sm font-medium">{contract.name}</h5>
                      <span className="text-xs text-muted-foreground">{contract.renewalDate}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {contract.usage?.utilizationRate < 50 
                        ? "Low utilization. Consider reducing licenses." 
                        : "Review contract terms before renewal."}
                    </p>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between p-2 border-b">
              <h4 className="font-medium">Notifications</h4>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  Mark all read
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearNotifications}
                  disabled={notifications.length === 0}
                >
                  Clear all
                </Button>
              </div>
            </div>
            <div className="max-h-[300px] overflow-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "p-3 border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer",
                      !notification.read && "bg-primary/5"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between">
                      <h5 className="text-sm font-medium">{notification.title}</h5>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                    <span className="text-xs text-muted-foreground mt-2 block">{notification.time}</span>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                KH
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Kanav Hasija</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/">Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
