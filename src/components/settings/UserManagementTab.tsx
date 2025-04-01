
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { UserTable } from "./users/UserTable";
import { UserManagementHeader } from "./users/UserManagementHeader";
import { useUserManagement } from "./users/useUserManagement";
import { CalendarPopover } from "@/components/calendar/CalendarPopover";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";

export function UserManagementTab() {
  const { users, handleRoleChange, handleUserStatusChange, handleInviteUser } = useUserManagement();
  
  // Create a button for the calendar popover to be used elsewhere
  const CalendarButton = React.useMemo(() => (
    <CalendarPopover>
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full"
        aria-label="Calendar"
      >
        <CalendarClock className="h-5 w-5" />
      </Button>
    </CalendarPopover>
  ), []);

  return (
    <Card>
      <CardHeader>
        <UserManagementHeader onInviteUser={handleInviteUser} />
      </CardHeader>
      <CardContent>
        <UserTable 
          users={users} 
          onRoleChange={handleRoleChange} 
          onStatusChange={handleUserStatusChange} 
        />
      </CardContent>
    </Card>
  );
}

// Export the calendar button for use in the Header component
export const HeaderCalendarButton = () => (
  <CalendarPopover>
    <Button 
      variant="ghost" 
      size="icon" 
      className="rounded-full"
      aria-label="Calendar"
    >
      <CalendarClock className="h-5 w-5" />
    </Button>
  </CalendarPopover>
);
